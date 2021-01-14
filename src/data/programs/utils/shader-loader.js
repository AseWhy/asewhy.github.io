export function createShader(gl, sourceCode, type) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, sourceCode);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog( shader );

        throw 'Could not compile WebGL program. \n\n' + info;
    }

    return shader;
}

export function toProgram(gl, vertex, fragment){
    const program = gl.createProgram();

    gl.attachShader(program, createShader(gl, vertex, gl.VERTEX_SHADER));
    gl.attachShader(program, createShader(gl, fragment, gl.FRAGMENT_SHADER));

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const info = gl.getProgramInfoLog(program);

        throw 'Could not compile WebGL program. \n\n' + info;
    }

    return program;
}