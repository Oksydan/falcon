/**
 * 2007-2017 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2017 PrestaShop SA
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
import $ from 'jquery';

export default class Form {
  static init() {
    Form.parentFocus();
    Form.togglePasswordVisibility();
    Form.formValidation();
  }

  static parentFocus() {
    $('.js-child-focus').on('focus', ({target}) => {
      $(target).closest('.js-parent-focus').addClass('focus');
    });
    $('.js-child-focus').on('focusout', ({target}) => {
      $(target).closest('.js-parent-focus').removeClass('focus');
    });
  }

  static togglePasswordVisibility() {
    $('[data-action="show-password"]').on('click', (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();

      const $btn = $(e.currentTarget);
      const $input = $btn
        .closest('.input-group')
        .children('input.js-visible-password');

      if ($input.attr('type') === 'password') {
        $input.attr('type', 'text');
        $btn.html($btn.data('text-hide'));
      } else {
        $input.attr('type', 'password');
        $btn.html($btn.data('textShow'));
      }
    });
  }

  static formValidation() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.getElementsByClassName('needs-validation');

    if (forms.length > 0) {
      if (!supportedValidity()) {
        return;
      }
      // Loop over them and prevent submission
      let divToScroll = false;

      Array.prototype.filter.call(forms, (form) => {
        form.addEventListener(
          'submit',
          (event) => {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
              $('input:invalid,select:invalid,textarea:invalid', form).each((index, field) => {
                const $field = $(field);
                const $parent = $field.closest('.form-group');

                $('.js-invalid-feedback-browser', $parent).text(
                  $field[0].validationMessage,
                );
                if (!divToScroll) {
                  divToScroll = $parent;
                }
              },
              );

              const $form = $(form);
              $form.data('disabled', false);
              $form.find('[type="submit"]').removeClass('disabled');
            }
            form.classList.add('was-validated');
            if (divToScroll) {
              $('html, body').animate(
                {scrollTop: divToScroll.offset().top},
                300,
              );
              divToScroll = false;
            }
          },
          false,
        );
      });
    }
  }
}

const supportedValidity = () => {
  const input = document.createElement('input');

  return (
    'validity' in input
    && 'badInput' in input.validity
    && 'patternMismatch' in input.validity
    && 'rangeOverflow' in input.validity
    && 'rangeUnderflow' in input.validity
    && 'tooLong' in input.validity
    && 'tooShort' in input.validity
    && 'typeMismatch' in input.validity
    && 'valid' in input.validity
    && 'valueMissing' in input.validity
  );
};
