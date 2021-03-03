import $ from 'jquery';
import CartJS from '../vendor/cart.min.js';
import { formatMoney } from '../tools/moneyFormats';
const $cartPage = $('[data-cart-page]');

export const updateView = () => {
  $.get("/cart?view=ajax",
    function (data, textStatus, jqXHR) {
      const tpl = $(data).find('[data-cart-page]').html();
      const count = $(data).find('[data-items-count]').data('items-count');
      $cartPage.html(tpl);
      $('[data-cart-count]').text(count);
    }
  );
}

const updateDiscounts = function(discounts) {
  discounts.forEach(discount => {
    $('[data-discount]').each(function (index, element) {
      if (discount.title == $(element).data('discount')) {
        let discountValue = formatMoney(discount.total_allocated_amount);
        $(element).text('-'+discountValue);
      }
    });
  });
}

const redirect = function() {
  const $checkoutBtn = $('[data-checkout-btn]'); 
  const $cartHookBtn = $('[data-checkout-btn]').next();
  if (localStorage.getItem('redirect_to_checkout') === 'true') {
    if (window.ReCharge && window.ReCharge.subscriptions) {
      console.log('redirect to recharge checkout');
      $checkoutBtn.click();
    } else if ($cartHookBtn.length) {
      console.log('redirect to carthook checkout');
      setInterval(() => {
        if (window.chScriptLoaded === true) {
          $cartHookBtn.click();
        }
      }, 500);
    } else {
      console.log('redirect to shopify checkout');
      $checkoutBtn.click();
    }
    localStorage.setItem('redirect_to_checkout', false);
  } else {
    // window.location.href = '/';
  }
}


export default function() {
  if ($cartPage.length) {
    redirect();

    $(document).on('cart.requestComplete', updateView);

    // Remove variant:
    $(document).on('click', '[data-cart-remove-item]', function (e) {
      e.preventDefault();
      const currentId = $(this).data('id');
      CartJS.removeItemById(currentId, {
        "error": function (jqXHR, textStatus, errorThrown) {
          console.error("cart delete item error:", jqXHR, textStatus, errorThrown);
        }
      })
    });

    // Update variant:
    $(document).on('change', '[data-variant-select]', function (e) { 
      const $row = $(this).closest('[data-cart-row]');
      const qty = $('[data-qty]', $row).val();
      const id = $(this).find('option:selected').data('variant-id');
      const currentId = $(this).data('current-id');
      let properties = $(this).data('properties'); 
      CartJS.addItem(id, qty, properties, {
        "success": function (data, textStatus, jqXHR) {
          CartJS.removeItemById(currentId, {
            "error": function (jqXHR, textStatus, errorThrown) {
              console.error("cart delete item after adding new item error:", jqXHR, textStatus, errorThrown);
            }
          })
        },
        "error": function (jqXHR, textStatus, errorThrown) {
          console.error("cart update error:", jqXHR, textStatus, errorThrown);
        }
      });
    });

    // Update recharge period
    $('[data-rc-period]').change(function (e) { 
      const $row = $(this).closest('[data-cart-row]');
      const qty = $('[data-qty]', $row).val();
      const line = $(this).data('line');
      const properties = {
        "shipping_interval_frequency": $(this).val(),
        "shipping_interval_unit_type": $(this).data('rc-period'),
        "subscription_id": $(this).data('subscription-id')
      }
      CartJS.updateItem(line, qty, properties, {
        "error": function (jqXHR, textStatus, errorThrown) {
          console.error("cart update error:", jqXHR, textStatus, errorThrown);
        }
      });
    });
  }


}



