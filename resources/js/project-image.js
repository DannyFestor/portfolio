import popup from './image-popup';

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('#previews img');
    console.log(images);
    popup(images);
});
