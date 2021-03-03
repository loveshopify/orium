import $ from 'jquery';
import 'slick-carousel';


export const mountSlider = ($slider, initCallBack, responsive) => {
  if ($slider === undefined) {
    console.error("Can't mount undefined slider");
    return false;
  }
  
  if ($slider.data('desktop-only') == "1" && $(window).width() <= 989) return false; 
  if ($slider.data('mobile-only') == "1" && $(window).width() > 989) return false; 

  if (typeof initCallBack === 'function') {
    $slider.on('init', initCallBack);
  }

  const $controls = $slider.parent().find('.slider-controls');
  const options = {
    slidesToShow: $slider.data('slides-to-show') || 1,
    slidesToScroll: $slider.data('slides-to-scroll') || 1,
    draggable: ($slider.data('draggable') == false) ? false : true,
    infinite: ($slider.data('infinite') == false) ? false : true,
    adaptiveHeight: ($slider.data('adaptive-height') == true) ? true : false,
    arrows: ($slider.data('arrows') == false) ? false : true,
    dots: ($slider.data('dots') == false) ? false : true,
    draggable: ($slider.data('draggable') == false) ? false : true,
    autoplay: ($slider.data('autoplay') == true) ? true : false,
    centerMode: ($slider.data('centermode') == true) ? true : false,
  }
  if ($slider.data('custom-controls') == "1") {
    options['appendDots'] = $controls.find('[data-hor-slider-dots]');
    options['prevArrow'] = $controls.find('[data-hor-slider-prev]');
    options['nextArrow'] = $controls.find('[data-hor-slider-next]');
  }
  if ($slider.data('custom-dots') == "1") {
    options['appendDots'] = $controls.find('[data-hor-slider-dots]');
  }
  if ($slider.data('dots-titles') == "1") {
    options['customPaging'] = function(slider, i) {
      var title = $(slider.$slides[i]).find('[data-title]').data('title');
      return '<hr><button><span>'+title+'</span></button>';
    }
  }
  if ($controls.length) {
    $slider.on('init', () => $controls.addClass('m-mounted'));
  }
  if (typeof responsive == 'object') {
    options['responsive'] = responsive;
  }
  if ($slider.data('slides-to-show-mob')) {
    options['responsive'] = [
      {
        breakpoint: 989,
        settings: {
          slidesToShow: $slider.data('slides-to-show-mob'),
        }
      }
    ]
  }
  if ($slider.data('as-nav-for')) {
    const id = $slider.data('as-nav-for');
    options['asNavFor'] = `[data-slider=${id}]`;
    options['focusOnSelect'] = true;
  }
  console.log(options);
  $slider.slick(options);
}

export default function () {
  const $sliders = $('[data-hor-slider]');
  $sliders.each(function (index, slider) {
    const $slider = $(slider);
    mountSlider($slider);
  });
};