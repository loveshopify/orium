import $ from 'jquery';

const animation = function () {
  const sections = $('.section, [data-animate-section]');
  const blocks = $('[data-animate-block]');
  $(document).scroll(function () {
    const scroll = $(this).scrollTop();
    const windowHeight = $(window).outerHeight();
    const headerHeight = $('[data-site-header]').outerHeight();
    sections.each(function (index, section) {
      const sectionTop = $(section).position().top - $(window).outerHeight()/1.5;
      if (scroll >= sectionTop) {
        $(section).addClass('section-in');
      }
    });
    blocks.each(function (index, block) {
      const blockTop = $(block).offset().top;
      const blockHeight = $(block).outerHeight();

      if ( $(block).find('[data-scroll-line]').length ) {
        let lineHeight = 0;
        let $lastActiveBlock = $(block).find('[data-animate-block].is-active').last();
        if ($lastActiveBlock.length) {
          const lastActiveBlockHeight = $lastActiveBlock.outerHeight();
          lineHeight = 100*(scroll + headerHeight + windowHeight / 2 - blockTop - lastActiveBlockHeight) / blockHeight;
        } else {
          $lastActiveBlock = $(block).find('[data-animate-block]').eq(0)
        }
        const imgUrl = $lastActiveBlock.data('image');
        $('[data-scroll-image]').attr('src', imgUrl);
        
        if (lineHeight >= 100) {
          $(block).addClass('is-active');
          $('[data-scroll-line]', $(block)).css('height', '100%');
        } else {
          $(block).removeClass('is-active');
          $('[data-scroll-line]', $(block)).css('height', lineHeight+'%');
        }

      } else {
        if (scroll + headerHeight + windowHeight / 2 >= blockTop + blockHeight) {
          $(block).addClass('is-active');
        } else {
          $(block).removeClass('is-active');
        }
      }
    });
  }).scroll();
  $(document).ready(function () {
    $('body').addClass('body-in');
  });
}

export default animation;