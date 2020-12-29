const path = require('path')
    , fs = require('fs')
    , gulp = require("gulp")
    , babel = require("gulp-babel")
    , concat = require("gulp-concat")
    , uglify = require("gulp-uglify-es").default
    , autoprefixer = require('gulp-autoprefixer')
    , cleanCSS = require("gulp-clean-css")
    , tabuext = [
        '.png',
        '.jpg',
        '.ttf',
        '.otf',
        '.svg',
        '.map'
    ];

function buildFolder(src, dist){
    let paths = new Array();
    
    (function watch (cpath = ''){
        const dir = fs.readdirSync(path.join(src, cpath))
            , files = new Object();
    
        for(let i = 0, leng = dir.length, finfo, fpath, ext; i < leng; i++) {
            fpath = path.join(src, cpath, dir[i]);
            finfo = fs.statSync(fpath);
            ext = path.extname(fpath);
    
            if(finfo.isDirectory()) {
                watch(path.join(cpath, dir[i]));
            } else if(finfo.isFile() && !tabuext.includes(ext)) {
                if(files[ext]) {
                    if(dir[i].indexOf('important') == -1)
                        files[ext].push( path.resolve(fpath) );
                    else
                        files[ext].unshift( path.resolve(fpath) );
                } else {
                    files[ext] = [ path.resolve(fpath) ];
                }
            } else {
                let out = path.resolve(path.join(dist, cpath, dir[i]));

                if(!fs.existsSync(path.dirname(out))) {
                    fs.mkdirSync(path.dirname(out), { recursive: true });
                }

                fs.copyFileSync(fpath, path.resolve(out));
            }
        }
    
        for(let key in files){
            paths.push({
                src: files[key],
                dest: path.resolve(path.join(dist, cpath, key.substring(1) + '.bundle' + key)),
                ext: key
            });
        }
    })();
    
    function out(ext, input, dest, cb) {
        let series = gulp.src(input);
    
        series = series.pipe(concat(dest));
    
        switch(ext) {
            case '.css':
                series = series.pipe(autoprefixer());
                series = series.pipe(cleanCSS());
            break;
            case '.js':
                series = series.pipe(babel({
                    presets: [
                        [
                            "@babel/env",
                            {
                                targets: {
                                    chrome: 50,
                                    ie: 11
                                }
                            }
                        ]
                    ]
                }));

                series = series.pipe(uglify());
            break;
        }
    
        series = series.pipe(gulp.dest(dest));
    
        series.on('end', cb);
    }
    
    for(let i = 0, leng = paths.length; i < leng; i++) {
        paths[i] = out.bind(null, paths[i].ext, paths[i].src, paths[i].dest);
    }
    
    return gulp.parallel(...paths)();
}

(async () => {
    await buildFolder('frames/data', 'frames/dist');
    await buildFolder('data', 'dist');
})();