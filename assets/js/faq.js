document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.faq .container');
    const cardsGrid = container.querySelector('.faq-grid');
    const titles = container.querySelectorAll('h3.faq-grid-title.main-title');
    const twoBlock = container.querySelector('.faq-two-block');
    const fastCommands = container.querySelector('.fast-commands');
    const fullInfos = container.querySelectorAll('.faq-full-info');
    const arrows = container.querySelectorAll('.arrow-faq');

    fullInfos.forEach(info => info.style.display = 'none');

    container.querySelectorAll('.faq-card[data-category]').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;

            titles.forEach(title => title.style.display = 'none');
            cardsGrid.style.display = 'none';
            if (twoBlock) twoBlock.style.display = 'none';
            if (fastCommands) fastCommands.style.display = 'none';

            fullInfos.forEach(info => info.style.display = 'none');
            const targetInfo = container.querySelector(`.faq-full-info[data-faq="${category}"]`);
            if (targetInfo) {
                targetInfo.style.display = 'flex';
                updateLinksInInfo(targetInfo);
            }
            arrows.forEach(arrow => {
                arrow.style.transform = 'rotate(180deg)';
            });
        });
    });

    container.querySelectorAll('.faq-full-info-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const categoryText = this.textContent.trim().toLowerCase();
            const category = categoryText.includes('тариф') ? 'tarif' :
                           categoryText.includes('связ') ? 'svyaz' :
                           categoryText.includes('перенос') ? 'perenos' :
                           categoryText.includes('платеж') || categoryText.includes('финанс') ? 'platezhi' :
                           categoryText.includes('международн') ? 'mezhdunarod' :
                           categoryText.includes('расход') ? 'rashody' :
                           categoryText.includes('безопасн') ? 'bezopasnost' :
                           categoryText.includes('настройк') ? 'nastrojki' :
                           'techpod';

            fullInfos.forEach(info => info.style.display = 'none');
            const targetInfo = container.querySelector(`.faq-full-info[data-faq="${category}"]`);
            if (targetInfo) {
                targetInfo.style.display = 'flex';
                updateLinksInInfo(targetInfo);
            }
        });
    });

    function updateLinksInInfo(info) {
        info.querySelectorAll('.faq-full-info-link').forEach(l => l.classList.remove('active'));
        const currentTitle = info.querySelector('h3.faq-grid-title').textContent.trim().toLowerCase();
        info.querySelectorAll('.faq-full-info-link').forEach(link => {
            if (link.textContent.trim().toLowerCase().includes(currentTitle.split(' ')[0])) {
                link.classList.add('active');
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            resetFAQ();
        }
    });

    function resetFAQ() {
        fullInfos.forEach(info => info.style.display = 'none');
        cardsGrid.style.display = '';
        titles.forEach(title => title.style.display = '');
        if (twoBlock) twoBlock.style.display = '';
        if (fastCommands) fastCommands.style.display = '';
        arrows.forEach(arrow => arrow.style.transform = '');
    }
});
