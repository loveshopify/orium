import $ from 'jquery';

export default function() {
  $(".search-close").click(function(){
    $('[data-overlay-search]').removeClass('is_active');
  });

  $('[data-show-search-trigger]').click(function(){
    var display_mode = $(this).data('search-style');
    if(display_mode == "overlay"){
      $('[data-overlay-search]').toggleClass('is_active');
      $("[data-popup='search-popup']").addClass('is-hidden');
      $('[data-search-input]').focus();
    }else{
      
    }
  });
}