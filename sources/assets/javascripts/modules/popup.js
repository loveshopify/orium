import $ from 'jquery';

export default function() {
  $('[data-popup-close]').click(function(){
    $(this).closest('[data-popup]').addClass('is-hidden').trigger('setDefaultContent');
  })

  $('[data-popup-open]').click(function(event) {
    event.preventDefault();
    var popup = $(this).data('popup-open');
    var $popup = $('[data-popup="'+ popup +'"');
    $popup.toggleClass('is-hidden');
  });

  // Open popup when popup form loaded with errors
  $('[data-popup-form-errors]').each(function (index, element) {
    const popup = $(this).data('popup-form-errors');
    $(`[data-popup-open="${popup}"]`).trigger('click');
  });
}