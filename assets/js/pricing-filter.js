document.addEventListener('DOMContentLoaded', function() {
  const filterContainers = document.querySelectorAll('.pricing-filters__plans');
  if (filterContainers.length < 2) return;
  
  const networkContainer = filterContainers[0];
  const categoryContainer = filterContainers[1];
  
  const networkButtons = networkContainer.querySelectorAll('.pricing-filters__plans-item');
  const categoryButtons = categoryContainer.querySelectorAll('.pricing-filters__plans-item');
  const planItems = Array.from(document.querySelectorAll('.pricing-plans__item'));
  const showAllBtn = document.querySelector('.services__show-all');
  
  let activeNetwork = 'all';
  let activeCategory = 'all';
  
  networkButtons.forEach(button => {
    button.addEventListener('click', function() {
      networkButtons.forEach(btn => btn.classList.remove('is-active'));
      this.classList.add('is-active');
      activeNetwork = this.dataset.network || 'all';
      applyFilters();
      console.log('Network:', activeNetwork);
    });
  });
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      categoryButtons.forEach(btn => btn.classList.remove('is-active'));
      this.classList.add('is-active');
      activeCategory = this.dataset.filter || 'all';
      applyFilters();
      console.log('Category:', activeCategory);
    });
  });
  
  function getItemNetwork(item) {
    if (item.classList.contains('network-all')) return 'all';
    if (item.classList.contains('network-beeline')) return 'beeline';
    if (item.classList.contains('network-megafon')) return 'megafon';
    if (item.classList.contains('network-mts')) return 'mts';
    return '';
  }
  
  function getItemCategories(item) {
    return Array.from(item.classList)
      .filter(cls => cls.startsWith('category-'))
      .map(cls => cls.replace('category-', ''));
  }
  
  function applyFilters() {
    
    const matchingItems = planItems.filter(item => {
      const itemNetwork = getItemNetwork(item);
      const networkMatch = activeNetwork === 'all' || itemNetwork === activeNetwork;
      
      const itemCategories = getItemCategories(item);
      const categoryMatch = activeCategory === 'all' || itemCategories.includes(activeCategory);
      
      console.log(item.querySelector('.pricing-plans__item-title').textContent.trim(), {
        network: itemNetwork,
        categories: itemCategories,
        matches: networkMatch && categoryMatch
      });
      
      return networkMatch && categoryMatch;
    });
    
    console.log('Matching items:', matchingItems.length);
    
    planItems.forEach(item => item.classList.remove('visible'));
    
    const isAllFilters = activeNetwork === 'all' && activeCategory === 'all';
    
    if (isAllFilters) {
      matchingItems.slice(0, 6).forEach(item => item.classList.add('visible'));
      showAllBtn.style.display = matchingItems.length > 6 ? 'block' : 'none';
    } else {
      matchingItems.forEach(item => item.classList.add('visible'));
      showAllBtn.style.display = 'none';
    }
  }
  
  showAllBtn.addEventListener('click', function() {
    this.style.display = 'none';
    planItems.forEach(item => item.classList.add('visible'));
  });
  
  applyFilters();
});
