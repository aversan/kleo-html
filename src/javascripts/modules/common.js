import 'svgxuse';
import autosize from 'autosize';
import ismobile from 'ismobilejs';
import feather from 'feather-icons';
// import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';

global.jQuery = $;
global.$ = $;

$(() => {
  // 60fps scrolling using pointer-events: none
  // https://habrahabr.ru/post/204238/

  const { body } = document;
  let timer;

  window.addEventListener('scroll', () => {
    clearTimeout(timer);
    if (!body.classList.contains('disable-hover')) {
      body.classList.add('disable-hover');
    }
    timer = setTimeout(() => {
      body.classList.remove('disable-hover');
    }, 500);
  }, false);


  // check mobile device

  if (ismobile.phone) {
    body.classList.add('is-phone');
  } else if (ismobile.tablet) {
    body.classList.add('is-tablet');
  } else {
    body.classList.add('is-desktop');
  }


  // autosize textarea

  autosize($('textarea.js-autosize'));


  // menu toggle

  (function (){
    let $toggle = $('.js-menu-toggle');
    let $body = $(body);
    let $menuMobile = $('.side-menu-mobile');
    let $overlay = $('.content-overlay');

    $toggle.on('click', function(){
      if ($toggle.hasClass('hide-menu')) {
        $toggle.removeClass('hide-menu');
        $body.addClass('no-scrollable');
        $menuMobile.addClass('side-menu-mobile-opened');
        $overlay.addClass('content-overlay-visible');
      } else {
        $toggle.addClass('hide-menu');
        $body.removeClass('no-scrollable');
        $menuMobile.removeClass('side-menu-mobile-opened');
        $overlay.removeClass('content-overlay-visible');
      }
    });

    $overlay.on('click', function(){
      $toggle.addClass('hide-menu');
      $body.removeClass('no-scrollable');
      $menuMobile.removeClass('side-menu-mobile-opened');
      $overlay.removeClass('content-overlay-visible');
    });
  })();

  // $(document).click(function(event) {
  //   var $target = $(event.target);
  //   if(!$target.closest('.side-menu-mobile').length && $('.side-menu-mobile').is(':visible')) {
  //     $('#').hide();
  //   }
  // });

  // feather icons

  feather.replace();


  // search input

  (function(){
    let $searchGroup = $('.js-search-input');
    let $wrapper = $searchGroup.parent('.js-search-wrapper');
    let $input = $searchGroup.find('.form-control');

    function init() {
      if (!!$input.val()) {
        $searchGroup.addClass('expand-search');
        $wrapper.addClass('expand-search');
      } else {
        $searchGroup.removeClass('expand-search');
        $wrapper.removeClass('expand-search');
      }
    }

    $input.focus(function(){
      $searchGroup.addClass('expand-search');
      $wrapper.addClass('expand-search');
    });

    $input.blur(function(){
      if (!!$input.val()) {
        return;
      }

      $searchGroup.removeClass('expand-search');
      $wrapper.removeClass('expand-search');
    });
    init();
  })();
});
