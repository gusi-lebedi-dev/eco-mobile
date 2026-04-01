document.addEventListener('DOMContentLoaded', () => {
  // Fancybox init

  // Fancybox.bind("[data-fancybox]", {
  //   dragToClose: false,
  // });

  
  const headerBurger = document.querySelector('[data-nav-trigger]');
  
  const headerNav = document.querySelector('[data-nav-menu]');
  const header = document.querySelector('.header');
  const headerNavClose = headerNav ? headerNav.querySelector('[data-nav-close]') : null;

  if (headerBurger && headerNav && header) {
    let closeCleanupTimer = null;

    const getMenuCloseDelayMs = () => {
      // Keep in sync with `app/assets/scss/components/_header.scss` (--mobile-menu-panel-ms)
      const raw = window.getComputedStyle(headerNav).getPropertyValue('--mobile-menu-panel-ms').trim();
      const parsed = Number.parseFloat(raw);
      return Number.isFinite(parsed) ? parsed : 420;
    };

    const clearCloseCleanupTimer = () => {
      if (closeCleanupTimer) {
        window.clearTimeout(closeCleanupTimer);
        closeCleanupTimer = null;
      }
    };

    const setMenuState = (isOpen) => {
      clearCloseCleanupTimer();
      headerBurger.classList.toggle('active', isOpen);
      headerNav.classList.toggle('open', isOpen);
      headerBurger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      headerNav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

      if (isOpen) {
        document.body.classList.add('overflow');
      } else {
        // Delay scroll unlock a bit so the close animation feels smoother (no page "jump")
        closeCleanupTimer = window.setTimeout(() => {
          document.body.classList.remove('overflow');
          closeCleanupTimer = null;
        }, getMenuCloseDelayMs() + 50);
      }
    };

    headerBurger.addEventListener('click', (e) => {
      e.preventDefault();
      setMenuState(!headerNav.classList.contains('open'));
    }, false);

    if (headerNavClose) {
      headerNavClose.addEventListener('click', (e) => {
        e.preventDefault();
        setMenuState(false);
      });
    }

    // Close by clicking on overlay background
    headerNav.addEventListener('click', (e) => {
      if (e.target === headerNav) setMenuState(false);
    });

    // Close by ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenuState(false);
    });

    // Header fixed

    let headerHeight = header.clientHeight;
    let headerPos = function () {
      let scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > headerHeight) {
        header.classList.add('scrollDown');
      }

      if (scrollTop == 0) {
        header.classList.remove('scrollDown');
        setMenuState(false);
      }

    };

    window.addEventListener('resize', () => {
      headerHeight = header.clientHeight;
    });
    window.addEventListener('load', headerPos);
    window.addEventListener('scroll', headerPos);
  }

  // Custom select

  document.querySelectorAll('select.js-select').forEach((el) => {
    let settings = {
      controlInput: '<input type="text" readonly />',
    };
    new TomSelect(el, settings);
  });

  // Конфигурация платежных методов
  const paymentMethods = {
    'sbp': {
      width: 63,
      height: 25,
      icon: '/images/icons/sbp.svg',
      alt: 'СБП'
    },
    'elecsnet': {
      width: 110,
      height: 21,
      icon: '/images/icons/elecsnet.svg',
      alt: 'Elecsnet'
    }
  };

  // Функция для создания HTML платежной иконки
  const createPaymentIcon = (paymentMethod, className = '') => {
    const config = paymentMethods[paymentMethod] || {
      width: 63,
      height: 25,
      icon: `/images/icons/${paymentMethod}.svg`,
      alt: paymentMethod
    };

    return `<img src="${config.icon}" alt="${config.alt}" class="icon ${className}" width="${config.width}" height="${config.height}" />`;
  };

  document.querySelectorAll('select.js-select-payment').forEach((el) => {
    let settings = {
      controlInput: '<input type="text" readonly />',
      render: {
        option: function (data) {
          return `<div class="payment-option">${createPaymentIcon(data.value)}</div>`;
        },
        item: function (data) {
          return `<div class="payment-selected">${createPaymentIcon(data.value)}</div>`;
        }
      }
    };

    new TomSelect(el, settings);
  });

  function enableInfiniteLoop(selector, duplicates = 3) {
    const sliders = document.querySelectorAll(selector);
    
    sliders.forEach(slider => {
        const wrapper = slider.querySelector('.swiper-wrapper');
        if (!wrapper) return;
        
        const originalContent = wrapper.innerHTML;
        wrapper.innerHTML = originalContent.repeat(duplicates);
    });
  }


  function duplicateSlidesForLoop(selector) {
    const container = document.querySelector(selector);
    if (container) {
      const wrapper = container.querySelector('.swiper-wrapper');
      const slides = wrapper.querySelectorAll('.swiper-slide');
      
      if (slides.length < 5) {
          const originalHTML = wrapper.innerHTML;
          wrapper.innerHTML = originalHTML + originalHTML;
      }
    }
  }

  // Running line
  duplicateSlidesForLoop('.running-line__swiper');
  duplicateSlidesForLoop('.running-line__swiper');

  let runningLine = new Swiper('.running-line__swiper', {
    spaceBetween: 48,
    enabled: true,
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 20,
    speed: 12000,
    freeMode: true,
    allowTouchMove: false,

    watchSlidesProgress: true,
    resizeObserver: true,
    
    observer: true,

    autoplay: {
      delay: 0,
      disableOnInteraction: true,
    },
  });

  // Why us slider
  const whyusSlider = new Swiper('.whyus__swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: false,
    speed: 600,
    grabCursor: true,
    observer: true,
    observeParents: true,
    watchOverflow: true,
  });

  // Home Banner slider
  let homeBannerSlider = new Swiper('.banner-home-swiper', {
    spaceBetween: 10,
    loop: false,
    speed: 1000,
    autoHeight: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    observer: true,
    observeParents: true,
    watchOverflow: true,
    navigation: {
      nextEl: ".home__banner-swiper .swiper-button-next",
      prevEl: ".home__banner-swiper .swiper-button-prev",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.home__banner-swiper .swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    on: {
      init: function () {
        updatePaginationWidth(this);
      },
      resize: function () {
        this.update();
        updatePaginationWidth(this);
      }
    }
  });

  function updatePaginationWidth(swiper) {
    const bullets = swiper.pagination.bullets;
    const bulletCount = bullets.length;
    if (swiper.pagination.el) {
      swiper.pagination.el.classList.remove('pagination-2', 'pagination-many');

      if (bulletCount <= 2) {
        swiper.pagination.el.classList.add('pagination-2');
      } else {
        swiper.pagination.el.classList.add('pagination-many');
      }
    };
  }

  // duplicateSlidesForLoop('.tariffs__swiper--home');


  const homeTariffsSlider = new Swiper('.tariffs__swiper--home', {
    spaceBetween: 24,
    loop: true,
    speed: 1000,
    autoHeight: true,
    observer: true,
    observeParents: true,
    watchOverflow: true,
    enabled: false, // Отключен по умолчанию для экранов >= 1200px
    navigation: {
      nextEl: ".tariffs_home .section-header__btn_next",
      prevEl: ".tariffs_home .section-header__btn_prev",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: 'auto',
    slideClass: 'swiper-slide',
    breakpoints: {
      // Включен для экранов < 1200px
      0: {
        enabled: true,
        slidesPerView: 'auto',
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
      },
      // Отключен для экранов >= 1200px
      1200: {
        enabled: false,
      }
    },
  });

  duplicateSlidesForLoop('.home__news-swiper');

  const newsSlider = new Swiper('.home__news-swiper', {
    spaceBetween: 27,
    loop: true,
    speed: 1000,
    autoHeight: true,
    observer: true,
    observeParents: true,
    watchOverflow: true,
    navigation: {
      nextEl: ".home__news .section-header__btn_next",
      prevEl: ".home__news .section-header__btn_prev",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    resize: function (swiper) {
      swiper.update();
    },
    slidesPerView: "1",
    breakpoints: {
      575.98: {
        slidesPerView: 1,
      },
      768.98: {
        slidesPerView: 2,
      },
      1023.98: {
        slidesPerView: 3,
      },
    }
  });


  const articlesSlider = new Swiper('.home__articles-swiper', {
    spaceBetween: 24,
    loop: true,
    speed: 1000,
    autoHeight: true,
    observer: true,
    observeParents: true,
    watchOverflow: true,
    navigation: {
      nextEl: ".home__articles .section-header__btn_next",
      prevEl: ".home__articles .section-header__btn_prev",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    resize: function (swiper) {
      swiper.update();
    },
    slidesPerView: "auto",
    breakpoints: {
      575.98: {
        slidesPerView: "auto",
      },
      720: {
        slidesPerView: 2,
      },
      1023.98: {
        slidesPerView: 3,
      },
    }
  });

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
    el.style.transition = `opacity ${timeout}ms`;
    el.style.opacity = 0;

    setTimeout(() => {
      el.style.display = 'none';
    }, 10);
  }

  function stretchText() {
    document.querySelectorAll('[data-stretch-text]').forEach(span => {
      const text = span.textContent.trim();
      if (text.length > 1) {
        span.style.letterSpacing = '0px';
        const parentStyle = window.getComputedStyle(span.parentElement);
        const parentPadding = parseFloat(parentStyle.paddingLeft) + parseFloat(parentStyle.paddingRight);
        const paddingBorder = parseFloat(parentStyle.borderLeftWidth) + parseFloat(parentStyle.borderRightWidth);

        const availableWidth = span.parentElement.offsetWidth - parentPadding - paddingBorder;
        const textWidth = span.scrollWidth;
        const spacing = (availableWidth - textWidth) / (span.textContent.length - 1);
        if (spacing > 0) span.style.letterSpacing = spacing + 'px';
      }
    });
  }

  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(() => {
      setTimeout(stretchText, 100);
    });

    document.querySelectorAll('[data-stretch-text]').forEach(span => {
      observer.observe(span.parentElement);
    });
  } else {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(stretchText, 250);
    });
  }

  stretchText();

  // Reusable animated button component
  document.querySelectorAll('.btn-next').forEach(button => {
    let springTimeout = null;

    const handleAnimationEnd = (e) => {
      // After animation completes, remove is-animating class
      // Button will stay in initial state (100% keyframe)
      if (e.animationName === 'continuousMoveRight') {
        button.classList.remove('is-animating');
      }
    };

    // Find the clickable element (could be the button itself or its parent)
    const clickableElement = button.closest('a') || button;

    clickableElement.addEventListener('mouseenter', () => {
      // Clear any pending timeouts
      if (springTimeout) clearTimeout(springTimeout);

      // Remove all states
      button.classList.remove('is-paused', 'is-returning', 'is-spring');

      // Start animation (runs once, returns to initial state)
      button.classList.add('is-animating');
      button.addEventListener('animationend', handleAnimationEnd, { once: true });
    });

    clickableElement.addEventListener('mouseleave', () => {
      // Clear any pending timeouts
      if (springTimeout) clearTimeout(springTimeout);

      // Start smooth return animation instead of abrupt stop
      button.classList.remove('is-animating', 'is-paused');
      button.classList.add('is-returning');

      // Remove returning class after animation completes
      button.addEventListener('animationend', (e) => {
        if (e.animationName === 'returnToStart' || e.animationName === 'returnIconToStart') {
          button.classList.remove('is-returning');
        }
      }, { once: true });
    });
  });

  // FAQ accordion
  (function initFaqAccordion() {
    const root = document.querySelector('[data-faq]');
    if (!root) return;

    const items = Array.from(root.querySelectorAll('.faq-item'));

    const closeItem = (item) => {
      item.classList.remove('is-open');
      const btn = item.querySelector('[data-faq-btn]');
      const body = item.querySelector('[data-faq-body]');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      if (body) body.style.maxHeight = '0px';
    };

    const openItem = (item) => {
      item.classList.add('is-open');
      const btn = item.querySelector('[data-faq-btn]');
      const body = item.querySelector('[data-faq-body]');
      if (btn) btn.setAttribute('aria-expanded', 'true');
      if (body) body.style.maxHeight = body.scrollHeight + 'px';
    };

    items.forEach((item) => {
      const btn = item.querySelector('[data-faq-btn]');
      const body = item.querySelector('[data-faq-body]');
      if (!btn || !body) return;

      // фикс для корректной анимации (чтобы max-height считался)
      body.style.maxHeight = '0px';

      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // закрыть все
        items.forEach(closeItem);

        // открыть текущий, если был закрыт
        if (!isOpen) openItem(item);
      });
    });

    // Пересчет высоты при ресайзе (если открыт)
    window.addEventListener('resize', () => {
      const opened = root.querySelector('.faq-item.is-open [data-faq-body]');
      if (opened) opened.style.maxHeight = opened.scrollHeight + 'px';
    });
  })();
  // Toggle image block (faq-block-mobile)
  (function initFaqBlockMobileToggle() {
    const el = document.querySelector('.js-faq-toggle');
    if (!el) return;

    const img1 = el.dataset.img;
    const img2 = el.dataset.imgActive;

    if (!img1 || !img2) return;

    // стартовая картинка
    el.style.backgroundImage = `url("${img1}")`;

    el.addEventListener('click', () => {
      const isActive = el.classList.toggle('is-active');
      el.style.backgroundImage = `url("${isActive ? img2 : img1}")`;
    });
  })();

});
