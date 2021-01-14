export const ImageHandler = new class {
    constructor(){
        this._gl = null;
        this._canvas = null;
        this._observer = new ResizeObserver(this.__resize.bind(this));
        this._program = null;
        this._buffer = null;
        this._step = 0;
        this._last = Date.now();
        this._texture = null;
        this._texutre_url = null;
        this._draw = this.__draw.bind(this);

        this._settings = ((defaults, uniforms, attrs) => ({ defaults, uniforms, attrs }))({
            img_size_policy: 2
        }, {
            step: null,
            resolution: null,
            texture: null,
            texture_resolution: null
        }, {
            position: null
        })

        requestAnimationFrame(this._draw);
    }

    enable(program) {
        if(this._canvas == null)
            throw new Error('Handler not loaded.');

        this._program = new program(this);

        this._settings.uniforms.step                = this._gl.getUniformLocation(this._program._program, "u_step");
        this._settings.uniforms.texture             = this._gl.getUniformLocation(this._program._program, "u_texture"),
        this._settings.uniforms.texture_resolution  = this._gl.getUniformLocation(this._program._program, "u_texture_resolution"),
        this._settings.uniforms.resolution          = this._gl.getUniformLocation(this._program._program, "u_resolution");
        this._settings.attrs.position               = this._gl.getAttribLocation(this._program._program, "a_position");
    }

    setTexture(path_to_img){
        const _ = this;

        if(_._canvas == null)
            throw new Error('Handler not loaded.');

        const image = new Image();

        image.src = _._texutre_url = path_to_img;

        return new Promise(res => {
            image.onload = function() {
                // Растянуть
                if(_._settings.defaults.img_size_policy == 1){
                    image.width = _._canvas.offsetWidth;
                    image.height = _._canvas.offsetHeight;

                // Подогнать
                } else if(_._settings.defaults.img_size_policy == 2){
                    let coifx = (_._canvas.offsetWidth / image.width),
                        coify = (_._canvas.offsetHeight / image.height);

                    if(coifx > coify){
                        image.width *= coifx;
                        image.height *= coifx;
                    } else {
                        image.width *= coify;
                        image.height *= coify;
                    }
                }

                const bitmap = _._gl.createTexture();

                _._gl.bindTexture(_._gl.TEXTURE_2D, bitmap);

                _._gl.texImage2D(_._gl.TEXTURE_2D, 0, _._gl.RGBA, _._gl.RGBA, _._gl.UNSIGNED_BYTE, image);

                _._gl.texParameteri(_._gl.TEXTURE_2D, _._gl.TEXTURE_WRAP_S, _._gl.CLAMP_TO_EDGE);
                _._gl.texParameteri(_._gl.TEXTURE_2D, _._gl.TEXTURE_WRAP_T, _._gl.CLAMP_TO_EDGE);
                _._gl.texParameteri(_._gl.TEXTURE_2D, _._gl.TEXTURE_MIN_FILTER, _._gl.LINEAR);


                _._texture = {
                    data: bitmap,
                    width: image.width,
                    height: image.height
                };

                res();
            }
        })
    }

    draw(canvas) {
        this._observer.observe(canvas);
        this._canvas = canvas;

        this._gl = this._canvas.getContext("webgl2");

        this._buffer = this._gl.createBuffer();

        // bind buffers
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffer);

        // Full Screen buffer
        this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array([
            1.0,  1.0,
            -1.0, 1.0,
            1.0, -1.0,
            -1.0, -1.0
        ]), this._gl.STATIC_DRAW);
    }

    stop(){
        this._observer.unobserve(this._canvas);
        this._canvas = null;
        this._gl = null;
    }

    __resize(){
        this._canvas.height = this._canvas.offsetHeight;
        this._canvas.width = this._canvas.offsetWidth;

        this.setTexture(this._texutre_url);

        this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
    }

    __draw(){
        // Binded funtion call
        requestAnimationFrame(this._draw);

        const delta = Date.now() - this._last;

        // Float owerflow protection
        if(this._step > 2139095039)
            this._step = 0;

        if(this._gl == null)
            return;

        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffer);

        if(this._program != null) {
            this._gl.useProgram(this._program._program);

            // uniforms
            this._gl.uniform2f(this._settings.uniforms.resolution, this._canvas.offsetWidth, this._canvas.offsetHeight);
            this._gl.uniform1i(this._settings.uniforms.step, this._step);

            // attrs
            this._gl.enableVertexAttribArray(this._settings.attrs.position);
            this._gl.vertexAttribPointer(this._settings.attrs.position, 2, this._gl.FLOAT, false, 0, 0);

            if(this._texture) {
                this._gl.uniform1i(this._settings.uniforms.texture, 0);
                this._gl.activeTexture(this._gl.TEXTURE0);
                this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture.data);
    
                this._gl.uniform2f(this._settings.uniforms.texture_resolution, this._texture.width, this._texture.height);
            }

            this._program.Draw(delta, this._step);

        }

        this._gl.drawArrays(this._gl.TRIANGLE_STRIP, 0, 4);

        this._last = Date.now();
        this._step += delta / 16.66666;
    }
}