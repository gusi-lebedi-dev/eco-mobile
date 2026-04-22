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
             categoryText.includes('международная') ? 'mezhdunarod' :
                           categoryText.includes('связ') ? 'svyaz' :
                           categoryText.includes('перенос') ? 'perenos' :
                           categoryText.includes('платеж') || categoryText.includes('финанс') ? 'platezhi' :
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
        
        if (searchInput) {
            searchInput.value = '';
            const inputEvent = new Event('input', { bubbles: true });
            searchInput.dispatchEvent(inputEvent);
        }
    }

    const searchInput = container.querySelector('.search-input');
    const faqCards = container.querySelectorAll('.faq-card');
    
    if (searchInput && faqCards.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim().toLowerCase();
            
            faqCards.forEach(card => {
                const textElements = card.querySelectorAll('h4, p');
                const searchableText = Array.from(textElements).map(el => el.textContent.toLowerCase()).join(' ');
                if (searchTerm === '' || searchableText.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
            
            const mainTitle = container.querySelector('h3.faq-grid-title.main-title');
            const gridCards = container.querySelectorAll('.faq-grid .faq-card');
            const gridVisible = Array.from(gridCards).some(card => card.style.display !== 'none');
            mainTitle.style.display = gridVisible ? '' : 'none';
            
            const twoTitle = container.querySelector('.faq-two-container h3.faq-grid-title');
            const twoCards = container.querySelectorAll('.faq-two-block-container .faq-card');
            const twoVisible = Array.from(twoCards).some(card => card.style.display !== 'none');
            if (twoTitle) twoTitle.style.display = twoVisible ? '' : 'none';
        });
    }
});
