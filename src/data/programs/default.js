import fragment from './shaders/default/fragment.glsl';
import vertex from './shaders/default/vertex.glsl';

import { Program } from './utils/program';
import { toProgram } from './utils/shader-loader';

export class DefaultProgram extends Program {
    constructor(handler){
        super(
            // Handler
            handler,
            // Program
            toProgram(handler._gl, vertex, fragment)
        );
    }

    draw(delta, step){
        // No do nothing...
    }
}