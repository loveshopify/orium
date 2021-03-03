import $ from 'jquery';

const customerAddresses = function() {
  var $newAddressForm = $('#AddressNewForm');

  if (!$newAddressForm.length) {
    return;
  }

  // Initialize observers on address selectors, defined in shopify_common.js
  if (Shopify) {
    new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
      hideElement: 'AddressProvinceContainerNew'
    });
  }

  // Initialize each edit form's country/province selector
  $('.address-country-option').each(function() {
    var formId = $(this).data('form-id');
    var countrySelector = 'AddressCountry_' + formId;
    var provinceSelector = 'AddressProvince_' + formId;
    var containerSelector = 'AddressProvinceContainer_' + formId;

    new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
      hideElement: containerSelector
    });
  });

  // Toggle new/edit address forms
  var flag = false;
  $('.address-new-toggle').on('click', function() {
    $newAddressForm.toggleClass('hide');
    $('.address-new-toggle.top').toggleClass('hide');
    $(".return_account").toggleClass('hide');
    var title;
    if(flag == false){
      flag = true;
      title = 'Add a New Address';
    }
    else {
      flag = false;
      title = 'Addresses';
    }
    $("[data-title-address]").text(title);
  });

  $('.address-edit-toggle').on('click', function() {
    var formId = $(this).data('form-id');
    $('#EditAddress_' + formId).toggleClass('hide');
    $(".current_address").toggleClass('hide');
  });

  var formId;
  $('.address-delete').on('click', function() {
    var $el = $(this);
    formId = $el.data('form-id');
    // var confirmMessage = $el.data('confirm-message');
    // if (confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {
    //   Shopify.postLink('/account/addresses/' + formId, {parameters: {_method: 'delete'}});
    // }
  });

  $("[data-remove-address]").on('click', function(){
    Shopify.postLink('/account/addresses/' + formId, {parameters: {_method: 'delete'}});
  })

};

export default customerAddresses