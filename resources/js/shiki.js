import { getHighlighter, setCDN } from 'shiki';

setCDN('/assets/shiki/');

document.addEventListener('DOMContentLoaded', async () => {
    const elements = document.querySelectorAll('#post pre code');
    const highlighter = await getHighlighter({
        theme: 'one-dark-pro',
        langs: [
            'css',
            'dart',
            'docker',
            'go',
            'html',
            'javascript',
            // "json",
            // "markdown",
            'php',
            // "php-html",
            'rust',
            'sass',
            'scss',
            'shellscript',
            'sql',
            // "svelte",
            'tsx',
            'typescript',
            // "vue",
            'vue-html',
        ],
    });

    elements.forEach((element) => {
        const language = element.className.match(/\s*language-(.*)\s*/);
        element.innerHTML = highlighter.codeToHtml(
            element.innerText,
            { lang: language !== null ? language[1] ?? 'html' : 'html' },
        );
    });
});
