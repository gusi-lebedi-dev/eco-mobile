document.addEventListener('DOMContentLoaded', function () {

  const networkButtons = document.querySelectorAll('.pricing-filters__network-item');
  const categoryButtons = document.querySelectorAll('.pricing-filters__plans-item');
  const planItems = document.querySelectorAll('.pricing-plans__item');

  let activeNetwork = 'all';
  let activeCategory = 'all';

  function applyFilters() {
    planItems.forEach(item => {
      const networkClasses = Array.from(item.classList)
          .filter(cls => cls.startsWith('network-'))
          .map(cls => cls.replace('network-', ''));

      const categoryClasses = Array.from(item.classList)
          .filter(cls => cls.startsWith('category-'))
          .map(cls => cls.replace('category-', ''));

      const networkMatch =
          activeNetwork === 'all' || networkClasses.includes(activeNetwork);

      const categoryMatch =
          activeCategory === 'all' || categoryClasses.includes(activeCategory);

      if (networkMatch && categoryMatch) {
        item.classList.add('visible');
      } else {
        item.classList.remove('visible');
      }
    });
  }

  networkButtons.forEach(button => {
    button.addEventListener('click', function () {
      networkButtons.forEach(btn => btn.classList.remove('is-active'));
      this.classList.add('is-active');
      activeNetwork = this.dataset.network || 'all';
      applyFilters();
    });
  });

  categoryButtons.forEach(button => {
    button.addEventListener('click', function () {
      categoryButtons.forEach(btn => btn.classList.remove('is-active'));
      this.classList.add('is-active');
      activeCategory = this.dataset.filter || 'all';
      applyFilters();
    });
  });

  applyFilters();

});