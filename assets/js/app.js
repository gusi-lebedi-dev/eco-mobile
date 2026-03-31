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
