import $ from 'jquery';

export default function() {
  const $megamenuContents = $('[data-parent-link]');
  $megamenuContents.each(function(index, megamenuContent){
      console.log('megamenu');      
      const parentLink = $(megamenuContent).data('parent-link');
      if($(window).width() < 990) {
          $(megamenuContent).attr('data-accordion-content', '');
      }
      $('[data-megamenu=' + parentLink + ']').append($(megamenuContent).parent().html());
      $('[data-megamenu=' + parentLink + ']').find('a').attr('data-accordion-button', '');
            
  })
}