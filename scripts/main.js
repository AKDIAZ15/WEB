document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu & Header Logic (Existing)
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileNav = document.getElementById('mobileNav');
    const body = document.body;

    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
            mobileToggle.classList.toggle('active');
            if (mobileNav.classList.contains('open')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        const navLinks = mobileNav.querySelectorAll('.nav-link, .btn');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                body.style.overflow = '';
                mobileToggle.classList.remove('active');
            });
        });
    }

    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(18, 18, 18, 0.98)';
            } else {
                header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
            }
        });
    }

    // Hero Image Sequence Animation
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) {
        const context = heroCanvas.getContext('2d');
        const frameCount = 80;
        const images = [];
        const imagePrefix = 'images/Hero/The_scissors_opens_1080p_202602031803_';
        const imageSuffix = '.jpg';

        let loadedImages = 0;
        let currentFrame = 0;

        // Resize canvas to fill the screen
        const resizeCanvas = () => {
            heroCanvas.width = window.innerWidth;
            heroCanvas.height = window.innerHeight;
            // Redraw current frame after resize
            if (images[currentFrame]) {
                drawFrame(currentFrame);
            }
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Draw Frame with 'object-fit: cover' logic
        const drawFrame = (index) => {
            const img = images[index];
            if (!img) return;

            const canvasRatio = heroCanvas.width / heroCanvas.height;
            const imgRatio = img.width / img.height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvasRatio > imgRatio) {
                drawWidth = heroCanvas.width;
                drawHeight = heroCanvas.width / imgRatio;
                offsetX = 0;
                offsetY = (heroCanvas.height - drawHeight) / 2;
            } else {
                drawWidth = heroCanvas.height * imgRatio;
                drawHeight = heroCanvas.height;
                offsetX = (heroCanvas.width - drawWidth) / 2;
                offsetY = 0;
            }

            context.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
            context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        // Animation Loop
        const updateImage = () => {
            drawFrame(currentFrame);
            currentFrame = (currentFrame + 1) % frameCount;
            // ~30 FPS
            setTimeout(() => {
                requestAnimationFrame(updateImage);
            }, 1000 / 30);
        };

        // Preload Images
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            const frameIndex = i.toString().padStart(3, '0');
            img.src = `${imagePrefix}${frameIndex}${imageSuffix}`;
            img.onload = () => {
                loadedImages++;

                // Draw first frame immediately when loaded so canvas isn't empty
                if (i === 0) {
                    drawFrame(0);
                }

                // Start animation loop when all images are loaded
                if (loadedImages === frameCount) {
                    updateImage();
                }
            };
            images.push(img);
        }
    }
});
