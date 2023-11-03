{**
 * 2007-2020 PrestaShop and Contributors
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
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}

<div id="gdpr_consent" class="gdpr_module_{$psgdpr_id_module|escape:'htmlall':'UTF-8'} mb-3">
  <div class="form-check">
    <input
      id="psgdpr_consent_checkbox_{$psgdpr_id_module|escape:'htmlall':'UTF-8'}"
      name="psgdpr_consent_checkbox"
      type="checkbox"
      value="1"
      class="form-check-input psgdpr_consent_checkboxes_{$psgdpr_id_module|escape:'htmlall':'UTF-8'}"
    >
    <label class="form-check-label"
           for="psgdpr_consent_checkbox_{$psgdpr_id_module|escape:'htmlall':'UTF-8'}">
        {$psgdpr_consent_message nofilter}{* html data *}
    </label>
  </div>
</div>
{literal}
<script type="text/javascript">
    var psgdpr_front_controller = "{/literal}{$psgdpr_front_controller|escape:'htmlall':'UTF-8'}{literal}";
    psgdpr_front_controller = psgdpr_front_controller.replace(/\amp;/g,'');
    var psgdpr_id_customer = "{/literal}{$psgdpr_id_customer|escape:'htmlall':'UTF-8'}{literal}";
    var psgdpr_customer_token = "{/literal}{$psgdpr_customer_token|escape:'htmlall':'UTF-8'}{literal}";
    var psgdpr_id_guest = "{/literal}{$psgdpr_id_guest|escape:'htmlall':'UTF-8'}{literal}";
    var psgdpr_guest_token = "{/literal}{$psgdpr_guest_token|escape:'htmlall':'UTF-8'}{literal}";

    document.addEventListener('DOMContentLoaded', function() {
        const psgdpr_id_module = "{/literal}{$psgdpr_id_module|escape:'htmlall':'UTF-8'}{literal}";
        const parentForm = document.querySelector('.gdpr_module_' + psgdpr_id_module)?.closest('form');

        let toggleFormActive = function() {
          const checkboxElement = document.querySelector('.gdpr_module_' + psgdpr_id_module);

          // by default forms submit will be disabled, only will enable if agreement checkbox is checked
          if (checkboxElement?.checked) {
            checkboxElement.closest('form')?.querySelector('[type="submit"]')?.setAttribute('disabled', 'disabled');
          }

          eventHandlerOn(document, 'change', '.psgdpr_consent_checkboxes_' + psgdpr_id_module, (e) => {
            const checkbox = e.delegateTarget;

            if (checkbox?.checked) {
              checkbox.closest('form')?.querySelector('[type="submit"]')?.removeAttribute('disabled');
            } else {
              checkbox.closest('form')?.querySelector('[type="submit"]')?.setAttribute('disabled', 'disabled');
            }
          });
        }

        // Triggered on page loading
        toggleFormActive();

        if (parentForm) {
          eventHandlerOn(parentForm, 'submit', () => {
            const { request } = useHttpRequest(psgdpr_front_controller);

            request
              .query({
                ajax: true,
                action: 'AddLog',
                id_customer: psgdpr_id_customer,
                customer_token: psgdpr_customer_token,
                id_guest: psgdpr_id_guest,
                guest_token: psgdpr_guest_token,
                id_module: psgdpr_id_module,
              })
              .post()
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
          });
        }

    });
</script>
{/literal}
