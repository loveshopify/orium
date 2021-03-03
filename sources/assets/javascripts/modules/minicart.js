import $ from 'jquery';
import CartJS from '/vendor/cart.min.js';
import tinybind from 'tinybind';
import { formatMoney } from '/tools/moneyFormats';
import PerfectScrollbar from 'perfect-scrollbar';

const $variantsSelector = $('[data-all-variants]');
let data = {
  cart: {},
  update(newCart) {
    this.cart = newCart
  },
  setRedirect(e) {
    e.preventDefault();
    goToCheckout();
  }
};
let open = false;
const $minicart = $('[data-minicart]');
const scrollBar = new PerfectScrollbar('.minicart__items');


const addToCart = function(id, qty, properties) {
  let data = {
    "quantity": qty,
    "id": id,
    "properties": {}
  }
  if (properties['shipping_interval_frequency'] && properties['shipping_interval_unit_type'] && properties['subscription_id']) {
    data["properties"]["shipping_interval_frequency"] = properties['shipping_interval_frequency'];
    data["properties"]["shipping_interval_unit_type"] = properties['shipping_interval_unit_type'];
    data["properties"]["subscription_id"] = properties['subscription_id'];
  }
  console.log(data);

  $.ajax({
    type: 'POST',
    url: '/cart/add.js',
    data: data,
    dataType: 'json',
    success: function () {
      open = true;
      updateMinicart();
    },
    error: function () {
      console.error("Can't add item to cart")
    }
  });
}

const getProperties = function($productForm ) {
  let properties = []
  $productForm.find('[data-product-property]').each(function (index, element) {
    let key = $(element).data('product-property');
    let value = $(element).val();
    if (key && key != 'hidden' && value) {
      properties[key] = value;
    }
  });
  return properties;
}

const addToCartHandler = function ($productForm) {
  console.log($productForm);
  const $variantSelected = $('option:selected', $productForm.find('[data-all-variants]'));
  let variantId = $variantSelected.val();
  if ($variantSelected.data('discount-variant-id') != '') {
    variantId = $variantSelected.data('discount-variant-id');
  }
  const qty = $productForm .find('[data-qty]').val() || 1;
  let properties = getProperties($productForm);
  console.log(variantId);
  if (variantId) {
    addToCart(variantId, qty, properties);
  } else if ($productForm.find('[data-all-variants] option:selected').data('multi-variants')) {
    let $variants = $productForm.find('[data-all-variants] option:selected').data('multi-variants');
    $variants.forEach(function(id) {
      console.log(id);
      addToCart(id, qty, properties);
    });
  } else {
    console.error("minicart.js: can't add item to cart, wrong variantId", variantId);
  }
}


const removeFromCart = function () {
  if ($(this).data('line') != undefined) {
    let id = $(this).data('line');
    if (id != undefined) {
      console.log("remove", id);
      CartJS.removeItem(id + 1);
    } else {
      console.error("Can't remove item", id, " from the cart!");
    }
  } else {
    console.error("Can't remove item to the cart since data-line is not present in the remove-from-cart button!");
  }
}

function reChargeProcessCart() {
  let token = '';
	function get_cookie(name){ return( document.cookie.match('(^|; )'+name+'=([^;]*)')||0 )[2] }
	do {
      		token=get_cookie('cart');
	}
	while(token == undefined);

	try { var ga_linker = ga.getAll()[0].get('linkerParam') } catch(err) { var ga_linker ='' }
	var customer_param = '{% if customer %}customer_id={{customer.id}}&customer_email={{customer.email}}{% endif %}'
	document.location.href = "https://checkout.rechargeapps.com/r/checkout?myshopify_domain="+myshopify_domain+"&cart_token="+token+"&"+ga_linker+"&"+customer_param;
}

const goToCheckout = function() {
  let hasSubscription = false;
  for(let i = 0; i < data.cart.items.length; i++) {
    let item = data.cart.items[i];
    if(item.product_title.includes('Auto renew')) {
      hasSubscription = true;
    }
  }

  if(hasSubscription) {
    reChargeProcessCart();
  } else {
    document.location.href = "/checkout";
  }
}


const updateMinicart = function() {
  $.get('/cart.json', function(result) {    
    let newCart = result;
    $.get('/cart?view=json', function(result) {      
      let response = result.replace(/<\/?[^>]+>/gi, '');
      const newCartWithOriginHandle = JSON.parse(response);
      console.log(newCart);
      console.log(newCartWithOriginHandle);
      for(let i=0; i < newCart.items.length; i++) {
        newCart.items[i].original_handle = newCartWithOriginHandle.items[i].original_handle
      }
      data.update(newCart);    
      updateCartCount();
      if (open) {
        $minicart.addClass('is-open');
        $("body").addClass('no-scroll');
        open = false;
      }
    }).fail(function() {
      console.error('minicart.js: updateMinicart error')
    })
    
  }).fail(function() {
    console.error('minicart.js: updateMinicart error')
  })
}

const updateCartCount = function() {
  let cartCount = '[data-cart-count]';
  $(cartCount).text(data.cart.item_count);
}

const updateFreeShippingBar = function() {
  const elgiblePrice = 8000
  if(data.cart.total_price >= elgiblePrice) {
    $('[data-free-shipping-label]').html('Congrats! You get free standard shipping.');
    $('[data-free-shipping-percent]').css('width', '100%');
  } else {
    const remainingPrice = parseInt((elgiblePrice - data.cart.total_price));
    const percent = parseInt(data.cart.total_price * 100 / elgiblePrice);
    $('[data-free-shipping-label]').html('You are ' + formatMoney(remainingPrice) + ' case away from free shipping!');
    $('[data-free-shipping-percent]').css('width', percent + '%');
  }
}

const eventHandlers = function() {
  $(document).on('click','[data-add-to-cart]', function(e) {
    e.preventDefault();
    $('[data-popup]').addClass('is-hidden');
    addToCartHandler($(this).closest('[data-product-form]'));
  });

  $(document).on('click', '[data-remove-from-cart]', removeFromCart);

  $('[data-minicart-toggle]').on('click', function(e) {
    e.preventDefault();
    $minicart.toggleClass('is-open');
  });



  $(document).on('cart.requestComplete', function (event, cart) {
    updateMinicart();

  });
  $(document).ready(function() {
    updateMinicart();
  });
}

const init = function() {
  if (tinybind) {
    tinybind.formatters.formatMoney = formatMoney;
    tinybind.formatters.isDefaultTitle = function (title) {
      if (title.toLowerCase() == "default title") return true;
      return false;
    };
    tinybind.formatters.append = function(value, append) {
      return value+append;
    }
    tinybind.formatters.convert = function(value, append) {
      if (append) {
        return '/products/'+append;
      }
      return value
    }
    tinybind.bind($minicart, data);
  } else {
    console.error("minicart.js: Tinybind template library is not connected");
    return false;
  }

  if(localStorage.getItem('opened_side_cart') == 'true' && window.location.pathname == '/' ) {
    console.log('here2');
    $('[data-minicart]').addClass('is-open');
    localStorage.setItem('opened_side_cart', false);
  }
  
}

export default function() {
  init();
  eventHandlers();
}
