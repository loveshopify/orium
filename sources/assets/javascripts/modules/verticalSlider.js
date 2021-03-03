import $ from 'jquery';
import log from '../tools/log'

const section = '[data-vertical-slider-section]';
const slider = '[data-vertical-slider]';
const slide = '[data-vertical-slide]';
const $header = $('#site-header'); 
const $button = $('[data-button]', slider);
const $controls = $('[data-vertical-slider-controls]', slider);
const $arrow = $('[data-vertical-slider-arrow]', slider);
let pageHeight, headerHeight, sectionHeight;
let topCoordinates = [];
let idx = 0;


const reset = () => {
  headerHeight, pageHeight, sectionHeight = 0;
  $(slider).removeClass('is-fixed is-hidden');
  showSlide('all');
  $(section).css('height', 'auto');
  idx = 0;
}

const init = () => {
  reset();



  setTimeout(() => {
    headerHeight = $header.outerHeight();       //log({headerHeight});
    pageHeight = $(window).outerHeight() - headerHeight;       //log({pageHeight});
    sectionHeight = getSectionHeight();        //log({slide});
    updateTopCoordinates();
    $(section).css({
      'height': sectionHeight
    });
  }, 100);


  $(slide).hide().eq(0).show();
  $(document).scroll();
}

const getSectionHeight = () => {
  return pageHeight * $(slide).length;
}

const updateTopCoordinates = () => {
  topCoordinates = [];
  const sectionTop = $(section).offset().top;
  for (let i = 0; i < $(slide).length; i++) {
    topCoordinates.push(sectionTop + pageHeight*i)
  }
  console.log(topCoordinates);
}


const updateSliderOnScroll = (scroll) => {
  topCoordinates.forEach((topCoordinate, index) => {
    if (scroll >= topCoordinate) {
      showSlide(index);
      controlsUpdate(index);
    }
  })
}

const showSlide = index => {
  $(slide).each(function (i, element) {
    if (index === 'all') {
      $(element).show();
    } else {
      if (index == i) {
        $(element).show();
      } else {
        $(element).hide();
      }
    }
  });
}

const scrollToSlide = (index) => {

  topCoordinates.forEach(function (topCoordinate, i) {
    if (index == i) {
      let scroll = topCoordinate+1;
      if (index == 0) {
        scroll = topCoordinates[1]-1;
      }
      $('html,body').animate({
        scrollTop: scroll},
        'fast');
    }
  });
}

const scrollHandler = () => {
  $(document).scroll(function () {
    if (topCoordinates.length) {
      const scroll = $(this).scrollTop()   //log({scroll})
      updateSliderOnScroll(scroll);
    }    
  });
}

const controlsHandler = () => {
  $button.click(function (e) { 
    const index = $(this).data('button');
    scrollToSlide(index);
  });
  $arrow.click(function (e) { 
    scrollToSlide(idx+1);
  });
}

const controlsUpdate = (index) => {
  const $thisButton = $button.eq(index);
  const $thisLi = $button.eq(index).parent();
  $button.removeClass('is-active');
  $thisButton.addClass('is-active');

  idx = index;
  if ($(window).width() > 989) {
    if (index == 0) {
      $controls.css('marginTop', '0px');
      return false;
    }
    const margin = parseFloat($thisLi.outerHeight()) - parseFloat($thisLi.css('marginTop')) - parseFloat($thisLi.css('marginBottom')) ;
    $controls.css('marginTop', `-${$thisLi.position().top + margin}px`);
  }

}

const verticalSlider = function (options) {
  if ($(section).length) {
    init();
    // $(window).resize(init);
    scrollHandler();
    controlsHandler();
  }
};



export default verticalSlider;