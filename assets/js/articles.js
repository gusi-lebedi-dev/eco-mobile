document.addEventListener('DOMContentLoaded', function() {
    const articleItems = document.querySelectorAll('.articles-item');
    const articlesTopItems = document.querySelectorAll('.articles-top-item');
    const articlesList = document.querySelector('.articles-list');
    const articlesTop = document.querySelector('.articles-top');
    const articlesTopList = document.querySelector('.articles-top-list');
    const articleFulls = document.querySelectorAll('.article-full');
    const articlesH3 = document.querySelector('.tab-inner-articles h3');
    const articlesTopTitle = document.querySelector('.articles-top-title');
    const articlesTopArrow = document.querySelector('.articles-top-arrow');
    const articlesTopToggle = document.querySelector('.articles-top-toggle');

function showArticle(id) {
        articlesList.style.display = 'none';
        articlesTop.style.display = 'none';
        if (articlesTopToggle) articlesTopToggle.style.display = 'none';
        if (articlesH3) articlesH3.style.display = 'none';
        articleFulls.forEach(article => {
            if (article.id === `article-${id}`) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    }

function showArticlesList() {
        articleFulls.forEach(article => article.style.display = 'none');
        articlesList.style.display = 'grid';
        articlesTop.style.display = 'flex';
        if (window.innerWidth <= 1110 && articlesTopToggle) articlesTopToggle.style.display = 'block';
        if (articlesH3) articlesH3.style.display = 'block';
    }

    if (window.innerWidth <= 1110) {
        articlesTopTitle.addEventListener('click', function() {
            if (articlesTopList.style.display === 'none' || window.getComputedStyle(articlesTopList).display === 'none') {
                articlesTopList.style.display = 'flex';
                articlesTopArrow.classList.add('active');
            } else {
                articlesTopList.style.display = 'none';
                articlesTopArrow.classList.remove('active');
            }
        });
    }

    articleItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const articleId = this.getAttribute('data-article');
            if (articleId) {
                showArticle(articleId);
            }
        });
    });

    articlesTopItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const articleId = this.getAttribute('data-article');
            if (articleId) {
                showArticle(articleId);
            }
        });
    });
});
