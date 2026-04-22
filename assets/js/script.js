$(document).ready(function () {

  var counter = 0;
  var selects = [];

  $('select.numbers-select').each(function () {
    $(this).addClass('select' + counter);
    var options = { placeholder: 'Номер' };
    selects[counter] = NiceSelect.bind(document.querySelector('select.numbers-select.select' + counter), options);
    //console.log($(this));  
    counter++;
  });

  const $videosToWrap = $(
    '.typography > iframe[src*="vk.com"], .typography *:not(.video-responsive-wrapper) > iframe[src*="vk.com"]'
  );
  $videosToWrap.wrap('<div class="video-responsive-wrapper"></div>');

  let firstItem = $('.ratessect__funcs-items:first-child').find('.ratessect__funcs-item').first();
  firstItem.addClass('active');

  let price = firstItem.data('price');
  let type = firstItem.data('type');
  let gb = firstItem.data('gb');
  $('.ratessect__funcs-price i').text(price);
  $('#ratessect-type').text(type);
  $('#ratessect-gb').text(gb);

  $('.modalform input[name=price]').val(price);

  $('.ratessect__funcs-tab').click(function () {
    $('.ratessect__funcs-tab').removeClass('active');
    $('.ratessect__funcs-items').removeClass('active');

    $('.ratessect__funcs-item').removeClass('active');

    $(this).addClass('active');
    let index = $('.ratessect__funcs-tab').index(this);
    $('.ratessect__funcs-items:nth-child(' + (index + 1) + ')').addClass('active');

    let firstItem = $('.ratessect__funcs-items:nth-child(' + (index + 1) + ')')
      .find('.ratessect__funcs-item')
      .first();
    firstItem.addClass('active');

    let price = firstItem.data('price');
    let type = firstItem.data('type');
    let gb = firstItem.data('gb');
    $('.ratessect__funcs-price i').text(price);
    $('#ratessect-type').text(type);
    $('#ratessect-gb').text(gb);

    $('.modalform input[name=price]').val(price);
    $('.modalform input[name=type]').val($('.ratessect__funcs-item.active').data('current-type'));
    $('.modalform input[name=mins]').val($('.ratessect__funcs-item.active').data('mins'));
    let operator = firstItem.data('current-type');

    if (operator == 'билайн') {
      $('.rate-numbers').css('display', 'flex');
      $('select.numbers-select').val('Номер');

      for (var i = 0; i < selects.length; i++) {
        selects[i].update();
        //$('.numbers-select.select'+i+' .current').text("Выберите номер"); 
      }
    }
    else {
      $('.rate-numbers').css('display', 'none');
      $('select.numbers-select').val('Номер');

      for (var i = 0; i < selects.length; i++) {
        selects[i].update();
        //$('.numbers-select.select'+i+' .current').text("Выберите номер"); 
      }
    }

  });

  $('.ratessect__funcs-item').click(function () {
    $('.ratessect__funcs-item').removeClass('active');
    $(this).addClass('active');
    let price = $(this).data('price');
    let type = $(this).data('type');
    let gb = $(this).data('gb');
    $('.ratessect__funcs-price i').text(price);
    $('#ratessect-type').text(type);
    $('#ratessect-gb').text(gb);

    $('.modalform input[name=price]').val(price);
    $('.modalform input[name=type]').val($('.ratessect__funcs-item.active').data('current-type'));
    $('.modalform input[name=mins]').val($('.ratessect__funcs-item.active').data('mins'));
  });

  // form checkbox
  $('.modalform label input').on('change', function () {
    if ($(this).is(':checked')) {
      $('.modalform .btn').removeClass('innactive');
    } else {
      $('.modalform .btn').addClass('innactive');
    }
  });

  $('.modalform br').remove();

  // form hidden fields
  let titleVal = $('.ratessect__offer').text();
  let isReserved = 'Нет';
  if ($('.ratessect__item label input').is(':checked')) {
    isReserved = 'Да';
  }
  $('.ratessect__item label input').change(function () {
    if ($(this).is(':checked')) {
      isReserved = 'Да';
    } else {
      isReserved = 'Нет';
    }
    $('.modalform input[name=is_reserved]').val(isReserved);
  });

  $('.modalform input[name=is_reserved]').val(isReserved);
  $('.modalform input[name=title-val]').val(titleVal);

  $('.modalform input[name=type]').val($('.ratessect__funcs-item.active').data('current-type'));
  $('.modalform input[name=mins]').val($('.ratessect__funcs-item.active').data('mins'));
  $('.modalform input[name=city]').val($('.city').data('city'));

  // табы в архиве
  $('.tariffplans__tab').click(function (e) {
    $(this).parent().find('.tariffplans__tab').removeClass('active');
    $(this).parent().next().find('.tariffplans__item').removeClass('active');
    $(this).addClass('active');
    let index = $(this).index();
    $(this)
      .parent()
      .next()
      .find('.tariffplans__item:nth-child(' + (index + 1) + ')')
      .addClass('active');
  });

  // скрыть предложение
  $('.tariffplans__hide').click(function () {
    $('.tariffplans__right').fadeOut();
  });

  // поиск архива тарифов
  $('#searchTariffs').on('keyup', function () {
    let search = $(this).val().toLowerCase();

    if ($(this).val() != '') {
      $('.tariffplans__search').removeClass('invisible');
      $('.tariffplans__content').addClass('invisible');
    } else {
      $('.tariffplans__search').addClass('invisible');
      $('.tariffplans__content').removeClass('invisible');
    }

    $('.tariffplans__search .tariffplans__file').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(search) > -1);
    });
  });

  $('.dropdown-tarif__head, .dropdown-tarif__arrow').on('click', function () {
    const index = $(this).closest('.dropdown-tarif').index();

    $('.col-tarifs-main, .col-tarifs-small').each(function () {
      const $columns = $(this).find('.dropdown-tarif');

      $columns.each(function (i) {
        const $block = $(this);
        const $content = $block.find('.dropdown-tarif__content');
        const $arrow = $block.find('.dropdown-tarif__arrow');

        if (i === index) {
          // текущий по индексу — переключаем
          $content.stop(true, true).slideToggle(200);
          $arrow.stop(true, true).fadeToggle(0);
          $block.toggleClass('open');
        } else {
          // остальные — сворачиваем
          $content.stop(true, true).slideUp(200);
          $arrow.stop(true, true).fadeIn(0);
          $block.removeClass('open');
        }
      });
    });
  });

  // contact form thank you
  $(document).on('wpcf7mailsent', function (e) {
    Fancybox.close();
    Fancybox.show([{ src: '#modal-tariff-submit' }], {
      mainClass: 'standart_modal',
      Toolbar: false,
      closeButton: false,
      Image: { zoom: false, click: 'close', wheel: 'close' }
    });
  });

  $('.modal-submit .is-close').click(function () {
    Fancybox.close();
  });

  // tariffs show all
  $('.tariff-page-btn .btn').click(function () {
    $(this).css('display', 'none');
    $('.section-tariff-page').addClass('active');
  });

  //вакансии
  $('.history-item').click(function () {
    //var title=$(this).find('.title');
    var text = $(this).find('.fulltext').text();
    //$('#modal-history').find('.modal-title').html(title);
    $('#modal-history').find('.modal-text').text(text);
  });

  $('.vacancy-filter .city-curr').click(function () {
    $('.vacancy-filter .cities ul').slideToggle('fast');
  });

  $('.vacancy-filter li').click(function () {
    var city = $(this).data('city');
    var cat = $('.tariff-tabs__item.active').data('cat');

    $('.vacancy-filter .city-curr').data('city', city);
    $('.vacancy-filter .city-curr').html($(this).html());

    $('.section-vacancy .tariff-item').removeClass('show');
    if (cat == 'all') {
      $('.section-vacancy .tariff-item.' + city).addClass('show');
    } else {
      $('.section-vacancy .tariff-item.' + city + '.' + cat).addClass('show');
    }
    $('.vacancy-filter .cities ul').slideToggle('fast');
  });

  $('.vacancy-filter .tariff-tabs__item').click(function () {
    var cat = $(this).data('cat');
    var city = $('.vacancy-filter .city-curr').data('city');

    $('.section-vacancy .tariff-tabs__item').removeClass('active');
    $(this).addClass('active');
    $('.section-vacancy .tariff-item').removeClass('show');
    if (cat == 'all') {
      $('.section-vacancy .tariff-item.' + city).addClass('show');
    } else {
      $('.section-vacancy .tariff-item.' + city + '.' + cat).addClass('show');
    }
    return false;
  });

  $('.vacancy-btn').click(function () {
    var name = $(this).data('name');
    var city = $(this).data('city');
    $('#form-job .name-job').val(name);
    $('#form-job .city-job').val(city);
  });

  //меню услуг
  $('.page-nav-service-link').click(function () {
    $(this).toggleClass('active');
    $('.page-nav-service-menu').toggleClass('active');
    return false;
  });

  //мобильное доп. пеню
  $('.page-nav-service').click(function () {
    $('.page-nav-menu').slideToggle('fast');
  });
  //поиск
  // the input field
  var $searchbtn = $('.search-panel__btn'),
    // the input field
    $input = $('.search-field'),
    // clear button
    $clearBtn = $("button[data-search='clear']"),
    // prev button
    $prevBtn = $("button[data-search='prev']"),
    // next button
    $nextBtn = $("button[data-search='next']"),
    // the context where to search
    $content = $('.help-items'),
    // jQuery object to save <mark> elements
    $results,
    // the class that will be appended to the current
    // focused element
    currentClass = 'current',
    // top offset for the jump (the search bar)
    offsetTop = $('.search-panel').innerHeight() + 50,
    // the current index of the focused element
    currentIndex = 0;

  /**
   * Jumps to the element matching the currentIndex
   */
  function jumpTo() {
    if ($results.length) {
      var position,
        $current = $results.eq(currentIndex);
      $results.removeClass(currentClass);
      if ($current.length) {
        $current.addClass(currentClass);
        position = $current.offset().top - offsetTop;
        if (!$('mark.current').closest('.help-item').hasClass('is-active')) {
          var id = $('mark.current').closest('.help-section').prop('id');
          $('.' + id).trigger('click');
          $('mark.current').closest('.help-item').children('.help-item__title').trigger('click');
        }

        $([document.documentElement, document.body]).animate(
          {
            scrollTop: position
          },
          700
        );
      }
    }
  }

  $input.on('change', function (e) {
    $content.unmark();
    currentIndex = 0;
    $(this).text('Поиск');
  });
  /**
   * Searches for the entered keyword in the
   * specified context on input
   */
  $searchbtn.on('click', function (e) {
    e.preventDefault();
    var searchVal = $input.val();
    if (searchVal.length > 0) {
      $(this).text('Еще');
    }

    $content.unmark({
      done: function () {
        $content.mark(searchVal, {
          separateWordSearch: true,
          done: function () {
            $results = $content.find('mark');
            jumpTo();
            currentIndex += 1;
            if (currentIndex < 0) {
              currentIndex = $results.length - 1;
            }
            if (currentIndex > $results.length - 1) {
              currentIndex = 0;
            }
          }
        });
      }
    });
  });

  /**
   * Clears the search
   */
  $clearBtn.on('click', function () {
    $content.unmark();
    $input.val('').focus();
  });

  /**
   * Next and previous search jump to
   */
  $nextBtn.add($prevBtn).on('click', function () {
    if ($results.length) {
      currentIndex += $(this).is($prevBtn) ? -1 : 1;
      if (currentIndex < 0) {
        currentIndex = $results.length - 1;
      }
      if (currentIndex > $results.length - 1) {
        currentIndex = 0;
      }
      jumpTo();
    }
  });

  $('#modal-tariff-mynumber .modal-form__btn').click(function () {

    var mynumber = $('#modal-tariff-mynumber input[type=tel]').val();
    $('input[name=tariff-mynumber]').val(mynumber);
    $('input[name=tariff-beautifulnumber]').val("Не требуется");
    $('input[name=tariff-beautifulnumbercb]').val("Не требуется");

  });

  //передача данных из третьего шага в четвертый.
  $('#modal-tariff-step-3 .modal-form__btn').click(function () {
    var num = $('#modal-tariff-step-3 .nice-select.numbers-select .current').text();

    if ($('.rate-numbers-disable input').is(':checked')) {
      $('input[name=tariff-beautifulnumber]').val("Не требуется");
      $('input[name=tariff-beautifulnumbercb]').val("Не требуется");
    }
    else {
      if (num == "" || num == "Номер") {
        $('input[name=tariff-beautifulnumber]').val("Не требуется");
        $('input[name=tariff-beautifulnumbercb]').val("Не требуется");
      }
      else {
        $('input[name=tariff-beautifulnumber]').val(num);
        $('input[name=tariff-beautifulnumbercb]').val("Требуется");
      }

    }

  });

  //Передача названия услуги в форму
  $('.service-btn').click(function () {
    var service = $(this).data('name');

    $('#modal-services .modal-title div').text(service);
    $('#modal-services input[name=service-name]').val(service);
  });

  //клик на мобиле на блок с тултипом

  /*$('.advantages-body .advantages-item:last-child').click(function(event){
    console.log(event.target);
    if($(window).width()<=760){

      if(event.target!=$(this).children('.advantages-question').children('.tooltip__toggle')){
        $(this).children('.advantages-question').children('.tooltip__toggle').trigger('click');
      }

      //return false;
    }
  });*/



  /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!	*/

  /*var counter=0;		
    var selects = [];
  	
     $('select.numbers-select').each(function() {
       $(this).addClass('select'+counter);
       var options = {placeholder: 'Номер'};
       selects[counter]=NiceSelect.bind(document.querySelector('select.numbers-select.select'+counter),options);
       //console.log($(this));  
       counter++;
     });*/


  if ($('.header__location span').length && $('.numbers label[data-city]').length) {

    //var sel=NiceSelect.bind(document.querySelector('select.numbers-select'));
    var city = $('.header__location span').text();
    

    //init city and price filter
    $('.numbers label[data-city][data-city!="' + city + '"]').addClass('hidden-city');

    $('select.numbers-select option[data-city!=' + city + ']').addClass('hidden-city');
    $('select.numbers-select option[data-price!="500"]').addClass('hidden-type');
    $('select.numbers-select option[data-city!=' + city + ']').prop('disabled', 'disabled');
    $('select.numbers-select option[data-price!="500"]').prop('disabled', 'disabled');
    $('select.numbers-select').val('Номер');

    $('input[name="number_price"]').val("500");

    for (var i = 0; i < selects.length; i++) {
      selects[i].update();
      //$('.numbers-select.select'+i+' .current').text("Выберите номер"); 
    }
  }


  //click tab block 1
  $('.numbers-tabs__item').click(function () {
    var price = $(this).data('price-value');
    const city = $('.header__location [data-loc]').text();

    $('.rate-numbers-tabs__item').removeClass('active');
    $('.rate-numbers-tabs__item[data-price-value="' + price + '"]').addClass('active');
    $('select.numbers-select').val('Номер');

    $('select.numbers-select option').prop('disabled', '');
    $('select.numbers-select option[data-city!=' + city + ']').prop('disabled', 'disabled');
    $('select.numbers-select option[data-price!="' + price + '"]').prop('disabled', 'disabled');
    if ($('input[name="direct-number"]').is(':checked')) {
      $('select.numbers-select option:not(.code495):not(.code499):not(.code812)').prop('disabled', 'disabled');
    }
    for (var i = 0; i < selects.length; i++) {
      selects[i].update();
    }
  });

  //click tab block 2 and popup
  $('.rate-numbers-tabs__item').click(function (e) {
    e.preventDefault();
    const city = $('.header__location [data-loc]').text();
    
    var price = $(this).data('price-value');
    //var phone=$(this).val(); 			

    $('input[name="beautiful_num"]').val("");
    $('input[name="beautiful_num_price"]').val("");

    $('.rate-numbers-tabs__item').removeClass('active');
    $('.rate-numbers-tabs__item[data-price-value="' + price + '"]').addClass('active');
    $('select.numbers-select').val('Номер');


    $('select.numbers-select option').prop('disabled', '');
    $('select.numbers-select option[data-city!=' + city + ']').prop('disabled', 'disabled');
    $('select.numbers-select option[data-price!="' + price + '"]').prop('disabled', 'disabled');
    if ($('input[name="direct-number"]').is(':checked')) {
      $('select.numbers-select option:not(.code495):not(.code499):not(.code812)').prop('disabled', 'disabled');
    }
    $('input[name="number_price"]').val(price);
    $('input[name="beautiful_num"]').val("");
    for (var i = 0; i < selects.length; i++) {
      selects[i].update();
    }
    return false;
  });

  //click phone block 1
  $('.numbers-list-item__num').click(function () {
    var phone = $(this).data('phone-value');

    $('select.numbers-select').val(phone);

    for (var i = 0; i < selects.length; i++) {
      selects[i].update();
    }

    $('input[name=text-number-temp]').val(phone);
  });

  //change number block 2 and popup
  $('select.block2').change(function () {
    var phone = $(this).val();
    var price = $('.rate-numbers-tabs__item.active').data('price-value');
    $('input[name="beautiful_num"]').val(phone);
    $('input[name="beautiful_num_price"]').val(price);

    $('select.numbers-select').val(phone);
    for (var i = 0; i < selects.length; i++) {
      selects[i].update();
    }
  });

  //change number block 2 tariff page
  /*$('.ratessect__bottom select.block2').change(function(){
    var phone=$(this).val(); 			
    var phone_price=$('.rate-numbers-tabs__item.active').data('price-value'); 			
  	
    $('input[name="beautiful_num"]').val(phone);
  	
    $('input[name="beautiful_num_price"]').val(phone_price);
  });*/


  //click city
  $('.header__location-list li').click(function () {
    city = $(this).text();
    var price = $('.numbers-tabs__item.active').data('price-value');
    $('.numbers label[data-city]').removeClass('hidden-city');
    $('.numbers label[data-city][data-city!="' + city + '"]').addClass('hidden-city');

    $('select.numbers-select').val('Номер');
    $('select.numbers-select option').removeClass('hidden-city');
    $('select.numbers-select option[data-city!="' + city + '"]').addClass('hidden-city');

    $('select.numbers-select option').prop('disabled', '');
    $('select.numbers-select option[data-city!=' + city + ']').prop('disabled', 'disabled');
    $('select.numbers-select option[data-price!="' + price + '"]').prop('disabled', 'disabled');
    if ($('input[name="direct-number"]').is(':checked')) {
      $('select.numbers-select option:not(.code495):not(.code499):not(.code812)').prop('disabled', 'disabled');
    }
    for (var i = 0; i < selects.length; i++) {
      selects[i].update();
    }
    $('input[name="beautiful_num"]').val("");
    $('input[name="beautiful_num_price"]').val("");
  });

  //on load not direct numbers hide
  $('.numbers-main .numbers-list-item.code495, .numbers-main .numbers-list-item.code499, .numbers-main .numbers-list-item.code812').addClass("hidden-type");
  $('select.numbers-select option.code495, select.numbers-select option.code499, select.numbers-select option.code812').addClass("hidden-type");
  $('select.numbers-select option.code495, select.numbers-select option.code499, select.numbers-select option.code812').prop('disabled', 'disabled');


  for (var i = 0; i < selects.length; i++) {
    selects[i].update();
  }

  //click direct number
  $('input[name="direct-number"]').change(function () {

    var city = $('.header__location-list li.active').text();
    var price = $('.numbers-tabs__item.active').data('price-value');




    if ($(this).is(':checked')) {
      $('.numbers-main .numbers-list-item:not(.code495):not(.code499):not(.code812)').addClass("hidden-type");
      $('select.numbers-select option:not(.code495):not(.code499):not(.code812)').addClass("hidden-type");
      $('select.numbers-select option:not(.code495):not(.code499):not(.code812)').prop('disabled', 'disabled');

      $('.numbers-main .numbers-list-item.code495, .numbers-main .numbers-list-item.code499, .numbers-main .numbers-list-item.code812').removeClass("hidden-type");
      $('select.numbers-select option.code495, select.numbers-select option.code499, select.numbers-select option.code812').removeClass("hidden-type");
      $('select.numbers-select option.code495, select.numbers-select option.code499, select.numbers-select option.code812').prop('disabled', '');
      for (var i = 0; i < selects.length; i++) {
        selects[i].update();
      }
      return;
    }
    else {
      $('.numbers-main .numbers-list-item:not(.code495):not(.code499):not(.code812)').removeClass("hidden-type");
      $('select.numbers-select option:not(.code495):not(.code499):not(.code812)').removeClass("hidden-type");
      $('select.numbers-select option:not(.code495):not(.code499):not(.code812)').prop('disabled', '');

      $('.numbers-main .numbers-list-item.code495, .numbers-main .numbers-list-item.code499, .numbers-main .numbers-list-item.code812').addClass("hidden-type");
      $('select.numbers-select option.code495, select.numbers-select option.code499, select.numbers-select option.code812').addClass("hidden-type");
      $('select.numbers-select option.code495, select.numbers-select option.code499, select.numbers-select option.code812').prop('disabled', 'disabled');


      for (var i = 0; i < selects.length; i++) {
        selects[i].update();
      }
      return;
    }

  });

  /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/



  // Находим все select'ы с data-phone-select="true"
  /*var $allSelects = $('select[data-phone-select="true"]');
  if ($allSelects.length === 0) return;

  var city = $('.header__location span').text();

  if (!$allSelects.parent().hasClass('select-container')) {
    $allSelects.wrap('<div class="select-container" style="min-height: 50px;"></div>');
  }

  // Общие функции
  function completelyRecreateNiceSelect($select) {
    // Проверяем, что это именно наш целевой селект
    if (!$select.is('[data-phone-select="true"]')) return;
    if (typeof NiceSelect === 'undefined') return;

    $select.next('.nice-select').remove();
    
    if ($select[0].niceSelect) {
      try { $select[0].niceSelect.destroy(); } catch (e) {}
      $select[0].niceSelect = null;
    }

    setTimeout(function () {
      if (typeof NiceSelect !== 'undefined') {
        NiceSelect.bind($select[0], { placeholder: 'Номер', searchable: false });
      }
    }, 100);
  }

  function applyFiltersToSelect($select) {
    // Проверяем, что это именно наш целевой селект
    if (!$select.is('[data-phone-select="true"]')) return;
    
    var $modal = $select.closest('.modal');
    var price = $modal.find('.rate-numbers-tabs__item.active').data('price-value') || 0;
    var isDirect = $modal.find('input[name="direct-number"]').is(':checked');

    $select.find('option').each(function () {
      var $option = $(this);
      if ($option.val() === '') return;

      var optionCity = $option.data('city');
      var optionPrice = $option.data('price');
      var optionCode = $option.data('code');
      var isDirectCode = optionCode === '495' || optionCode === '499' || optionCode === '812';

      var shouldShow = optionCity === city && optionPrice == price && (isDirect ? isDirectCode : !isDirectCode);
      $option.prop('disabled', !shouldShow);
    });

    completelyRecreateNiceSelect($select);
  }

  function setSelectValue($select, phone) {
    // Проверяем, что это именно наш целевой селект
    if (!$select.is('[data-phone-select="true"]')) return;
    
    $select.val(phone);
    completelyRecreateNiceSelect($select);
    $select.closest('.modal').find('input[name=text-number-temp]').val(phone);
  }

  function applyFiltersToAll() {
    $allSelects.each(function() {
      applyFiltersToSelect($(this));
    });
  }

  // Инициализация каждого select'а
  $allSelects.each(function() {
    var $select = $(this);
    var $modal = $select.closest('.modal');

    // Инициализация NiceSelect
    setTimeout(function () {
      if (typeof NiceSelect !== 'undefined') {
        NiceSelect.bind($select[0], { placeholder: 'Номер', searchable: false });
      }
      applyFiltersToSelect($select);
    }, 300);

    // Обработчики внутри модалки
    $modal.on('click', '.rate-numbers-tabs__item', function (e) {
      e.preventDefault();
      $modal.find('.rate-numbers-tabs__item').removeClass('active');
      $(this).addClass('active');
      $select.val('');
      applyFiltersToSelect($select);
    });

    $modal.on('change', 'input[name="direct-number"]', function () {
      applyFiltersToSelect($select);
    });
  });

  // Обработчик для кнопок "Подключить"
  $(document).on('click', '.numbers-btn', function(e) {
    var modalTarget = $(this).attr('href');
    if (!modalTarget?.startsWith('#')) return;
    
    setTimeout(function() {
      var $modal = $(modalTarget);
      var $select = $modal.find('select[data-phone-select="true"]');
      if (!$select.length) return;

      // Если есть данные из основной формы - используем их
      var $changedPrice = $('[data-changed-price]');
      if ($changedPrice.length) {
        var selectedPriceText = $changedPrice.text().trim();
        if (selectedPriceText) {
          var priceValue = selectedPriceText === 'Бесплатно' ? 0 : parseInt(selectedPriceText.replace(/\D/g, '')) || 0;
          
          $modal.find('.rate-numbers-tabs__item').removeClass('active');
          $modal.find('.rate-numbers-tabs__item').each(function() {
            if ($(this).data('price-value') == priceValue) $(this).addClass('active');
          });
        }
      }

      applyFiltersToSelect($select);
    }, 400);
  });

  // Общие обработчики
  $(document).on('click', '.numbers-list-item__num', function (e) {
    e.preventDefault();
    var phone = $(this).data('phone-value');
    
    $allSelects.each(function() {
      setSelectValue($(this), phone);
    });
  });

  $(document).on('change', 'select.block2', function () {
    var phone = $(this).val();
    
    $allSelects.each(function() {
      setSelectValue($(this), phone);
    });
  });

  $(document).on('click', '.header__location-list li', function (e) {
    e.preventDefault();
    city = $(this).text().trim();
    $('.header__location span').text(city);
    applyFiltersToAll();
  });*/
});
document.addEventListener('DOMContentLoaded', () => {

  Fancybox.bind('[data-fancybox]');

  const modalBtn = document.querySelectorAll('[data-modal-close]');

  modalBtn.forEach(btn => {
    btn.addEventListener('click', e => {
      Fancybox.close();
    });
  });

  const modalNotFound = document.querySelector('#modal-not-found');

  if (modalNotFound) {
    const modalNotFoundTimeOut = modalNotFound.getAttribute('data-timeout');

    setTimeout(() => {
      Fancybox.show([{ src: '#modal-not-found' }]);
    }, modalNotFoundTimeOut);
  }


  const tariffBtn = document.querySelectorAll('[data-tariff-btn');

  if (tariffBtn) {
    const tariffModalTitle = document.querySelectorAll('[data-modal-tariff-title]');
    const tariffModalDesc = document.querySelectorAll('[data-modal-tariff-desc]');
    const tariffModalTitleField = document.querySelector('input[name="tariff-name"]');

    tariffBtn.forEach(el => {
      el.addEventListener('click', e => {
        const isBeeline = $(el).attr('data-isbeeline');

        if (isBeeline == 'no') {
          $('#modal-tariff-step-2 .modal-form-btns button:last-child').attr(
            'data-src',
            '#modal-tariff-step-4'
          );
        }
        const tariffParent = el.closest('[data-tariff-parent]');
        const tariffTitle = tariffParent.querySelector('[data-tariff-name]').textContent;
        const tariffDesc = tariffParent.querySelector('[data-tariff-desc]');

        tariffModalTitle.forEach(title => {
          title.textContent = tariffTitle;
        });
        if (tariffDesc) {
          tariffModalDesc.forEach(text => {
            text.innerHTML = tariffDesc.innerHTML;
          });
        }

        tariffModalTitleField.value = tariffTitle;
      });
    });
  }

  const modalBtnNext = document.querySelectorAll('[data-modal-next]');

  if (modalBtnNext) {
    const tariffModalSimDesc = document.querySelectorAll('[data-change-sim-desc]');

    modalBtnNext.forEach(el => {
      el.addEventListener('click', e => {
        const tariffParent = el.closest('[data-tariff-parent]');
        const changeSim = tariffParent.querySelector('input[name="sim"]:checked');
        const tariffModalSimField = document.querySelector('input[name="tariff-sim"]');
        const tariffModalMyNumberField = document.querySelector('input[name="tariff-mynumber"]');
        const tariffModalMyNumber = tariffParent.querySelector('[data-modal-tariff-mynumber]');

        if (changeSim) {
          tariffModalSimField.value = changeSim.value;
          tariffModalSimDesc.forEach(el => {
            el.innerHTML = changeSim.value;
          });
        } else if (tariffModalMyNumber) {
          tariffModalMyNumberField.innerHTML = tariffModalMyNumber.value;
          $('.modal-text').text('Перейти в экомобайл со своим номером');
        }
      });
    });
  }

  let imPhone = new Inputmask({
    mask: '+7 (999) 999-99-99',
    showMaskOnHover: false
  });
  imPhone.mask(document.querySelectorAll('input[type="tel"]'));

  // Cookies

  /*const cookiesBanner = document.querySelector('[data-cookies]');
  const cookiesAccept = document.querySelector('[data-cookies-accept]');
  const cookiesClose = document.querySelector('[data-cookies-close]');

  if (localStorage.getItem('cookieSeen') != 'shown') {
    setTimeout(() => {
      cookiesBanner.classList.add('show');
    }, 2000);
  }

  cookiesAccept.addEventListener('click', (e) => {
    e.preventDefault();
    cookiesBanner.classList.remove('show');
    localStorage.setItem('cookieSeen', 'shown');
  });

  cookiesClose.addEventListener('click', (e) => {
    e.preventDefault();
    cookiesBanner.classList.remove('show');
  });*/


  const overlay = document.querySelector('.overlay');

  const overlayHandle = () => {
    if (overlay.classList.contains('show')) {
      overlay.classList.remove('show');
    } else {
      overlay.classList.add('show');
    }
  };


  const headerBurger = document.querySelector('[data-mobile-trigger]');
  const mobileNav = document.querySelector('.mobile-nav');

  if (mobileNav) {
    const mobileNavClose = mobileNav.querySelector('.mobile-nav__close');

    headerBurger.addEventListener(
      'click',
      e => {
        e.currentTarget.classList.toggle('active');
        mobileNav.classList.toggle('open');
        overlayHandle();
      },
      false
    );

    mobileNavClose.addEventListener('click', e => {
      mobileNav.classList.remove('open');
      headerBurger.classList.remove('active');
      overlayHandle();
    });
    overlay.addEventListener('click', e => {
      mobileNav.classList.remove('open');
      headerBurger.classList.remove('active');
      overlayHandle();

    });

  }

  const serviceBtn = document.querySelector('[data-service-trigger]');
  const mediaQuery = window.matchMedia('(max-width: 1279px)');

  if (serviceBtn && mediaQuery.matches) {
    const serviceNav = document.querySelector('[data-service-menu]');

    serviceBtn.addEventListener('click', e => {
      e.target.classList.toggle('active');
      serviceNav.classList.toggle('show');
    });
    document.addEventListener('click', e => {
      let target = e.target;
      if (!target.closest('[data-service-trigger]') && !target.closest('[data-service-menu]')) {
        serviceBtn.classList.remove('active');
        serviceNav.classList.remove('show');
      }
    });
  }

  // Accordion

  const helpAcc = document.querySelectorAll('.help-items');

  if (helpAcc) {
    helpAcc.forEach(el => {
      new Accordion(el, {
        duration: 300,
        showMultiple: true
      });
    });
  }

  const rateAcc = document.querySelector('.rate-single-help');

  if (rateAcc) {
    new Accordion(rateAcc, {
      duration: 300,
      showMultiple: true
    });
  }

  // Sumple bar

  const scrollbar = document.querySelectorAll('[data-scrollbar]');

  scrollbar.forEach(el => {
    new SimpleBar(el, {
      autoHide: false
    });
  });

  // Tabs

  class Tabs {
    constructor(selector) {
      const tabs = document.querySelector(`[data-tabs="${selector}"]`);

      if (tabs) {
        const tabsNav = tabs.querySelector('[data-tabs-nav]');
        if (tabsNav) {
          const tabsNavItem = tabsNav.querySelectorAll('a');

          tabsNavItem.forEach(el => {
            el.addEventListener('click', e => {
              e.preventDefault();

              const isInModal = e.currentTarget.closest('#modal-numbers-new');
              const isMainPage = !isInModal;

              const container = isInModal ? document.getElementById('modal-numbers-new') : document;

              const tabsNavItemData = e.currentTarget.getAttribute('data-target');
              const tabsContentAll = container.querySelectorAll('[data-content]');
              const tabsContentItem = container.querySelector(`[data-content="${tabsNavItemData}"]`);

              const allTabsInContainer = container.querySelectorAll('[data-tabs-nav] a');
              allTabsInContainer.forEach(elem => {
                elem.classList.remove('active');
              });

              tabsContentAll.forEach(elem => {
                elem.classList.remove('open');
                elem.style.display = 'none';
              });

              if (tabsContentItem) {
                tabsContentItem.classList.add('open');
                fadeIn(tabsContentItem, 600, 'block');
              }
              e.currentTarget.classList.add('active');
            });
          });
        }
      }
    }
  }

  const tabsNumbers = new Tabs('numbers');
  const tabsRate = new Tabs('rate');
  const tabsRateNumbers = new Tabs('rate-numbers');
  const tabsRateNumbersModal = new Tabs('rate-numbers-modal');
  const tabsTariff = new Tabs('tariff');

  const tabsTariffRate = document.querySelector('[data-tabs="rate"]');

  if (tabsTariffRate) {
    const tabsNav = tabsTariffRate.querySelector('[data-tabs-nav]');
    const tabsNavItem = tabsNav.querySelectorAll('a');

    const tariffPrice = document.querySelectorAll('[data-tariff-price]');
    const tariffMinute = document.querySelectorAll('[data-tariff-minute]');
    const tariffGB = document.querySelectorAll('[data-tariff-gb]');

    tabsNavItem.forEach(el => {
      if (el.classList.contains('active')) {
        let dataTabPrice = el.getAttribute('data-tab-price');
        let dataTabMinute = el.getAttribute('data-tab-minute');
        let dataTabGB = el.getAttribute('data-tab-gb');

        tariffPrice.forEach(elem => {
          elem.textContent = dataTabPrice;
        });
        tariffMinute.forEach(elem => {
          elem.textContent = dataTabMinute;
        });
        tariffGB.forEach(elem => {
          elem.textContent = dataTabGB;
        });
      }
      el.addEventListener('click', e => {
        e.preventDefault();

        if (e.currentTarget.classList.contains('active')) {
          let dataTabPrice = el.getAttribute('data-tab-price');
          let dataTabMinute = el.getAttribute('data-tab-minute');
          let dataTabGB = el.getAttribute('data-tab-gb');

          tariffPrice.forEach(elem => {
            elem.textContent = dataTabPrice;
          });
          tariffMinute.forEach(elem => {
            elem.textContent = dataTabMinute;
          });
          tariffGB.forEach(elem => {
            elem.textContent = dataTabGB;
          });
        }
      });
    });
  }

  const phoneNumbers = document.querySelectorAll('[data-phone]');

  if (phoneNumbers) {
    const phoneNumberField = document.querySelector('#number-choosen');
    const phoneNumberChanged = document.querySelector('[data-changed-phone]');
    const phoneNumberInput = document.querySelectorAll('input[name="number"]');

    const priceNumbers = document.querySelectorAll('[data-price]');
    const priceNumberField = document.querySelector('#number-price');
    const priceNumberChanged = document.querySelector('[data-changed-price]');

    phoneNumberInput.forEach(input => {
      if (input.checked) {
        let value = input.value;
        phoneNumberChanged.textContent = value;
        phoneNumberField.value = value;
      }
    });

    phoneNumbers.forEach(elem => {
      elem.addEventListener('click', e => {
        let phone = e.target.textContent;
        phoneNumberChanged.textContent = phone;
        phoneNumberField.value = phone;
        $('select.numbers-select').val(phone);
      });
    });

    priceNumbers.forEach(elem => {
      if (elem.classList.contains('active')) {
        let price = elem.textContent;
        if (priceNumberChanged) {
          priceNumberChanged.textContent = price;
        }
        if (priceNumberField) {
          priceNumberField.value = price;
        }
      }
      elem.addEventListener('click', e => {
        let price = e.currentTarget.textContent;
        phoneNumberChanged.textContent = '';
        priceNumberChanged.textContent = price;
        priceNumberField.value = price;
        phoneNumberInput.forEach(input => {
          input.checked = false;
        });
      });
    });
  }

  const triggerBtn = document.querySelectorAll('[data-target-section]');

  if (triggerBtn) {
    triggerBtn.forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        const target = e.currentTarget;
        const targetData = target.getAttribute('data-target-section');
        const targetSection = document.querySelector(`[data-section=${targetData}]`);

        if (targetSection.classList.contains('section-hide')) {
          fadeOut(target, 300);
          fadeIn(targetSection, 300, 'block');
        }
      });
    });
  }

  // View more

  const allLink = document.querySelectorAll('[data-link-all]');

  if (allLink) {
    allLink.forEach(elem => {
      const allLinkData = elem.getAttribute('data-link-all');
      const parent = document.querySelector(`[data-parent-items=${allLinkData}]`);
      const items = parent.querySelectorAll('[data-item]');

      elem.addEventListener('click', e => {
        e.preventDefault();

        fadeOut(elem, 300);

        items.forEach(item => {
          if (item.classList.contains('hide')) {
            item.classList.remove('hide');
            fadeIn(item, 300, 'block');
          }
        });
      });
    });
  }

  const anchors = document.querySelectorAll('[data-anchor]');

  if (anchors) {
    anchors.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        anchors.forEach(el => {
          el.classList.remove('active');
        });

        e.currentTarget.classList.add('active');

        let href = this.getAttribute('href').substring(1);

        const scrollTarget = document.getElementById(href);

        const topOffset = document.querySelector('.header').offsetHeight;
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;

        window.scrollBy({
          top: offsetPosition,
          behavior: 'smooth'
        });
      });
    });
  }

  // Tooltips

  const tooltip = document.querySelectorAll('[data-tooltip]');

  if (tooltip) {
    // let placement;
    // let offset;

    // const breakpointTooltip = window.matchMedia('(max-width: 767px)');

    // if (breakpointTooltip.matches === true) {

    //   placement = 'bottom';
    //   offset = [20, 20];

    // } else if (breakpointTooltip.matches === false) {

    //   placement = 'right';
    //   offset = [0, 20];

    // }

    tooltip.forEach(elem => {
      const tooltipToggle = elem.querySelector('[data-tooltip-toggle]');
      const tooltip = elem.querySelector('[data-tooltip-popup]');

      tippy(tooltipToggle, {
        content: tooltip.innerHTML,
        allowHTML: true,
        placement: 'right',
        interactive: true,
        arrow: true,
        maxWidth: '270',
        offset: [0, 20],
        trigger: 'click'
      });
    });
  }

  // Paid changes

  const paidTable = document.querySelectorAll('[data-table]');

  if (paidTable) {
    paidTable.forEach(table => {
      const paidTriggers = table.querySelectorAll('[data-info-target]');
      const paidFields = table.querySelectorAll('[data-info]');

      paidTriggers.forEach(elem => {
        elem.addEventListener('click', e => {
          let targetData = e.currentTarget.getAttribute('data-info-target');
          paidFields.forEach(el => {
            let fieldData = el.getAttribute('data-info');

            el.classList.remove('active');
            if (targetData === fieldData) {
              el.classList.add('active');
            }
          });
        });
      });
    });
  }

  // Custom select

  const selects = document.querySelectorAll('select.js-select');

  // Nice select init
  selects.forEach(elem => {
    NiceSelect.bind(elem, {
      selectedtext: 'Выбрано',
      placeholder: 'Выбрать'
    });
  });

  // Pay select

  const pay = document.querySelector('[data-pay-parent]');

  if (pay) {
    const paySelect = pay.querySelector('.pay-select');
    const field = paySelect.querySelector('.pay-select-field');
    const options = paySelect.querySelectorAll('.pay-select-option');
    const current = paySelect.querySelector('.pay-select-current');
    const btns = pay.querySelectorAll('[data-pay-btn]');

    field.addEventListener('click', e => {
      paySelect.classList.toggle('open');
    });
    options.forEach(option => {
      option.addEventListener('click', e => {
        const value = e.currentTarget.querySelector('.pay-select-option__value').innerHTML;
        const data = e.currentTarget.getAttribute('data-pay');
        let btnShow = pay.querySelector(`[data-pay-btn="${data}"]`);

        options.forEach(option => {
          option.classList.remove('selected');
        });
        e.currentTarget.classList.add('selected');
        current.innerHTML = value;
        paySelect.classList.remove('open');

        btns.forEach(btn => {
          btn.classList.remove('show');
        });
        btnShow.classList.add('show');
      });
    });
  }

  // Tariff detailed

  const detaledTab = document.querySelectorAll('[data-detailed-link]');

  if (detaledTab) {
    const tariffDetailedLink = document.querySelector('[data-tariff-detailed]');

    detaledTab.forEach(elem => {
      if (elem.classList.contains('active')) {
        const data = elem.getAttribute('data-detailed-link');

        tariffDetailedLink.setAttribute('href', data);
      }

      elem.addEventListener('click', e => {
        const data = e.currentTarget.getAttribute('data-detailed-link');

        tariffDetailedLink.setAttribute('href', data);
      });
    });
  }

  // Disabled

  const disableTrigger = document.querySelectorAll('[data-disable-trigger]');

  if (disableTrigger) {
    disableTrigger.forEach(el => {
      const target = el.getAttribute('data-disable-trigger');
      const checkboxDisabled = el.querySelector('input[name="disable"]');
      const blockDisabledParent = el.closest(`[data-disable-parent]`);
      const blockDisabled = blockDisabledParent.querySelector(`[data-disable=${target}]`);

      if (checkboxDisabled.checked) {
        blockDisabled.classList.add('disabled');
      }
      el.addEventListener('click', e => {
        if (checkboxDisabled.checked) {
          blockDisabled.classList.add('disabled');
        } else {
          blockDisabled.classList.remove('disabled');
        }
      });
    });
  }

  // Only digits field

  let fieldDigits = document.querySelectorAll('input[type="number"]');

  fieldDigits.forEach(element => {
    element.addEventListener('input', function (e) {
      this.value = this.value.replace(/[^\d.]/g, '');
    });
  });

  // *** SLIDERS ***

  // history slider

  let historySlider = new Swiper('.history-slider', {
    slidesPerView: 3,
    spaceBetween: 24,
    loop: false,
    /*enable: false,*/
    speed: 600,
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
    watchOverflow: true,
    on: {
      resize: function (swiper) {
        swiper.update();
      }
    },
    navigation: {
      nextEl: `.history-slider-nav .swiper-button-next`,
      prevEl: `.history-slider-nav .swiper-button-prev`
    },
    breakpoints: {
      320: {
        slidesPerView: 'auto',
        spaceBetween: 10
        /* enable: true*/
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 24
        /* enable: true,*/
      },
      1024: {
        /*   enable: false,*/
      }
    }
  });

  // Rates slider

  let ratesSlider = new Swiper('.rates-slider', {
    slidesPerView: 3,
    spaceBetween: 24,
    loop: false,
    /*enable: false,*/
    speed: 600,
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
    watchOverflow: true,
    on: {
      resize: function (swiper) {
        swiper.update();
      }
    },
    breakpoints: {
      320: {
        slidesPerView: 'auto',
        spaceBetween: 10
        /* enable: true*/
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 24
        /* enable: true,*/
      },
      1024: {
        /*   enable: false,*/
      }
    }
  });

  // News slider

  let newsSlider = new Swiper('.news-slider', {
    slidesPerView: 3,
    spaceBetween: 24,
    loop: false,
    enable: false,
    speed: 600,
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
    watchOverflow: true,
    on: {
      resize: function (swiper) {
        swiper.update();
      }
    },
    breakpoints: {
      320: {
        slidesPerView: 'auto',
        spaceBetween: 10,
        enable: true
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
        enable: true
      },
      1024: {
        enable: false
      }
    }
  });

  // Case slider

  let caseSlider = new Swiper('.case-slider', {
    slidesPerView: 2,
    spaceBetween: 24,
    loop: true,
    speed: 600,
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
    watchOverflow: true,
    on: {
      resize: function (swiper) {
        swiper.update();
      }
    },
    navigation: {
      nextEl: `.case-slider-nav .swiper-button-next`,
      prevEl: `.case-slider-nav .swiper-button-prev`
    },
    pagination: {
      el: `.swiper-pagination`,
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 24
      }
    }
  });

  // Page main slider

  let pageMainSlider = new Swiper('.page-main-slider', {
    // autoplay: {
    //   delay: 5000,
    // },
    slidesPerView: 1,
    spaceBetween: 24,
    // effect: 'fade',
    // fadeEffect: {
    //   crossFade: true
    // },
    loop: false,
    speed: 600,
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
    watchOverflow: true,
    on: {
      resize: function (swiper) {
        swiper.update();
      }
    },
    navigation: {
      nextEl: `.page-main-slider-nav .swiper-button-next`,
      prevEl: `.page-main-slider-nav .swiper-button-prev`
    },
    pagination: {
      el: `.swiper-pagination`,
      type: 'bullets',
      clickable: true
    }
  });

  // Options subcat & num sliders

  const optionsWithThreeSlide = {
    slidesPerView: 3,
    spaceBetween: 24,
    loop: false,
    enable: false,
    speed: 600,
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
    watchOverflow: true,
    on: {
      resize: function (swiper) {
        swiper.update();
      }
    },
    pagination: {
      el: `.swiper-pagination`,
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 'auto',
        spaceBetween: 10,
        enable: true
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 24,
        enable: false
      }
    }
  };

  // Options logos slider

  const optionsWithSixSlide = {
    slidesPerView: 6,
    spaceBetween: 8,
    loop: false,
    enable: false,
    speed: 600,
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
    watchOverflow: true,
    on: {
      resize: function (swiper) {
        swiper.update();
      }
    },
    pagination: {
      el: `.swiper-pagination`,
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 'auto',
        enable: true
      },
      768: {
        slidesPerView: 6,
        enable: false
      }
    }
  };

  // Options Numbers tab slider

  const optionsWithAutoSlide = {
    slidesPerView: 'auto',
    spaceBetween: 8,
    loop: false,
    enable: false,
    speed: 600,
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
    watchOverflow: true,
    on: {
      resize: function (swiper) {
        swiper.update();
      }
    },
    pagination: {
      el: `.swiper-pagination`,
      type: 'bullets',
      clickable: true
    }
    // breakpoints: {
    //   320: {
    //     slidesPerView: 'auto',
    //     // enable: true,
    //   },
    //   768: {
    //     slidesPerView: 'auto',
    //     // enable: false,
    //   }
    // }
  };

  // Options Similar News slider

  const optionsSimilarNewsSlider = {
    slidesPerView: 2,
    spaceBetween: 24,
    loop: false,
    speed: 600,
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
    watchOverflow: true,
    on: {
      resize: function (swiper) {
        swiper.update();
      }
    },
    navigation: {
      nextEl: `.similar-slider-nav .swiper-button-next`,
      prevEl: `.similar-slider-nav .swiper-button-prev`
    },
    pagination: {
      el: `.swiper-pagination`,
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 16
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 24
      }
    }
  };

  // Options Similar Blog slider

  const optionsSimilarBlogSlider = {
    slidesPerView: 3,
    spaceBetween: 24,
    loop: false,
    speed: 600,
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
    watchOverflow: true,
    on: {
      resize: function (swiper) {
        swiper.update();
      }
    },
    navigation: {
      nextEl: `.similar-slider-nav .swiper-button-next`,
      prevEl: `.similar-slider-nav .swiper-button-prev`
    },
    pagination: {
      el: `.swiper-pagination`,
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 16
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 24
      },
      1024: {
        slidesPerView: 3
      }
    }
  };

  // Options Blog Sidebar slider

  const optionsBlogSidebarSlider = {
    slidesPerView: 3,
    spaceBetween: 24,
    loop: false,
    speed: 600,
    enabled: false,
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
    watchOverflow: true,
    on: {
      resize: function (swiper) {
        swiper.update();
      }
    },
    navigation: {
      nextEl: `.blog-slider-nav .swiper-button-next`,
      prevEl: `.blog-slider-nav .swiper-button-prev`
    },
    pagination: {
      el: `.swiper-pagination`,
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 16,
        enabled: true
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 24,
        enabled: true
      },
      1024: {
        slidesPerView: 'auto',
        spaceBetween: 0,
        enabled: false
      }
    }
  };

  // Page main slider

  let hmSlider = new Swiper('.hm-sl', {
    autoplay: {
      delay: 5000
    },
    slidesPerView: 1,
    spaceBetween: 24,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    autoHeight: true,
    loop: true,
    speed: 600,
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
    watchOverflow: true,
    on: {
      resize: function (swiper) {
        swiper.update();
      }
    },
    pagination: {
      el: `.hm-sl-pagination`,
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      768: {
        autoHeight: false
      }
    }
  });

  // home new banner 

  let homeNewBannerSlider = new Swiper('.home-new-banner-sl', {
    autoplay: {
      delay: 5000
    },
    slidesPerView: 1,
    spaceBetween: 24,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    autoHeight: true,
    loop: true,
    speed: 600,
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
    watchOverflow: true,
    on: {
      resize: function (swiper) {
        swiper.update();
      }
    },
    pagination: {
      el: `.home-new-banner-sl-pagination`,
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      768: {
        autoHeight: false
      }
    }
  }); 

  // Subcat slider

  let subcatSlider = new Swiper('.subcat-slider', optionsWithThreeSlide);

  // Num slider

  let numSlider = new Swiper('.num-slider', optionsWithThreeSlide);

  // Logos slider

  let logosSlider = new Swiper('.logos-slider', optionsWithSixSlide);

  // Similar News slider

  let similarNewsSlider = new Swiper('.news-similar-slider', optionsSimilarNewsSlider);

  // Similar Blog slider

  let similarBlogSlider = new Swiper('.blog-similar-slider', optionsSimilarBlogSlider);

  // Blog sidebar slider

  let blogSidebarSlider = new Swiper('.blog-sidebar-slider', optionsBlogSidebarSlider);

  // Numbers tab slider
  let numbersTabSlider = new Swiper('.numbers-tabs-slider', optionsWithAutoSlide);

  numbersTabSlider.on('slideChange reachEnd afterInit', function (swiper) {
    if (this.isEnd) {
      this.el.classList.add('end');
    } else {
      this.el.classList.remove('end');
    }
  });

  // Tariff slider

  let i = 0;

  const tarifSliders = document.querySelectorAll('.tariff-slider');

  for (let i = 0; i < tarifSliders.length; i++) {
    const parent = tarifSliders[i].closest('.tariff-inner');
    const sliderNav = parent.querySelector('.slider-nav');

    tarifSliders[i].classList.add(`tariff-slider-${i}`);
    sliderNav.classList.add(`slider-nav-${i}`);

    let tariffSlider = new Swiper(`.tariff-slider-${i}`, {
      slidesPerView: 3,
      spaceBetween: 24,
      loop: false,
      speed: 600,
      observer: true,
      observeParents: true,
      watchSlidesProgress: true,
      watchOverflow: true,
      on: {
        resize: function (swiper) {
          swiper.update();
        }
      },
      navigation: {
        nextEl: `.slider-nav-${i} .swiper-button-next`,
        prevEl: `.slider-nav-${i} .swiper-button-prev`
      },
      pagination: {
        el: `.swiper-pagination`,
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 8
        },
        640: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 24
        },
        1024: {
          slidesPerView: 3
        }
      }
    });
  }

  // Tariff slider

  i = 0;

  const rateTabsSliders = document.querySelectorAll('.rate-tabs-slider');

  for (let i = 0; i < rateTabsSliders.length; i++) {
    rateTabsSliders[i].classList.add(`rate-tabs-slider-${i}`);

    let slider = new Swiper(`.rate-tabs-slider-${i}`, {
      slidesPerView: 'auto',
      spaceBetween: 16,
      loop: false,
      speed: 600,
      observer: true,
      observeParents: true,
      watchSlidesProgress: true,
      watchOverflow: true,
      on: {
        resize: function (swiper) {
          swiper.update();
        }
      }
    });
  }

  // Rates slider

  const csSliders = document.querySelectorAll('.cs-slider');

  for (let i = 0; i < csSliders.length; i++) {
    const parent = csSliders[i].closest('.cs');
    const navNext = parent.querySelector('.cs-nav');

    csSliders[i].classList.add(`cs-slider-${i}`);
    navNext.classList.add(`cs-nav-${i}`);

    let casesSlider = new Swiper(`.cs-slider-${i}`, {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      speed: 800,
      observer: true,
      observeParents: true,
      watchSlidesProgress: true,
      watchOverflow: true,
      on: {
        resize: function (swiper) {
          swiper.update();
        }
      },
      navigation: {
        nextEl: `.cs-nav-${i}`
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
    }, 10);
  }

  // Change tariffs

  const trf1 = [
    { minute: '200', sms: '50', gb: '25' },
    { minute: '200', sms: '100', gb: '20' },
    { minute: '300', sms: '50', gb: '20' },
    { minute: '300', sms: '100', gb: '15' },
    { minute: '400', sms: '50', gb: '15' },
    { minute: '400', sms: '100', gb: '10' }
  ];
  const trf2 = [
    { minute: '600', sms: '250', gb: '70' },
    { minute: '600', sms: '500', gb: '60' },
    { minute: '800', sms: '250', gb: '60' },
    { minute: '800', sms: '500', gb: '50' },
    { minute: '1000', sms: '250', gb: '50' },
    { minute: '1000', sms: '500', gb: '40' }
  ];
  const trf3 = [
    { minute: '400', sms: '250', gb: '130' },
    { minute: '400', sms: '500', gb: '100' },
    { minute: '1200', sms: '250', gb: '100' },
    { minute: '1200', sms: '500', gb: '70' },
    { minute: '2000', sms: '250', gb: '70' },
    { minute: '2000', sms: '500', gb: '40' }
  ];
  const trf4 = [
    { minute: '2000', sms: '500', gb: '160' },
    { minute: '2000', sms: '750', gb: '160' },
    { minute: '2000', sms: '1000', gb: '140' },
    { minute: '2250', sms: '500', gb: '140' },
    { minute: '2250', sms: '750', gb: '140' },
    { minute: '2250', sms: '1000', gb: '120' },
    { minute: '2500', sms: '500', gb: '120' },
    { minute: '2500', sms: '750', gb: '120' },
    { minute: '2500', sms: '1000', gb: '100' }
  ];
  const trf5 = [
    { opr: 'МТС', minute: '500', sms: '100', gb: '20' },
    { opr: 'МТС', minute: '1000', sms: '500', gb: '30' },
    { opr: 'МТС', minute: '2000', sms: '1000', gb: '50' },
    { opr: 'МТС', minute: '3500', sms: '1000', gb: '50' },
    { opr: 'Мегафон', minute: '700', sms: '300', gb: '50' },
    { opr: 'Мегафон', minute: '1000', sms: '300', gb: '60' },
    { opr: 'Мегафон', minute: '1500', sms: '500', gb: '80' },
    { opr: 'Мегафон', minute: '2000', sms: '1000', gb: '80' }
  ];

  const rng = document.querySelector('[data-rng]');

  if (rng) {
    let rngName = rng.dataset.rng;
    const rngFields = rng.querySelectorAll('input[type="radio"]');
    const rngMinute = document.querySelectorAll('[data-range-minute]');

    let isUpdating = false;

    function getSelectedValue(name) {
      const selector = `input[name="${name}"]:checked`;
      const radio = document.querySelector(selector);
      return radio ? radio.getAttribute(`data-rng-${name}`) : null;
    }

    function setRadioValue(name, value) {
      const selector = `input[name="${name}"][data-rng-${name}="${value}"]`;
      const radio = document.querySelector(selector);
      if (radio) radio.checked = true;
    }

    function handleChange(event, combinations) {
      if (isUpdating) return;
      isUpdating = true;

      const changedType = event.target.name;
      const changedValue = event.target.getAttribute(`data-rng-${changedType}`);

      const currentMinute = getSelectedValue('minute');
      const currentOpr = getSelectedValue('opr');

      let combination;
      if (!currentOpr) {
        combination = combinations.find(
          comb =>
            comb.minute === currentMinute &&
            (changedType === 'sms' ? comb.sms === changedValue : true) &&
            (changedType === 'gb' ? comb.gb === changedValue : true) &&
            (changedType === 'minute' ? comb.minute === changedValue : true)
        );
      } else {
        combination = combinations.find(
          comb =>
            comb.opr === currentOpr &&
            (changedType === 'sms' ? comb.sms === changedValue : true) &&
            (changedType === 'gb' ? comb.gb === changedValue : true) &&
            (changedType === 'minute' ? comb.minute === changedValue : true)
        );
      }

      if (!combination && changedType === 'gb') {
        combination = combinations.find(comb => comb.gb === changedValue);
      } else if (!combination && changedType === 'sms') {
        combination = combinations.find(comb => comb.sms === changedValue);
      } else if (!combination && changedType === 'opr') {
        combination = combinations.find(comb => comb.opr === changedValue);
      } else if (!combination && changedType === 'minute') {
        combination = combinations.find(comb => comb.minute === changedValue);
      }

      if (combination) {
        // Обновляем только те параметры, которые не были изменены
        if (changedType !== 'opr') setRadioValue('opr', combination.opr);
        if (changedType !== 'minute') setRadioValue('minute', combination.minute);
        if (changedType !== 'sms') setRadioValue('sms', combination.sms);
        if (changedType !== 'gb') setRadioValue('gb', combination.gb);
        rngMinute.forEach(el => (el.textContent = combination.minute));
      }

      isUpdating = false;
    }

    rngFields.forEach(radio => {
      radio.addEventListener('change', function (e) {
        rngName === 'trf1' ? handleChange(e, trf1) : null;
        rngName === 'trf2' ? handleChange(e, trf2) : null;
        rngName === 'trf3' ? handleChange(e, trf3) : null;
        rngName === 'trf4' ? handleChange(e, trf4) : null;
        rngName === 'trf5' ? handleChange(e, trf5) : null;
      });
    });
  }

  // Range sliders

  // const rangeBlocks = document.querySelectorAll('[data-range]');

  // if (rangeBlocks) {
  //   const totalMinute = document.querySelectorAll('[data-range-minute]');

  //   rangeBlocks.forEach(elem => {
  //     const slider = elem.querySelector('[data-range-slider]');
  //     const sliderMinute = elem.querySelector('[data-range-slider="minute"]');
  //     const sliderSms = elem.querySelector('[data-range-slider="sms"]');
  //     const sliderGb = elem.querySelector('[data-range-slider="gb"]');
  //     // const sliderInitMin = elem.querySelector('[data-range-init-min]');
  //     // const sliderInitMax = elem.querySelector('[data-range-init-max]');
  //     const sliderStart = slider.getAttribute('data-range-start');
  //     const sliderMin = slider.getAttribute('data-range-min');
  //     const sliderMax = slider.getAttribute('data-range-max');
  //     const sliderStep = slider.getAttribute('data-range-step');
  //     const output = elem.querySelector('[data-range-output]');

  //     // sliderInitMin.innerHTML = sliderMin;
  //     // sliderInitMax.innerHTML = sliderMax;

  //     const sliderOptions = {
  //       start: +sliderStart,
  //       step: +sliderStep,
  //       range: {
  //         'min': +sliderMin,
  //         'max': +sliderMax
  //       },
  //       format: {
  //         to: function (value) {
  //           return value.toFixed(0);
  //         },
  //         from: Number
  //       },
  //       animate: true,
  //       behaviour: 'tap',
  //       tooltips: true,
  //       pips: {
  //         mode: 'steps',
  //         density: 100
  //       }
  //     }

  //     noUiSlider.create(slider, sliderOptions);

  //     slider.noUiSlider.on('update', function (values, handle) {
  //       // let sliderMinuteValue = sliderMinute.noUiSlider.get();
  //       // let sliderSmsValue = sliderSms.noUiSlider.get();
  //       // let sliderGbValue = sliderGb.noUiSlider.get();

  //       output.value = values[handle];
  //       if (sliderMinute) {
  //         totalMinute.forEach(el => {
  //           el.textContent = values[handle];
  //         });
  //       }

  //       // console.log(sliderGb.noUiSlider.get());

  //     });
  //   });
  // }

  /* const rangeBlock = document.querySelector('[data-range]');

   if (rangeBlock) {
     const rangeBlockData = rangeBlock.getAttribute('data-range');
     const totalMinute = document.querySelectorAll('[data-range-minute]');

     // Range sliders
     const sliderMinute = rangeBlock.querySelector('[data-range-slider="minute"]');
     const sliderSms = rangeBlock.querySelector('[data-range-slider="sms"]');
     const sliderGb = rangeBlock.querySelector('[data-range-slider="gb"]');

     // Data minute
     const sliderMinuteStart = sliderMinute.getAttribute('data-range-start');
     const sliderMinuteStep = sliderMinute.getAttribute('data-range-step');
     const sliderMinuteMin = sliderMinute.getAttribute('data-range-min');
     const sliderMinuteMax = sliderMinute.getAttribute('data-range-max');
     // Data sms
     const sliderSmsStart = sliderSms.getAttribute('data-range-start');
     const sliderSmsStep = sliderSms.getAttribute('data-range-step');
     const sliderSmsMin = sliderSms.getAttribute('data-range-min');
     const sliderSmsMax = sliderSms.getAttribute('data-range-max');
     // Data gb
     const sliderGbStart = sliderGb.getAttribute('data-range-start');
     const sliderGbStep = sliderGb.getAttribute('data-range-step');
     const sliderGbSteps = +sliderGb.getAttribute('data-range-steps');
     const sliderGbMin = sliderGb.getAttribute('data-range-min');
     const sliderGbMax = sliderGb.getAttribute('data-range-max');

     // Outputs
     const outputMinute = rangeBlock.querySelector('[data-range-minute-output]');
     const outputSms = rangeBlock.querySelector('[data-range-sms-output]');
     const outputGb = rangeBlock.querySelector('[data-range-gb-output]');

     const sliderOptionsMinute = {
       start: +sliderMinuteStart,
       step: +sliderMinuteStep,
       range: {
         'min': +sliderMinuteMin,
         'max': +sliderMinuteMax
       },
       format: {
         to: function (value) {
           return value.toFixed(0);
         },
         from: Number
       },
       animate: true,
       behaviour: 'tap',
       tooltips: true,
       pips: {
         mode: 'steps',
         density: 100
       }
     }
     const sliderOptionsSms = {
       start: +sliderSmsStart,
       step: +sliderSmsStep,
       range: {
         'min': +sliderSmsMin,
         'max': +sliderSmsMax
       },
       format: {
         to: function (value) {
           return value.toFixed(0);
         },
         from: Number
       },
       animate: true,
       behaviour: 'tap',
       tooltips: true,
       pips: {
         mode: 'steps',
         density: 100
       }
     }
     const sliderOptionsGb = {
       start: +sliderGbStart,
       step: +sliderGbStep,
       range: {
         'min': +sliderGbMin,
         'max': +sliderGbMax
       },
       format: {
         to: function (value) {
           return value.toFixed(0);
         },
         from: Number
       },
       animate: true,
       behaviour: 'tap',
       tooltips: true,
       pips: {
         mode: 'steps',
         density: 100
       }
     }

     noUiSlider.create(sliderMinute, sliderOptionsMinute);
     noUiSlider.create(sliderSms, sliderOptionsSms);
     noUiSlider.create(sliderGb, sliderOptionsGb);

     let sliderMinuteValue;
     let sliderSmsValue;
     let sliderGbValue;

     sliderMinute.noUiSlider.on('update', function (values, handle) {
       sliderMinuteValue = values[handle];
       sliderSmsValue = sliderSms.noUiSlider.get();
       sliderGbValue = sliderGb.noUiSlider.get();

       outputMinute.value = sliderMinuteValue;
       totalMinute.forEach(el => {
         el.textContent = sliderMinuteValue;
       });
       linkedSliders();
     });

     sliderSms.noUiSlider.on('update', function (values, handle) {
       sliderSmsValue = values[handle];
       sliderMinuteValue = sliderMinute.noUiSlider.get();
       sliderGbValue = sliderGb.noUiSlider.get();

       outputSms.value = sliderSmsValue;
       linkedSliders();
     });

     sliderGb.noUiSlider.on('update', function (values, handle) {
       sliderGbValue = values[handle];
       sliderSmsValue = sliderSms.noUiSlider.get();
       sliderMinuteValue = sliderMinute.noUiSlider.get();

       outputGb.value = sliderGbValue;
     });

     function linkedSliders() {
       if (rangeBlockData === 'msk-1') {
         if (sliderMinuteValue === '200' && sliderSmsValue === '50') {
           sliderGb.noUiSlider.set(25, true, true);
         } else if (sliderMinuteValue === '200' && sliderSmsValue === '100') {
           sliderGb.noUiSlider.set(20, true, true);
         }
         if (sliderMinuteValue === '300' && sliderSmsValue === '50') {
           sliderGb.noUiSlider.set(20, true, true);
         } else if (sliderMinuteValue === '300' && sliderSmsValue === '100') {
           sliderGb.noUiSlider.set(15, true, true);
         }
         if (sliderMinuteValue === '400' && sliderSmsValue === '50') {
           sliderGb.noUiSlider.set(15, true, true);
         } else if (sliderMinuteValue === '400' && sliderSmsValue === '100') {
           sliderGb.noUiSlider.set(10, true, true);
         }
       }
       if (rangeBlockData === 'msk-2') {
         if (sliderMinuteValue === '600' && sliderSmsValue === '250') {
           sliderGb.noUiSlider.set(70, true, true);
         } else if (sliderMinuteValue === '600' && sliderSmsValue === '500') {
           sliderGb.noUiSlider.set(60, true, true);
         }
         if (sliderMinuteValue === '800' && sliderSmsValue === '250') {
           sliderGb.noUiSlider.set(60, true, true);
         } else if (sliderMinuteValue === '800' && sliderSmsValue === '500') {
           sliderGb.noUiSlider.set(50, true, true);
         }
         if (sliderMinuteValue === '1000' && sliderSmsValue === '250') {
           sliderGb.noUiSlider.set(50, true, true);
         } else if (sliderMinuteValue === '1000' && sliderSmsValue === '500') {
           sliderGb.noUiSlider.set(40, true, true);
         }
       }
       if (rangeBlockData === 'msk-3') {
         if (sliderMinuteValue === '400' && sliderSmsValue === '250') {
           sliderGb.noUiSlider.set(130, true, true);
         } else if (sliderMinuteValue === '400' && sliderSmsValue === '500') {
           sliderGb.noUiSlider.set(100, true, true);
         }
         if (sliderMinuteValue === '1200' && sliderSmsValue === '250') {
           sliderGb.noUiSlider.set(100, true, true);
         } else if (sliderMinuteValue === '1200' && sliderSmsValue === '500') {
           sliderGb.noUiSlider.set(70, true, true);
         }
         if (sliderMinuteValue === '2000' && sliderSmsValue === '250') {
           sliderGb.noUiSlider.set(70, true, true);
         } else if (sliderMinuteValue === '2000' && sliderSmsValue === '500') {
           sliderGb.noUiSlider.set(40, true, true);
         }
       }
       if (rangeBlockData === 'msk-4') {
         if (sliderMinuteValue === '2000' && sliderSmsValue === '500') {
           sliderGb.noUiSlider.set(160, true, true);
         } else if (sliderMinuteValue === '2000' && sliderSmsValue === '1000') {
           sliderGb.noUiSlider.set(140, true, true);
         }
         if (sliderMinuteValue === '2250' && sliderSmsValue === '500') {
           sliderGb.noUiSlider.set(140, true, true);
         } else if (sliderMinuteValue === '2250' && sliderSmsValue === '1000') {
           sliderGb.noUiSlider.set(120, true, true);
         }
         if (sliderMinuteValue === '2500' && sliderSmsValue === '500') {
           sliderGb.noUiSlider.set(120, true, true);
         } else if (sliderMinuteValue === '2500' && sliderSmsValue === '1000') {
           sliderGb.noUiSlider.set(100, true, true);
         }
       }
       if (rangeBlockData === 'spb-1') {
         if (sliderMinuteValue === '100' && sliderSmsValue === '50') {
           sliderGb.noUiSlider.set(35, true, true);
         } else if (sliderMinuteValue === '100' && sliderSmsValue === '100') {
           sliderGb.noUiSlider.set(30, true, true);
         }
         if (sliderMinuteValue === '300' && sliderSmsValue === '50') {
           sliderGb.noUiSlider.set(25, true, true);
         } else if (sliderMinuteValue === '300' && sliderSmsValue === '100') {
           sliderGb.noUiSlider.set(20, true, true);
         }
         if (sliderMinuteValue === '500' && sliderSmsValue === '50') {
           sliderGb.noUiSlider.set(15, true, true);
         } else if (sliderMinuteValue === '500' && sliderSmsValue === '100') {
           sliderGb.noUiSlider.set(10, true, true);
         }
       }
       if (rangeBlockData === 'spb-2') {
         if (sliderMinuteValue === '200' && sliderSmsValue === '250') {
           sliderGb.noUiSlider.set(50, true, true);
         } else if (sliderMinuteValue === '200' && sliderSmsValue === '500') {
           sliderGb.noUiSlider.set(45, true, true);
         }
         if (sliderMinuteValue === '600' && sliderSmsValue === '250') {
           sliderGb.noUiSlider.set(35, true, true);
         } else if (sliderMinuteValue === '600' && sliderSmsValue === '500') {
           sliderGb.noUiSlider.set(30, true, true);
         }
         if (sliderMinuteValue === '1000' && sliderSmsValue === '250') {
           sliderGb.noUiSlider.set(20, true, true);
         } else if (sliderMinuteValue === '1000' && sliderSmsValue === '500') {
           sliderGb.noUiSlider.set(15, true, true);
         }
       }
       if (rangeBlockData === 'spb-3') {
         if (sliderMinuteValue === '400' && sliderSmsValue === '500') {
           sliderGb.noUiSlider.set(65, true, true);
         } else if (sliderMinuteValue === '400' && sliderSmsValue === '1000') {
           sliderGb.noUiSlider.set(60, true, true);
         }
         if (sliderMinuteValue === '1200' && sliderSmsValue === '500') {
           sliderGb.noUiSlider.set(45, true, true);
         } else if (sliderMinuteValue === '1200' && sliderSmsValue === '1000') {
           sliderGb.noUiSlider.set(40, true, true);
         }
         if (sliderMinuteValue === '2000' && sliderSmsValue === '500') {
           sliderGb.noUiSlider.set(25, true, true);
         } else if (sliderMinuteValue === '2000' && sliderSmsValue === '1000') {
           sliderGb.noUiSlider.set(20, true, true);
         }
       }
       if (rangeBlockData === 'spb-4') {
         if (sliderMinuteValue === '500' && sliderSmsValue === '500') {
           sliderGb.noUiSlider.set(80, true, true);
         } else if (sliderMinuteValue === '500' && sliderSmsValue === '1000') {
           sliderGb.noUiSlider.set(75, true, true);
         }
         if (sliderMinuteValue === '2000' && sliderSmsValue === '500') {
           sliderGb.noUiSlider.set(55, true, true);
         } else if (sliderMinuteValue === '2000' && sliderSmsValue === '1000') {
           sliderGb.noUiSlider.set(50, true, true);
         }
         if (sliderMinuteValue === '3500' && sliderSmsValue === '500') {
           sliderGb.noUiSlider.set(30, true, true);
         } else if (sliderMinuteValue === '3500' && sliderSmsValue === '1000') {
           sliderGb.noUiSlider.set(25, true, true);
         }
       }
     }

   }*/

  // тарифы на главной
  $('.section-tariff-home .tariff-tabs__item').click(function (e) {
    e.preventDefault();
    $('.section-tariff-home .tariff-tabs__item').removeClass('active');
    $('.section-tariff-home .tariff-inner').removeClass('open');
    $(this).addClass('active');
    let index = $(this).index();
    $('.section-tariff-home .tariff-inner:nth-child(' + (index + 1) + ')').addClass('open');
  });

  // dropdown на странице тарифа подбробнее
  {
    const toggle = document.querySelector('.ratessect__more-tariff__toggle');
    const content = document.querySelector('.ratessect__more-tariff__content');

    if (toggle && content) {
      toggle.addEventListener('click', function () {
        this.classList.toggle('active');
        content.classList.toggle('active');
      });
    }
  }

});