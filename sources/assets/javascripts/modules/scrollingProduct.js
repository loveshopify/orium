import $ from 'jquery';
const $productWrap = $('[data-scrolling-product-wrapper]');
const $productCell = $('[data-scrolling-product-cell]', $productWrap);

const refresh = () => {
  $productWrap.removeAttr('style');
  $productCell.removeAttr('style');
  init();
}

const init = () => {
  const height = $productWrap.outerHeight();
  let offset = $productWrap.offset();
  $productWrap.css({
    height: height+offset.top,
    marginTop: -offset.top,
  })
  if ($(window).width() <= 989) {
    const top = $('.hero__text').outerHeight() + $('.hero__text').offset().top + 15;
    $productCell.css({ top: top });
    $(document).scroll(function() {
      const scroll = $(this).scrollTop();

      if (scroll + $(window).outerHeight() >= offset.top + height) {
        $productCell.addClass('is-hover');
      } else {
        $productCell.removeClass('is-hover');
      }
    })
  }
}


const scrollingProduct = () => {
  if ($productWrap.length && $productCell.length) {
    init();
    $(window).resize(refresh);
  }
}


export default scrollingProduct;