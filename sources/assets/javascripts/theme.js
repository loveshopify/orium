import $ from 'jquery';

import header from './modules/header';
import slider from './modules/slider';
import smoothScroll from './modules/smoothScroll';
import { scroll } from './modules/smoothScroll';
import qty from './modules/qty-selector';
import product from './modules/product';
import login from './modules/login';
import customerAddresses from './modules/account';
import animation from './modules/animation';
import cartPage from './modules/cartPage';
import instagramFeed from './modules/instagramFeed';
import popup from './modules/popup';
import minicart from './modules/minicart';
import megamenu from './modules/megamenu';
import search from './modules/search';
import quickView from './modules/quickView';

window.$ = window.jQuery = $;

const register = function (f, args) {
  try {
    f(args);
    if (args && args.resize) {
      $(window).resize(function() {
        f(args);
      })
    }
  } catch (e) {
    console.error(e);
  }
}

const trigger = () => {
  $('[data-trigger]').click(function(e) {
    e.preventDefault();
    $('[data-trigger]').not($(this)).removeClass('is-open');
    $(this).toggleClass('is-open');
  })
  $('[data-trigger-hover]').mouseover(function(e) {
    e.preventDefault();
    $('[data-trigger]').removeClass('is-open');
  })
  $(document).on('click',function (e) {
    const trigger = '[data-trigger]';
    const $target = $(e.target);
    const $trigger = $target.closest(trigger);
    const $next = $(trigger).next();
    const isNext = $next.find($target).length;

    if ($trigger.length || isNext) return;
    $(trigger).removeClass('is-open');
   });
}

const tabs = () => {
  $('[data-tab]').click(function (e) { 
    e.stopPropagation();
    const index = $(this).data('tab');
    const $parent = $(this).closest('[data-tabs]');
    $('[data-tab], [data-tab-content]', $parent).removeClass('is-active');
    $(this).addClass('is-active');
    $(`[data-tab-content=${index}]`, $parent).addClass('is-active');
  });
}

const filter = () => {
  const storageIndex = localStorage.getItem('collection-tab');
  if (storageIndex) {
    $('[data-collection-tabs] [data-tab]').removeClass('is-active');
    $(`[data-collection-tabs] [data-tab=${storageIndex}]`).addClass('is-active');
    $('[data-collection-tabs] [data-tab-content]').removeClass('is-active');
    $(`[data-collection-tabs] [data-tab-content=${storageIndex}]`).addClass('is-active');
  }
  $('[data-collection-tabs] .nav__link').click(function() {
    const index = $(this).closest('[data-tab-content]').data('tab-content');
    localStorage.setItem('collection-tab', index);
  })
}

const video = function () {
  const video = $('[data-video] video');
  const btn = $('[data-video-btn]');
  btn.click(function (e) {
    $(this).siblings('video').click();
  });
  video.each(function (index, videoEl) {
    $(videoEl).on('play seeking', function () {
      $(this).attr('controls', true);
      $(this).siblings('button').hide();
      $(this).closest('[data-video]').addClass('is-playing');
    })
    $(videoEl).on('seeked', function() {
      $(this)[0].play()
    })
    $(videoEl).on('pause', function () {
      $(this).removeAttr('controls');
      $(this).siblings('button').show();
      $(this).closest('[data-video]').removeClass('is-playing');
    })
  });
}

const handleGotop = function () {
  const gotop = $('[data-gotop]');
  $(document).scroll(function () {
    const scroll = $(this).scrollTop();
    if (scroll >= $(window).height()) {
      gotop.show();
    } else {
      gotop.hide();
    }
  });
}

const accordions = function() {
  $(document).on('click', '[data-accordion-button]', function (event) {
    event.preventDefault();
    const $container = $(this).closest('[data-accordions-container]');

    if ($container.data('accordions-mobile-only') == "1" && $(window).outerWidth() > 989 ) {
      return false;
    }

    const $currentBtn = $(this);
    const $currentContent = $(this).siblings('[data-accordion-content]');
    $currentBtn.toggleClass('is-open');
    $currentContent.slideToggle();
    $('[data-accordion-button]', $container).not($currentBtn).removeClass('is-open');
    $('[data-accordion-content]', $container).not($currentContent).slideUp();
  });
}

const faq = function() {
  const $toggle = $('[data-faq-section-toggle]');
  const $section = $('[data-faq-section]');
  if ($toggle.length) {
    $toggle.click(function (e) { 
      const currentSection = $(this).data('faq-section-toggle');
      $toggle.removeClass('is-active');
      $(this).addClass('is-active');
      $section.removeClass('is-active');
      $section.filter(`[data-faq-section=${currentSection}]`).addClass('is-active');
    });
  }
}

const stickyFooter = function () {
  const update = () => {
    setTimeout(() => {
      if ($(window).width() <= 989) {
        $('body').css('paddingBottom', 0);
        $('[data-site-footer]').show();
        return false;
      }
      var height = $('[data-site-footer]').outerHeight();
      $('body').css({
        'paddingBottom': height
      });
      $('[data-site-footer]').show();
    }, 250);
  }
  update();
  $(window).resize(update)
}

const themeEditor = function() {
  if (Shopify.designMode) {
    $('body').removeClass('animations-on');
  }
}

const toggleTarget = function() {
  $('[data-toggle]').click(function() {
    const target = $(this).data('toggle');
    const $target = $(`[data-target=${target}]`);
    $target.toggleClass('is-active');
  })
}

const goTo = function() {
  $('[data-goto]').click(function() {
    const target = $(this).data('goto');
    const $target = $(`[data-goto-target=${target}]`);
    $(this).closest('[data-goto-target]').addClass('hide');
    $target.removeClass('hide');
  })
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

const misc = function() {
  $('[data-random-number]').text(getRandomInt(2, 9))
}

const btnSectionScroll = function() {
  $(".btn.add-to-cart:not([data-add-to-cart]").click(function(e){
    e.preventDefault();
    if ( ($(this).text().toLowerCase() == "order now") && $(".product-main").length) {
      $("html, body").animate({ scrollTop: 0 }, "slow");
    } else {
      const href = $(this).attr('href');
      window.location.href = href; 
    }
  });
}

$(document).ready(() => {
  register(header);
  register(stickyFooter);
  register(slider);
  register(video);
  register(handleGotop);
  register(product);
  register(qty);
  register(accordions);
  register(smoothScroll);
  register(login);
  register(customerAddresses);
  register(animation);
  register(cartPage);
  register(popup);
  register(faq);
  register(themeEditor);
  register(trigger);
  register(tabs);
  register(filter);
  register(toggleTarget);
  register(goTo);
  register(minicart);
  register(misc);
  register(btnSectionScroll);
  register(instagramFeed);
  register(megamenu);
  register(search);
  register(quickView);
});
