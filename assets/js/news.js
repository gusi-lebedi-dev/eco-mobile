document.addEventListener('DOMContentLoaded', function() {
    const newsItems = document.querySelectorAll('.news-item');
    const newsList = document.querySelector('.news-content');
    const newsArticles = document.querySelectorAll('.news-article');
    const backBtns = document.querySelectorAll('.back-to-news');

function showNews(id) {
        newsList.style.display = 'none';
        document.querySelector('.tab-inner-news h3').style.display = 'none';
        newsArticles.forEach(article => {
            if (article.id === `news-${id}`) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    }

    function backToList() {
        newsArticles.forEach(article => article.style.display = 'none');
        newsList.style.display = 'grid';
        document.querySelector('.tab-inner-news h3').style.display = 'block';
    }



    newsItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const newsId = this.getAttribute('data-news');
            if (newsId) {
                showNews(newsId);
            }
        });
    });

    backBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            backToList();
        });
    });
});
