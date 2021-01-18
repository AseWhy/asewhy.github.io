import fragment from './shaders/glitch/fragment.glsl';
import vertex from './shaders/glitch/vertex.glsl';

import { Program } from './utils/program';
import { toProgram } from './utils/shader-loader';

export class GlitchProgram extends Program {
    constructor(handler){
        super(
            // Handler
            handler,
            // Program
            toProgram(handler._gl, vertex, fragment),
            // Settings
            ((uniforms) => ({ uniforms }))({
                gliches : 'u_gliches',
                random  : 'u_random'
            })
        );
    }

    glitches(){
        return [
            Math.random(), Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(), Math.random()
        ]
    }

    draw(delta, step){
        if(Math.floor(step) % (5 + Math.floor(Math.random() * 10)) == 0){
            this._handler._gl.uniform1f(this._settings.uniforms.random, 10 + Math.floor(Math.random() * 5));

            this._handler._gl.uniform4fv(this._settings.uniforms.gliches, this.glitches());
        }
    }
}