import $ from 'jquery';

const stickyHeader = function() {
  const $header = $('[data-site-header]');
  let topBarHeight, headerHeight;
  const update = () => {
    topBarHeight = $('[data-top-bar]').outerHeight();
    headerHeight = ($header.hasClass('m-transparent') && $(window).width() > 989) ? topBarHeight : $header.outerHeight();
    $('body').css('paddingTop', headerHeight+'px');
  }
  update();
  $(window).resize(update);
  $(document).scroll(function () {
    const scroll = $(this).scrollTop();
    if (scroll > headerHeight) {
      $header.css('transform', `translate(0, -${topBarHeight}px)`).addClass('is-scrolled');
    } else {
      $header.css('transform', `translate(0, 0)`).removeClass('is-scrolled');
    }
  })
}

const mobileHeader = function() {
  const $btn = $('[data-open-menu]');
  $btn.click(function(e) {
    e.preventDefault();
    $('body').toggleClass('is-menu-open');
  })
}

const header = () => {
  stickyHeader();
  mobileHeader();
}

export default header