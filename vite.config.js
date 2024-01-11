import { defineConfig } from 'vite';
import { ViteImageOptimizer as viteImageOptimizer } from 'vite-plugin-image-optimizer';

import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react(),
        viteImageOptimizer({
            png: {
                quality: 90
            },
            jpeg: {
                quality: 90
            },
            jpg: {
                quality: 90
            }
        })
    ],
    server: {
        host: true
    }
});