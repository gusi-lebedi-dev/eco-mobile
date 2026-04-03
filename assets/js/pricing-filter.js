document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.pricing-filters__plans-item');
  const planItems = document.querySelectorAll('.pricing-plans__item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('is-active'));
      this.classList.add('is-active');
      
      const filterValue = this.dataset.filter;
      
      planItems.forEach(item => {
        item.classList.remove('visible');
        
        if (filterValue === 'all') {
          item.classList.add('visible');
        } else {
          const filterClass = 'category-' + filterValue;
          if (item.classList.contains(filterClass)) {
            item.classList.add('visible');
          }
        }
      });
    });
  });
});
