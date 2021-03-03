import $ from 'jquery';

export default function() {
  $('[data-goto-product]').change(function() {
    window.location.href = $(this).find('option:selected').data('url');
  })
}