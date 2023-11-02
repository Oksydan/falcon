{**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.md.
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
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 *}

{assign var='icon' value=$icon|default:'check_circle'}
{assign var='modal_message' value=$modal_message|default:''}


<script type="text/javascript">
  document.addEventListener("DOMContentLoaded", function() {
    const confirmModal = document.querySelector('#{$modal_id}');

    eventHandlerOn(confirmModal, 'hidden.bs.modal', () => {
      eventHandlerTrigger(confirmModal, 'modal:confirm', { confirm: false });
    });

    const confirmBtn = document.querySelector('#{$modal_id} .js-confirm-button');
    const refuseBtn = document.querySelector('#{$modal_id} .js-refuse-button');

    if (confirmBtn) {
      eventHandlerOn(confirmBtn, 'click', () => {
        eventHandlerTrigger(confirmModal, 'modal:confirm', { confirm: true });
        bootstrap.Modal.getOrCreateInstance(confirmModal).hide();
      });
    }

    if (refuseBtn) {
      eventHandlerOn(refuseBtn, 'click', () => {
        eventHandlerTrigger(confirmModal, 'modal:confirm', { confirm: false });
        bootstrap.Modal.getOrCreateInstance(confirmModal).hide();
      });
    }
  });
</script>

<div id="{$modal_id}" class="modal fade product-comment-modal" role="dialog" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title h5">
          {$modal_title}
        </h5>
      </div>
      <div class="modal-body">
        <div id="{$modal_id}-message">
          {$modal_message}
        </div>
      </div>
      <div class="modal-footer">
        <button type="button"
                class="btn btn-primary js-confirm-button d-block text-center w-100"
                aria-label="{l s='Yes' d='Modules.Productcomments.Shop'}">
          {l s='Yes' d='Modules.Productcomments.Shop'}
        </button>
        <button type="button"
                class="btn btn-text js-refuse-button d-block text-center w-100"
                aria-label="{l s='No' d='Modules.Productcomments.Shop'}">
          {l s='No' d='Modules.Productcomments.Shop'}
        </button>
      </div>
    </div>
  </div>
</div>
