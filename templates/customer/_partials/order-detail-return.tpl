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
{block name='order_products_table'}

  <div class="card my-4">
    {include file="customer/_partials/product-table.tpl" products=$order.products}
  </div>

  <div class="row card-group no-gutters my-4">
    {block name='order_details'}
      <div class="col-sm-6 col-12 card  mb-sm-0 mb-4">
        <div class="card-header">
          <h3 class="h5 mb-0 card-title">{l s='Order details' d='Shop.Theme.Checkout'}</h3>
        </div>
        <div class="card-body">
          <ul class="m-0">
            <li class="cart-summary-line">
              <span>{l s='Carrier' d='Shop.Theme.Checkout'}: <strong>{$order.carrier.name}</strong></span>
            </li>
            <li class="cart-summary-line">
              <span>{l s='Payment method' d='Shop.Theme.Checkout'}: <strong>{$order.details.payment}</strong></span>
            </li>
          </ul>
        </div>
      </div>
    {/block}

    <div class="col-sm-6 col-12 card mb-0">
      <div class="card-header">
        <h3 class="h5 mb-0 card-title">{l s='Order subtotals' d='Shop.Istheme'}</h3>
      </div>

      <div class="card-body">
        {foreach $order.subtotals as $line}
          {if $line.value}
            <div class="cart-summary-line">
              <span class="label">{$line.label}</span>
              <span class="value">{if 'discount' == $line.type}-&nbsp;{/if}{$line.value}</span>
            </div>
          {/if}
        {/foreach}
        <div class="cart-summary-line cart-total">
          <span class="label">{$order.totals.total.label}</span>
          <div class="value">{$order.totals.total.value}</div>
        </div>
      </div>

    </div>
  </div>

  <div class="my-4">
    <h3 class="h4 mb-1">
      {l s='Merchandise returns' d='Shop.Theme.Customeraccount'}
    </h3>
    <p class="mb-4">
      {l s='If you wish to return one or more products, click on \'Request a return\' button' d='Shop.Theme.Customeraccount'}
    </p>

    <div class="text-center">
      <button class="btn btn-primary d-none d-md-inline-block" data-toggle="modal" data-target="#order-return-modal">
        {l s='Request a return' d='Shop.Theme.Customeraccount'}
      </button>
      <button class="btn btn-primary btn-block d-block d-md-none" data-toggle="modal" data-target="#order-return-modal">
        {l s='Request a return' d='Shop.Theme.Customeraccount'}
      </button>
    </div>
  </div>

  {include file="customer/_partials/order-details-return-modal.tpl" order=$order}
{/block}
