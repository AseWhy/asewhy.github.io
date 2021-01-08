const path = require('path')
    , crypto = require('crypto')
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
        '.gif',
        '.map'
    ];

function buildFolder(src, dist){
    let raws = src;

    src = path.resolve(src);
    dist = path.resolve(dist);

    let paths = new Array(), bdata = new Object();

    if(!fs.existsSync('./.build'))
        fs.mkdirSync('./.build');
    else
        bdata = JSON.parse(fs.readFileSync('./.build/buildsumms.json', 'utf-8'));
    
    (function watch (cpath = ''){
        const dir = fs.readdirSync(path.join(src, cpath))
            , files = new Object();
    
        for(let i = 0, leng = dir.length, finfo, fpath, rpath, ext; i < leng; i++) {
            rpath = path.join(raws, cpath, dir[i]);
            fpath = path.join(src, cpath, dir[i]);
            finfo = fs.statSync(fpath);
            ext = path.extname(fpath);
    
            if(finfo.isDirectory()) {
                watch(path.join(cpath, dir[i]));
            } else if(finfo.isFile()) {
                let content = fs.readFileSync(fpath),
                    coppyes = new Array(),
                    hash = crypto.createHash('sha256').update(content).digest('hex');

                // File preprocessing
                if(/^\/\/[ \t]*@pre-pros[ \t]+on[ \t]*$/m.test(content.toString('utf-8')))
                    content = content.toString().replace(/^[ \t]*\/\/[ \t]*->[ \t]*(.*)$/gm, (m, p1) => {
                        coppyes.push(path.normalize(p1.replace(/@/g, __dirname)));

                        console.log('Coppy file from ' + fpath + ' to ' + coppyes[coppyes.length - 1]);

                        return '';
                    }).replace(/^[ \t]*\/\/[ \t]*<-[ \t]*(.*)$/gm, (m, p1) => {
                        return fs.readFileSync(path.normalize(p1.replace(/@/g, __dirname)), 'utf-8');
                    });

                // Перезаписываем компии
                for(let i = 0, leng = coppyes.length; i < leng; i++) {
                    try {
                        fs.writeFileSync(coppyes[i], content);
                    } catch (e) {
                        console.warn('Cannot coppy file from `' + fpath + '` to `' + coppyes[i] + '`')
                    }
                }

                if(!tabuext.includes(ext)) {
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

                    try {
                        // Если предыдущая чексумма не рава текущей, то перезаписываем файл.
                        if(bdata[rpath] != hash)
                            fs.writeFileSync(out, content);
                        else
                            console.warn('File be skipped "' + rpath + '"');
                    } catch (e) {
                        console.warn('Cannot write file from `' + fpath + '` to `' + out + '`')
                    }
                }

                bdata[rpath] = hash;
            }
        }
    
        for(let key in files){
            paths.push({
                src: files[key],
                dest: path.resolve(path.join(dist, cpath, key.substring(1) + '.bundle' + key)),
                ext: key
            });
        }

        fs.writeFileSync('./.build/buildsumms.json', JSON.stringify(bdata, null, 4));
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
    if(process.argv.includes('--clear')) {
        fs.rmdirSync('.build', { recursive: true });
        fs.rmdirSync('dist', { recursive: true });
        fs.rmdirSync('frames/dist', { recursive: true });
    }

    await buildFolder('data', 'dist');
    await buildFolder('frames/data', 'frames/dist');
})();