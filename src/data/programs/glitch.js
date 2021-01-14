import fragment from './shaders/glitch/fragment.glsl';
import vertex from './shaders/glitch/vertex.glsl';

import { toProgram } from './utils/shader-loader';

export class GlitchProgram {
    constructor(handler){
        this._program = toProgram(handler._gl, vertex, fragment);

        this._handler = handler;

        this._settings = ((uniforms) => ({ uniforms }))({
            gliches : this._handler._gl.getUniformLocation(this._program, "u_gliches"),
            random  : this._handler._gl.getUniformLocation(this._program, "u_random")
        });
    }

    useTexture(name){
        this._texture = name;
    }

    _glitches(){
        return [
            Math.random(), Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(), Math.random()
        ]
    }

    Draw(delta, step){
        if(Math.floor(step) % (5 + Math.floor(Math.random() * 10)) == 0){
            this._handler._gl.uniform1f(this._settings.uniforms.random, 10 + Math.floor(Math.random() * 5));

            this._handler._gl.uniform4fv(this._settings.uniforms.gliches, this._glitches());
        }
    }
}