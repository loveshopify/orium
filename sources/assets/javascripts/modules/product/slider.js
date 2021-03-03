import $ from 'jquery';
import 'slick-carousel';

export default function() {
  const $productSlider = $('[data-ps]');
  if ($productSlider.length) {
    $productSlider.on('init', function() {
      $productSlider.addClass('is-visible');
    })
    const slider = $productSlider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
    });
  }
}