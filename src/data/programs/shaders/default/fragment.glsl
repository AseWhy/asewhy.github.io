///
/// Упрощенный вариант шейдера, который не так сильно нагружает графический процессор
/// но приэтом и никак не обрабатывает изображение.
///

#ifdef GL_ES
    precision mediump float;
#endif

uniform sampler2D u_texture;            // семплер текстуры
uniform vec2      u_texture_resolution; // разрешение текстуры
uniform vec2      u_resolution;         // разрешение области отрисовки

vec4 getPoint(float x, float y){
    return texture2D(
        u_texture, vec2(
            x / u_texture_resolution.x + (u_texture_resolution.x - u_resolution.x) / u_texture_resolution.x / 2.0,
            1.0 - (y / u_texture_resolution.y + (u_texture_resolution.y - u_resolution.y) / u_texture_resolution.y / 2.0)
        )
    );
}

void main(void) {
    gl_FragColor = getPoint(floor(gl_FragCoord.x), floor(gl_FragCoord.y));
}