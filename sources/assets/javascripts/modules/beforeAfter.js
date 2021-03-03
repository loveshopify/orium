import $ from 'jquery';

const $image = $('[data-ba-image]');


const setPos = function(e, $shutter, $image) {
  const pageX = (e.type.toLowerCase() === 'mousemove')
    ? e.pageX
    : e.originalEvent.touches[0].pageX;

  const ofLeft = $shutter.offset().left;
  const posLeft = $shutter.position().left;
  const right = $image.outerWidth();
  let left = posLeft + pageX - ofLeft;

  left = (left <= 0) ? 0 : 
    (left >= right) ? right : 
      left

  $shutter.css('left', left);
  $image.css('clip', `rect(auto, auto, auto, ${left}px)`);
}


export default function() {
  $image.each(function (index, image) {
    const $parent = $(image).closest('[data-ba-parent]');
    const $shutter = $('[data-ba-shutter]', $parent);
    const $image = $('[data-ba-image]', $parent);
    
    let dragging = false;
    const enable = () => dragging = true;
    const disable = () => dragging = false;
    
    $shutter.on('mousedown touchstart', enable)
      .on('mouseup touchend', disable);
    $(window).on('mousemove touchmove', function(e) {
      if (dragging) setPos(e, $shutter, $image);
    }).on('mouseup', disable);
  });

}