document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('#post img');

    images.forEach((image) =>
        image.addEventListener('click', () => {
            const container = document.createElement('div');
            const backdrop = document.createElement('div');
            const imgContainer = document.createElement('div');
            const img = document.createElement('img');

            container.classList.add(
                'fixed',
                'inset-0',
                'popup',
                'shrink',
                'z-50',
                'flex',
                'justify-center',
                'items-center',
                'p-8',
            );
            backdrop.classList.add(
                'absolute',
                'bg-black',
                'bg-opacity-40',
                'inset-0',
            );
            imgContainer.classList.add(
                'relative',
                'bg-white',
                'p-4',
                'rounded',
                'w-full',
                // 'h-full',
                'max-w-[1024px]',
                // 'max-h-[768px]',
                'max-h-screen',
            );
            img.classList.add('h-full', 'w-full', 'object-contain');

            img.src = image.src;
            imgContainer.appendChild(img);
            container.appendChild(backdrop);
            container.appendChild(imgContainer);
            document.body.appendChild(container);
            document.body.style.overflowY = 'hidden';

            backdrop.addEventListener('click', () => {
                container.classList.add('shrink');
                setTimeout(() => {
                    backdrop.parentElement.remove();
                    document.body.style.overflowY = null;
                }, 300);
            });

            requestAnimationFrame(() => {
                container.classList.remove('shrink');
            });
        }),
    );
});
