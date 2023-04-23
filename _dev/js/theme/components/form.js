import $ from 'jquery';

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

export default class Form {
  static init() {
    Form.parentFocus();
    Form.togglePasswordVisibility();
    Form.formValidation();
  }

  static parentFocus() {
    $('.js-child-focus').on('focus', ({ target }) => {
      $(target).closest('.js-parent-focus').addClass('focus');
    });
    $('.js-child-focus').on('focusout', ({ target }) => {
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

      $('input, textarea', forms).on('blur', (e) => {
        const $field = $(e.currentTarget);
        $field.val($field.val().trim());
      });

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
              });

              const $form = $(form);
              $form.data('disabled', false);
              $form.find('[type="submit"]').removeClass('disabled');
            }
            form.classList.add('was-validated');
            if (divToScroll) {
              $('html, body').animate(
                { scrollTop: divToScroll.offset().top },
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
