import $ from 'jquery';

const login = function() {
  resetPassHandle();
}

const resetPassHandle = function () {
  const login = $('[data-login]');
  const forgot = $('[data-login-forgot]');
  const forgotLink = $('[data-forgot-link]');
  const loginLink = $('[data-login-link]');
  forgotLink.click(function (e) { 
    e.preventDefault();
    login.addClass('is-hidden').parent().css('height', 0);
    forgot.removeClass('is-hidden').parent().css('height', 'auto');
  });
  loginLink.click(function (e) { 
    e.preventDefault();
    login.removeClass('is-hidden').parent().css('height', 'auto');
    forgot.addClass('is-hidden').parent().css('height', 0);
  }).click();
}

export default login