import $ from 'jquery';
import CartJS from '../vendor/cart.min.js';
const qty = function() {
  $(document).on('click', '[data-qty-btn]', function (e) { 
    e.preventDefault();
    const [ operation, element ] = $(this).data('qty-btn').split(', ');
    updateQty(operation, element, e);
  });
}


const updateQty = function (operation, element, event) {
  const id = event.currentTarget.dataset.id;
  const _input = document.querySelector('#qty-id-' + id);
  const _error = document.querySelector('#qty-id-error-' + id);
  const _errors = document.querySelectorAll('[data-qty-error]');
  const resetErrors = function() {
    _errors.forEach(function(err) {
      err.classList.add('hide');
      err.innerHTML = '';
    })
  }
  if (_input.value == 1 && operation == 'decr') return false

  if (element == 'cart') {
    const line = _input.dataset.line;
    const _btn = event.currentTarget;
    let qty = _input.value*1;
    _btn.disabled = true;
    resetErrors();
    switch (operation) {
      case 'incr':
        qty++;
        CartJS.updateItem(line, qty, {}, {
          "success": function (data, textStatus, jqXHR) {
            _input.value = qty;
            _btn.disabled = false;
          },
          "error": function (jqXHR, textStatus, errorThrown) {
            console.error("cart add error:", jqXHR, textStatus, errorThrown);
            _error.classList.remove('hide');
            _error.innerHTML = "Sorry, we only have "+qty+" in stock";
            _btn.disabled = false;
          }
        });
        break;
      case 'decr':
        qty--;
        CartJS.updateItem(line, qty, {}, {
          "success": function (data, textStatus, jqXHR) {
            _input.value = qty;
            _btn.disabled = false;
          },
          "error": function (jqXHR, textStatus, errorThrown) {
            console.error("cart update error:", jqXHR, textStatus, errorThrown);
            _btn.disabled = false;
          }
        });
        break;
      default:
        // statements_def
        break;
    }
  }
  if (element == 'product') {
    switch (operation) {
      case 'incr':
        _input.value++
        break;
      case 'decr':
        _input.value--
        break;
      default:
        // statements_def
        break;
    }
  }
  $(_input).trigger('change');
}

export default qty;