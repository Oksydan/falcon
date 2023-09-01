import $ from 'jquery';
import prestashop from 'prestashop';

export function psShowHide() {
  $('.ps-shown-by-js').show();
  $('.ps-hidden-by-js').hide();
}

/**
 * This function returns the value of the requested parameter from the URL
 * @param {string} paramName - the name of the requested parameter
 * @returns {string|null|object}
 */
export function psGetRequestParameter(paramName) {
  const vars = {};
  window.location.href.replace(window.location.hash, '').replace(/[?&]+([^=&]+)=?([^&]*)?/gi, (m, key, value) => {
    vars[key] = value !== undefined ? value : '';
  });
  if (paramName !== undefined) {
    return vars[paramName] ? vars[paramName] : null;
  }

  return vars;
}

/**
 * Verify password score.
 * Estimate guesses needed to crack the password.
 */
prestashop.checkPasswordScore = async (password) => {
  const zxcvbn = (await import('zxcvbn')).default;

  return zxcvbn(password);
};
