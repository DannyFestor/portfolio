import popup from './image-popup';

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('#post img');
    popup(images);
});
