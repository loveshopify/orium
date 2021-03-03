import $ from 'jquery';

const smoothScroll = function () {
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      scrollToHash(event, this);
    });
  $('[data-scroll-next]').click(function(e) {
    const target = $('.shopify-section').eq(2);
    if (target.length) {
      e.preventDefault();
      scroll(target);
    }
  })
}


const scrollToHash = function(event, _this) {
  if (
    location.pathname.replace(/^\//, '') == _this.pathname.replace(/^\//, '')
    &&
    location.hostname == _this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(_this.hash);
    target = target.length ? target : $('[name=' + _this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      scroll(target);
    }
  }
}

export function scroll(target) {
  $('html, body').animate({
    scrollTop: target.offset().top
  }, 1000, function () {
    // Callback after animation
  });
}

export default smoothScroll;