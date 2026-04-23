document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', function () {
        const tabId = this.getAttribute('data-tab');

        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

        this.classList.add('active');
        document.getElementById(tabId).classList.add('active');

        if (tabId === 'news') {
            const newsList = document.querySelector('.news-list');
            const newsArticles = document.querySelectorAll('.news-article');
            const newsH3 = document.querySelector('.tab-inner-news h3');

            newsArticles.forEach(article => article.style.display = 'none');
            if (newsList) newsList.style.display = 'grid';
            if (newsH3) newsH3.style.display = 'block';
        } else if (tabId === 'articles') {
            const articlesList = document.querySelector('.articles-list');
            const articleFulls = document.querySelectorAll('.article-full');
            const articlesH3 = document.querySelector('.tab-inner-articles h3');
            const articlesTop = document.querySelector('.articles-top');

            articleFulls.forEach(article => article.style.display = 'none');
            if (articlesList) articlesList.style.display = 'grid';
            if (articlesTop) articlesTop.style.display = 'flex';
            if (articlesH3) articlesH3.style.display = 'block';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('phoneInput');
    if (!input) return;

    const wrapper = document.querySelector('.single-result__number');

    const customPlaceholder = document.createElement('div');
    customPlaceholder.className = 'custom-colored-placeholder';
    customPlaceholder.innerHTML = '<span class="first-part">+7</span><span class="rest-part"> (999) 99 99 999</span>';

    input.parentNode.style.position = 'relative';
    input.parentNode.appendChild(customPlaceholder);

    function updatePlaceholder() {
        if (input.value === '') {
            customPlaceholder.style.display = 'block';
        } else {
            customPlaceholder.style.display = 'none';
        }
    }

    input.addEventListener('input', updatePlaceholder);
    input.addEventListener('blur', updatePlaceholder);
    input.addEventListener('focus', updatePlaceholder);

    updatePlaceholder();
});

document.querySelectorAll('.single-result__price-button').forEach(button => {
    button.addEventListener('click', function () {

        const parent = this.closest('.single-result__price-type');

        parent.querySelectorAll('.single-result__price-button')
            .forEach(btn => btn.classList.remove('is-active'));

        this.classList.add('is-active');

    });
});

const tabs = document.querySelectorAll('.single-form__plan-tab');

tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('is-active'));
        this.classList.add('is-active');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const advantages = document.querySelector('.advantages');
    const items = document.querySelectorAll('.advantages-item');
    let currentIndex = 0;
    items[0]?.classList.add('active');
    advantages?.addEventListener('click', function () {
        if (window.innerWidth > 768) {
            advantages.classList.toggle('active');
        }

        items.forEach(item => item.classList.remove('active'));
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.add('active');
    });

    document.querySelectorAll('.brand-card').forEach(card => {
        card.addEventListener('click', function () {
            const cardId = this.getAttribute('data-card');
            document.querySelectorAll('.brand-card').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    document.querySelector('.services-item__connect').addEventListener('click', function () {
        const modal = document.querySelector('.services-item__modal-connection');
        modal.classList.add('is-active');
    })
    document.querySelector('.services-item__modal-close').addEventListener('click', function () {
        const modal = document.querySelector('.services-item__modal-connection');
        const modalFinish = document.querySelector('.services-item__modal-connection--finish');
        modal.classList.remove('is-active');
        modalFinish.classList.remove('is-active');
    })

    document.querySelector('.services-item__modal-finish-close').addEventListener('click', function () {
        const modalFinish = document.querySelector('.services-item__modal-connection--finish');
        modalFinish.classList.remove('is-active');
    })

    document.querySelector('.services-item__modal--next').addEventListener('click', function () {
        const modalFinish = document.querySelector('.services-item__modal-connection--finish');
        const modal = document.querySelector('.services-item__modal-connection');
        modal.classList.remove('is-active');
        modalFinish.classList.add('is-active');
    })


})

