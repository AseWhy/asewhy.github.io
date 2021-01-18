export class Program {
    constructor(handler, program, settings){
        this._program = program;
        
        this._handler = handler;

        this._settings = settings || new Object();

        this._settings.uniforms = this._settings.uniforms || new Object();

        this._settings.attrs = this._settings.attrs || new Object();

        if(this._settings.uniforms)
            for(let key in this._settings.uniforms) {
                this._settings.uniforms[key] = this._handler._gl.getUniformLocation(this._program, this._settings.uniforms[key]);
            }
    }
}