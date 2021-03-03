import $ from 'jquery';

const $quickViewPopup = $('[data-quick-view-popup]');

const initImageSlider = function($productMainDom) {  
  
  const $productSlider = $productMainDom.find('[data-ps]');
  
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

const initProductForm = function($productMainDom) {
  const defaultOption = $('[data-product-option]');
  $(defaultOption[0]).trigger('click');
}

export default function() {
  $(document).on('click', '[data-quick-view]', function(){
    const productHandle = $(this).data('quick-view');
    $quickViewPopup.find('.popup-window').html('');
    $quickViewPopup.removeClass('is-hidden');
    $.ajax({
      url: "/products/" + productHandle,
      type: 'GET',
      data: { 
        view: 'quickview'
      },
      success: function(res) {        
        let $resultDom = $(res); 
        console.log($resultDom.find('.product-main'));
        $quickViewPopup.find('.popup-window').html($resultDom.find('.product-main').html());
        setTimeout(() => {
          initImageSlider($quickViewPopup.find('.product-main__container'));    
          initProductForm($quickViewPopup.find('.product-main__container'));
        }, 100);            
      }
  });
  });  
}