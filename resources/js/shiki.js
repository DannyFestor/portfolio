import { getHighlighter, setCDN } from 'shiki';

console.log('SHIKI');
setCDN('/assets/shiki/');

document.addEventListener('DOMContentLoaded', async () => {
    const elements = document.querySelectorAll('#post pre code');
    console.log(elements);
    const highlighter = await getHighlighter({
        theme: 'one-dark-pro',
        langs: [
            "css",
            "dart",
            "docker",
            "go",
            'html',
            "javascript",
            // "json",
            // "markdown",
            "php",
            // "php-html",
            "rust",
            "sass",
            "scss",
            "shellscript",
            "sql",
            // "svelte",
            "tsx",
            "typescript",
            // "vue",
            "vue-html",
        ],
    });

    elements.forEach((element) => {
        const language = element.className.match(/\s*language-(.*)\s*/);
        console.log(language, typeof language,
            language !== null ? language[1] : 0);
        const code = highlighter.codeToHtml(element.innerText,
            { lang: language !== null ? language[1] ?? 'html' : 'html' });
        element.innerHTML = code;
    });
});
