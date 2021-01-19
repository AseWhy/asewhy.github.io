import { ResizeObserver } from 'resize-observer';

import { DefaultProgram } from '../../programs/default';

import { Module } from "../astecoms-module";

export const ImageHandler = new class ImageHandler extends Module {
    constructor(){
        super('ImageHandler');

        this._context = null;
        this._canvas = null;
        this._observer = new ResizeObserver(this.__resize.bind(this));
        this._programs = new Array();
        this._buffer = null;
        this._step = 0;
        this._last = Date.now();
        this._texture = null;
        this._texutre_url = null;
        this._disabled = this.get('disabled');
        this._glawaible = true;
        this._draw = this.__draw.bind(this);

        requestAnimationFrame(this._draw);
    }
    
    /**
     * Возвращает хуки для вызова функций из DOM
     */
    getHooks(){
        return [
            'disableAll',
            'enableAll',
            'chStatusAll'
        ]
    }

    disableAll(){
        this._disabled = true;

        this.set('disabled', true);
    }

    enableAll(){
        this._disabled = false;

        this.set('disabled', false);
    }

    chStatusAll(){
        this._disabled = !this._disabled;

        this.set('disabled', this._disabled);
    }

    enable(Program) {
        if(this._canvas == null)
            throw new Error('Handler not loaded.');

        const program = new Program(this);

        program._settings.uniforms.step                   = this._context.getUniformLocation(program._program, "u_step");
        program._settings.uniforms.texture                = this._context.getUniformLocation(program._program, "u_texture"),
        program._settings.uniforms.texture_resolution     = this._context.getUniformLocation(program._program, "u_texture_resolution"),
        program._settings.uniforms.resolution             = this._context.getUniformLocation(program._program, "u_resolution");
        program._settings.attrs.position                  = this._context.getAttribLocation(program._program, "a_position");

        this._programs.push(program);
    }

    setTexture(path_to_img){
        const _ = this;

        if(_._canvas == null)
            throw new Error('Handler not loaded.');

        const image = new Image();

        image.src = _._texutre_url = path_to_img;

        return new Promise(res => {
            image.onload = function() {
                let coifx = (_._canvas.offsetWidth / image.width),
                    coify = (_._canvas.offsetHeight / image.height);

                if(coifx > coify){
                    image.width *= coifx;
                    image.height *= coifx;
                } else {
                    image.width *= coify;
                    image.height *= coify;
                }

                const bitmap = _._context.createTexture();

                _._context.bindTexture(_._context.TEXTURE_2D, bitmap);

                _._context.texImage2D(_._context.TEXTURE_2D, 0, _._context.RGBA, _._context.RGBA, _._context.UNSIGNED_BYTE, image);

                _._context.texParameteri(_._context.TEXTURE_2D, _._context.TEXTURE_WRAP_S, _._context.REPEAT);
                _._context.texParameteri(_._context.TEXTURE_2D, _._context.TEXTURE_WRAP_T, _._context.REPEAT);
                _._context.texParameteri(_._context.TEXTURE_2D, _._context.TEXTURE_MIN_FILTER, _._context.LINEAR);

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

        this._context = this._canvas.getContext("webgl2");

        if(this._context) {
            this._buffer = this._context.createBuffer();

            // bind buffers
            this._context.bindBuffer(this._context.ARRAY_BUFFER, this._buffer);

            // Full Screen buffer
            this._context.bufferData(this._context.ARRAY_BUFFER, new Float32Array([
                1.0,  1.0,
                -1.0, 1.0,
                1.0, -1.0,
                -1.0, -1.0
            ]), this._context.STATIC_DRAW);

            // Enable defautl program
            this.enable(DefaultProgram);
        } else {
            this._context = this._context.getContext('2d');
            
            this._glawaible = false;
        }
    }

    stop(){
        this._observer.unobserve(this._canvas);
        this._canvas = null;
        this._context = null;
    }

    __resize(){
        this._canvas.height = this._canvas.offsetHeight;
        this._canvas.width = this._canvas.offsetWidth;

        if(typeof this._texutre_url == 'string')
            this.setTexture(this._texutre_url);

        this._context.viewport(0, 0, this._canvas.width, this._canvas.height);
    }

    __draw(){
        // Binded funtion call
        requestAnimationFrame(this._draw);

        const delta = Date.now() - this._last;

        // Float owerflow protection
        if(this._step > 2139095039)
            this._step = 0;

        if(this._context != null) {
            if(this._glawaible) {
                this._context.clear(this._context.COLOR_BUFFER_BIT | this._context.DEPTH_BUFFER_BIT);
                this._context.bindBuffer(this._context.ARRAY_BUFFER, this._buffer);

                for(let i = 0, leng = this._programs.length, current; i < leng; i++) {
                    current = this._programs[i];

                    // Если обработчик был ранее выключен, то рендерится стандартная программа обработки.
                    if(this._disabled && !(current instanceof DefaultProgram))
                        continue;

                    this._context.useProgram(current._program);

                    // uniforms
                    this._context.uniform2f(current._settings.uniforms.resolution, this._canvas.offsetWidth, this._canvas.offsetHeight);
                    this._context.uniform1i(current._settings.uniforms.step, this._step);

                    // attrs
                    this._context.enableVertexAttribArray(current._settings.attrs.position);
                    this._context.vertexAttribPointer(current._settings.attrs.position, 2, this._context.FLOAT, false, 0, 0);

                    if(this._texture) {
                        this._context.uniform1i(current._settings.uniforms.texture, 0);
                        this._context.activeTexture(this._context.TEXTURE0);
                        this._context.bindTexture(this._context.TEXTURE_2D, this._texture.data);
            
                        this._context.uniform2f(current._settings.uniforms.texture_resolution, this._texture.width, this._texture.height);
                    }

                    current.draw(delta, this._step);
                }

                this._context.drawArrays(this._context.TRIANGLE_STRIP, 0, 4);
            } else {
                this._context.clearRect(0, 0, this._canvas.offsetWidth, this._canvas.offsetHeight);

                this._context.drawImage(this._texture.data, (this._canvas.offsetWidth - this._texture.width) / 2, (this._canvas.offsetHeight - this._texture.height) / 2);
            }
        }

        this._last = Date.now();
        this._step += delta / 16.66666;
    }
}