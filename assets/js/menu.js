// возвращает куки с указанным name,
// или undefined, если ничего не найдено
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
//установка cookie
function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  };

  document.cookie = updatedCookie;
}
//удалить cookie
function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
};

const currentLocation = location.href;
const menuItem = document.querySelectorAll('.menu-item__link');
const menuLenght = menuItem.length;
for (let i = 0; i < menuLenght; i++) {
  if (menuItem[i].href == currentLocation) {
    menuItem[i].className = "active menu-item__link";
  }
}
const menuItem1 = document.querySelectorAll('.page-menu-item__link');
const menuLenght1 = menuItem1.length;
for (let i = 0; i < menuLenght1; i++) {
  if (menuItem1[i].href == currentLocation) {
    menuItem1[i].className = "active page-menu-item__link";
  }
}

// header Location

const locBtn = document.querySelector('[data-location-trigger]');
const mediaQuery = window.matchMedia('(min-width: 1279px)');

//if (locBtn && mediaQuery.matches) {
if (locBtn) {
  const locList = document.querySelector('[data-location-list]');

  locBtn.addEventListener('click', (e) => {
    locList.classList.add('show');
  });
  const locMoscow = document.querySelector('[data-moscow]');
  const locPiter = document.querySelector('[data-piter]');
  const locMoscowMobile = document.querySelector('[data-moscow-mobile]');
  const locPiterMobile = document.querySelector('[data-piter-mobile]');
  const locMain = document.querySelector('[data-loc]');
  const locMainMobile = document.querySelector('[data-loc-mobile]');
  const ElementsMoscow = document.querySelectorAll('.moscow');
  const ElementsPiter = document.querySelectorAll('.piter');
  const LocFieldsForms = document.querySelectorAll('.locfield');
  var loc = getCookie('location');
  const FirstMoscowNav = document.getElementById('first-moscow-nav');
  const FirstPiterNav = document.getElementById('first-piter-nav');
  const FirstMoscowTab = document.getElementById('first-moscow-tab');
  const FirstPiterTab = document.getElementById('first-piter-tab');
  if (loc == 'undefined') {
    setCookie('location', 'moscow', { secure: false, 'max-age': 3600 });
    loc = 'moscow';
    alert(loc);
  }
  if (loc == 'piter') {
    locMoscow.classList.remove('active');
    locPiter.classList.add('active');
    locMain.innerHTML = 'Санкт-Петербург';
    locMoscowMobile.classList.remove('active');
    locPiterMobile.classList.add('active');
    locMainMobile.innerHTML = 'Санкт-Петербург';
    for (let elem of ElementsMoscow) {
      elem.classList.remove('show');
    }
    for (let elem of ElementsPiter) {
      elem.classList.add('show');
    }
    for (let elem of LocFieldsForms) {
      elem.value = 'Санкт-Петербург';
    }
    if (FirstPiterNav) {
      FirstPiterNav.classList.add('active');
      FirstPiterTab.classList.add('open');
      FirstPiterTab.style = 'display: block; opacity: 1; transition: opacity 600ms ease 0s;';
    }
  }
  if (loc == 'moscow') {
    locPiter.classList.remove('active');
    locMoscow.classList.add('active');
    locMain.innerHTML = 'Москва';
    locPiterMobile.classList.remove('active');
    locMoscowMobile.classList.add('active');
    locMainMobile.innerHTML = 'Москва';
    for (let elem of ElementsMoscow) {
      elem.classList.add('show');
    }
    for (let elem of ElementsPiter) {
      elem.classList.remove('show');
    }
    for (let elem of LocFieldsForms) {
      elem.value = 'Москва';
    }
    if (FirstMoscowNav) {
      FirstMoscowNav.classList.add('active');
      FirstMoscowTab.classList.add('open');
      FirstMoscowTab.style = 'display: block; opacity: 1; transition: opacity 600ms ease 0s;';
    }
  }
  locMoscow.addEventListener('click', (e) => {
    locMoscow.classList.add('active');
    locPiter.classList.remove('active');
    locMain.innerHTML = 'Москва';
    locMoscowMobile.classList.add('active');
    locPiterMobile.classList.remove('active');
    locMainMobile.innerHTML = 'Москва';
    setCookie('location', 'moscow', { secure: false, 'max-age': 3600 });
    for (let elem of ElementsMoscow) {
      elem.classList.add('show');
    }
    for (let elem of ElementsPiter) {
      elem.classList.remove('show');
    }
    for (let elem of LocFieldsForms) {
      elem.value = 'Москва';
    }
    if (FirstMoscowNav) {
      FirstMoscowNav.classList.add('active');
      FirstMoscowTab.classList.add('open');
      FirstMoscowTab.style = 'display: block; opacity: 1; transition: opacity 600ms ease 0s;';
    }
    fadeOutNew(locList, 300);

  });
  locPiter.addEventListener('click', (e) => {
    locMoscow.classList.remove('active');
    locPiter.classList.add('active');
    locMain.innerHTML = 'Санкт-Петербург';
    locMoscowMobile.classList.remove('active');
    locPiterMobile.classList.add('active');
    locMainMobile.innerHTML = 'Санкт-Петербург';
    setCookie('location', 'piter', { secure: false, 'max-age': 3600 });
    for (let elem of ElementsMoscow) {
      elem.classList.remove('show');
    }
    for (let elem of ElementsPiter) {
      elem.classList.add('show');
    }
    for (let elem of LocFieldsForms) {
      elem.value = 'Санкт-Петербург';
    }
    if (FirstPiterNav) {
      FirstPiterNav.classList.add('active');
      FirstPiterTab.classList.add('open');
      FirstPiterTab.style = 'display: block; opacity: 1; transition: opacity 600ms ease 0s;';
    }
    fadeOutNew(locList, 300);

  });

  /*document.addEventListener('click', (e) => {
    let target = e.target;
    if (!target.closest('[data-service-trigger]') && !target.closest('[data-service-menu]')) {
      serviceBtn.classList.remove('active');
      serviceNav.classList.remove('show');
    }
  });*/
  document.addEventListener('click', (e) => {
    const withinBoundaries1 = e.composedPath().includes(locList);
    const withinBoundaries2 = e.composedPath().includes(locBtn);
    if ((!withinBoundaries1) && (!withinBoundaries2)) {
      locList.classList.remove('show'); // скрываем элемент т к клик был за его пределами
    }
  });
}

// mobile Location

const locBtnMobile = document.querySelector('[data-location-trigger-mobile]');
const mediaQueryMobile = window.matchMedia('(max-width: 1278px)');

//if (locBtnMobile && mediaQueryMobile.matches) {
if (locBtnMobile) {
  const locListMobile = document.querySelector('[data-location-list-mobile]');

  locBtnMobile.addEventListener('click', (e) => {
    locListMobile.classList.add('show');
  });
  const locMoscowMobile = document.querySelector('[data-moscow-mobile]');
  const locPiterMobile = document.querySelector('[data-piter-mobile]');
  const locMoscow = document.querySelector('[data-moscow]');
  const locPiter = document.querySelector('[data-piter]');
  const locMainMobile = document.querySelector('[data-loc-mobile]');
  const locMain = document.querySelector('[data-loc]');
  const ElementsMoscow = document.querySelectorAll('.moscow');
  const ElementsPiter = document.querySelectorAll('.piter');
  const LocFieldsForms = document.querySelectorAll('.locfield');
  const FirstMoscowNav = document.getElementById('first-moscow-nav');
  const FirstPiterNav = document.getElementById('first-piter-nav');
  const FirstMoscowTab = document.getElementById('first-moscow-tab');
  const FirstPiterTab = document.getElementById('first-piter-tab');

  var loc = getCookie('location');
  if (loc == 'undefined') {
    setCookie('location', 'moscow', { secure: false, 'max-age': 3600 });
    loc = 'moscow';
  }
  if (loc == 'piter') {
    locMoscowMobile.classList.remove('active');
    locPiterMobile.classList.add('active');
    locMainMobile.innerHTML = 'Санкт-Петербург';
    locMoscow.classList.remove('active');
    locPiter.classList.add('active');
    locMain.innerHTML = 'Санкт-Петербург';
    for (let elem of ElementsMoscow) {
      elem.classList.remove('show');
    }
    for (let elem of ElementsPiter) {
      elem.classList.add('show');
    }
    for (let elem of LocFieldsForms) {
      elem.value = ('Санкт-Петербург');
    }
    if (FirstPiterNav) {
      FirstPiterNav.classList.add('active');
      FirstPiterTab.classList.add('open');
      FirstPiterTab.style = 'display: block; opacity: 1; transition: opacity 600ms ease 0s;';
    }
  }
  if (loc == 'moscow') {
    locPiterMobile.classList.remove('active');
    locMoscowMobile.classList.add('active');
    locMainMobile.innerHTML = 'Москва';
    locPiter.classList.remove('active');
    locMoscow.classList.add('active');
    locMain.innerHTML = 'Москва';
    for (let elem of ElementsMoscow) {
      elem.classList.add('show');
    }
    for (let elem of ElementsPiter) {
      elem.classList.remove('show');
    }
    for (let elem of LocFieldsForms) {
      elem.value = ('Москва');
    }
    if (FirstMoscowNav) {
      FirstMoscowNav.classList.add('active');
      FirstMoscowTab.classList.add('open');
      FirstMoscowTab.style = 'display: block; opacity: 1; transition: opacity 600ms ease 0s;';
    }
  }
  locMoscowMobile.addEventListener('click', (e) => {
    locMoscowMobile.classList.add('active');
    locPiterMobile.classList.remove('active');
    locMainMobile.innerHTML = 'Москва';
    locMoscow.classList.add('active');
    locPiter.classList.remove('active');
    locMain.innerHTML = 'Москва';
    setCookie('location', 'moscow', { secure: false, 'max-age': 3600 });
    for (let elem of ElementsMoscow) {
      elem.classList.add('show');
    }
    for (let elem of ElementsPiter) {
      elem.classList.remove('show');
    }
    for (let elem of LocFieldsForms) {
      elem.value = 'Москва';
    }
    if (FirstMoscowNav) {
      FirstMoscowNav.classList.add('active');
      FirstMoscowTab.classList.add('open');
      FirstMoscowTab.style = 'display: block; opacity: 1; transition: opacity 600ms ease 0s;';
    }
    fadeOutNew(locListMobile, 300);
  });
  locPiterMobile.addEventListener('click', (e) => {
    locMoscowMobile.classList.remove('active');
    locPiterMobile.classList.add('active');
    locMainMobile.innerHTML = 'Санкт-Петербург';
    locMoscow.classList.remove('active');
    locPiter.classList.add('active');
    locMain.innerHTML = 'Санкт-Петербург';
    setCookie('location', 'piter', { secure: false, 'max-age': 3600 });
    for (let elem of ElementsMoscow) {
      elem.classList.remove('show');
    }
    for (let elem of ElementsPiter) {
      elem.classList.add('show');
    }
    for (let elem of LocFieldsForms) {
      elem.value = 'Санкт-Петербург';
    }
    if (FirstPiterNav) {
      FirstPiterNav.classList.add('active');
      FirstPiterTab.classList.add('open');
      FirstPiterTab.style = 'display: block; opacity: 1; transition: opacity 600ms ease 0s;';
    }
    fadeOutNew(locListMobile, 300);
  });

  /*document.addEventListener('click', (e) => {
    let target = e.target;
    if (!target.closest('[data-service-trigger]') && !target.closest('[data-service-menu]')) {
      serviceBtn.classList.remove('active');
      serviceNav.classList.remove('show');
    }
  });*/
  document.addEventListener('click', (e) => {
    const withinBoundaries1 = e.composedPath().includes(locListMobile);
    const withinBoundaries2 = e.composedPath().includes(locBtnMobile);
    if ((!withinBoundaries1) && (!withinBoundaries2)) {
      locListMobile.classList.remove('show'); // скрываем элемент т к клик был за его пределами
    }
  });
}
// FadeIn / FadeOut

function fadeIn(el, timeout, display) {
  el.style.opacity = 0;
  el.style.display = display || 'block';
  el.style.transition = `opacity ${timeout}ms`;
  setTimeout(() => {
    el.style.opacity = 1;
  }, 10);
}

function fadeOut(el, timeout) {
  el.style.opacity = 1;
  el.style.transition = `opacity ${timeout} ms`;
  el.style.opacity = 0;

  setTimeout(() => {
    el.style.display = 'none';
    console.log('yes1');
    $(window).trigger('resize');
  }, 10);
}

function fadeOutNew(el, timeout) {
  el.style.opacity = 1;
  el.style.transition = `opacity ${timeout} ms`;
  el.style.opacity = 0;

  setTimeout(() => {
    el.classList.remove('show');
    $('.tariff-inner.open').css('width', '99.99%');
  }, 10);
  setTimeout(() => {
    $('.tariff-inner.open').css('width', '100%');
  }, 20);
}
// View more piter

const allLinkPiter = document.querySelectorAll('[data-link-all-piter]');

if (allLinkPiter) {
  allLinkPiter.forEach(elem => {
    const allLinkDataPiter = elem.getAttribute('data-link-all-piter');
    const parentPiter = document.querySelector(`[data-parent-items-piter=${allLinkDataPiter}]`);
    const itemsPiter = parentPiter.querySelectorAll('[data-item-piter]');

    elem.addEventListener('click', (e) => {
      e.preventDefault();

      fadeOut(elem, 300);

      itemsPiter.forEach(item => {
        if (item.classList.contains('hide')) {
          item.classList.remove('hide');
          fadeIn(item, 300, 'block');
        }
      });
    });
  });
}

