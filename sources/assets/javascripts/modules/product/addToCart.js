import $ from 'jquery';

const addItemToCart = function (variant_id, quantity, shipping_interval_frequency, shipping_interval_unit_type, subscription_id) {
  console.log('addItemToCart', variant_id, quantity, shipping_interval_frequency, shipping_interval_unit_type, subscription_id);
  let data = {
    "quantity": quantity,
    "id": variant_id,
    "properties": {}
  }
  if (shipping_interval_frequency && shipping_interval_unit_type && subscription_id) {
    data["properties"]["shipping_interval_frequency"] = shipping_interval_frequency;
    data["properties"]["shipping_interval_unit_type"] = shipping_interval_unit_type;
    data["properties"]["subscription_id"] = subscription_id;
  }
  console.log(data);

  $.ajax({
    type: 'POST',
    url: '/cart/add.js',
    data: data,
    dataType: 'json',
    success: function () {
      let url = '/cart';
      window.location.href = url;
    },
    error: function () {
      console.error("Can't add item to cart")
    }
  });
}

export default function() {
  $('[data-add-to-cart]').click(function (e) {
    e.preventDefault();
    const selectedProduct = $('[data-variant-select] option:selected');
    const variantId = $(selectedProduct).data('variant-id');
    const quantity = $('[data-qty]').val();
    addItemToCart(variantId, quantity);
    return false;
  })
}