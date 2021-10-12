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
{block name='address_selector_blocks'}
  {foreach $addresses as $address}
    <article
      class="js-address-item address-item col-12 col-md-6 mb-3 checkout-option-block address-selector-block {if $address.id == $selected} selected{/if}"
      id="{$name|classname}-address-{$address.id}">
      <input type="radio" name="{$name}" value="{$address.id}" id="r-{$name|classname}-address-{$address.id}"
        class="custom-control-input" {if $address.id == $selected}checked{/if}>
      <label for="r-{$name|classname}-address-{$address.id}" class="card mb-0 cursor-pointer h-100">
        <div class="address__header card-header h5">
          {$address.alias}
        </div>
        <div class="card-body address__body">
          {$address.formatted nofilter}
        </div>
        {if $interactive}
          <div class="address__footer card-footer small">

            <a class="edit-address d-flex justify-content-center align-items-center" data-link-action="edit-address"
              href="{url entity='order' params=['id_address' => $address.id, 'editAddress' => $type, 'token' => $token]}">
              <i class="material-icons edit mr-1 font-reset">&#xE254;</i>{l s='Edit' d='Shop.Theme.Actions'}
            </a>
            <a class="delete-address d-flex justify-content-center align-items-center" data-link-action="delete-address"
              href="{url entity='order' params=['id_address' => $address.id, 'deleteAddress' => true, 'token' => $token]}">
              <i class="material-icons delete mr-1 font-reset">&#xE872;</i>{l s='Delete' d='Shop.Theme.Actions'}
            </a>
          </div>

        {/if}

      </label>
    </article>
  {/foreach}
  {if $interactive}
    <p>
      <button class="ps-hidden-by-js form-control-submit center-block"
        type="submit">{l s='Save' d='Shop.Theme.Actions'}</button>
    </p>
  {/if}
{/block}
