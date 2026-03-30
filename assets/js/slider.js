document.querySelectorAll('.media-slider').forEach((slider) => {

    const slides = slider.querySelectorAll('.media-slide');
    const dotsContainer = slider.querySelector('.media-dots');
    const arrow = slider.querySelector('.media-arrow');

    let current = 0;
    let interval;

    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
            showSlide(index);
        });

        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function showSlide(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');

        current = index;

        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function nextSlide() {
        let next = current + 1;
        if (next >= slides.length) next = 0;
        showSlide(next);
    }

    if (arrow) {
        arrow.addEventListener('click', nextSlide);
    }

    function startAuto() {
        interval = setInterval(nextSlide, 5000);
    }

    function stopAuto() {
        clearInterval(interval);
    }

    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);

    startAuto();
});