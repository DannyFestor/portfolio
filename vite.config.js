import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/css/filament.css',
                'resources/js/post-image.js',
                'resources/js/project-image.js',
            ],
            refresh: true,
        }),
    ],
});
