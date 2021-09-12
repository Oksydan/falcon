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
{extends file='customer/page.tpl'}

{block name='page_title'}
  {l s='Order history' d='Shop.Theme.Customeraccount'}
{/block}

{block name='page_content'}
  <h6>{l s='Here are the orders you\'ve placed since your account was created.' d='Shop.Theme.Customeraccount'}</h6>

  {if $orders}
    <table class="table table-striped table-bordered table-labeled hidden-sm-down">
      <thead class="thead-default">
        <tr>
          <th>{l s='Order reference' d='Shop.Theme.Checkout'}</th>
          <th>{l s='Date' d='Shop.Theme.Checkout'}</th>
          <th>{l s='Total price' d='Shop.Theme.Checkout'}</th>
          <th class="hidden-md-down">{l s='Payment' d='Shop.Theme.Checkout'}</th>
          <th class="hidden-md-down">{l s='Status' d='Shop.Theme.Checkout'}</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {foreach from=$orders item=order}
          <tr>
            <th scope="row">{$order.details.reference}</th>
            <td>
              <span class="text-nowrap">
                {$order.details.order_date}
              </span>
            </td>
            <td class="text-xs-right">
              <span class="price text-lowercase">
                {$order.totals.total.value}
              </span>
            </td>
            <td class="hidden-md-down">{$order.details.payment}</td>
            <td>
              <span
                class="label label-pill badge {$order.history.current.contrast}"
                style="background-color:{$order.history.current.color}"
              >
                {$order.history.current.ostate_name}
              </span>
            </td>
            <td class="text-sm-center order-actions">
              <a href="{$order.details.details_url}" data-link-action="view-order-details">
                {l s='Details' d='Shop.Theme.Customeraccount'}
              </a>
              {if $order.details.reorder_url}
                <a href="{$order.details.reorder_url}">{l s='Reorder' d='Shop.Theme.Actions'}</a>
              {/if}
            </td>
          </tr>
        {/foreach}
      </tbody>
    </table>

    <div class="orders d-md-none">
      {foreach from=$orders item=order}
        <div class="card mb-5">
          <div class="card-header">
            <h5 class="mb-0">{l s='Order reference' d='Shop.Theme.Checkout'}: {$order.details.reference}</h5>
          </div>
          <div class="card-body font-sm">
            <ul class="mb-0 row">
              <div class="col-sm-6 mb-2">
                <strong>{l s='Date' d='Shop.Theme.Checkout'}:</strong> {$order.details.order_date}
              </div>
              <div class="col-sm-6 mb-2">
                <strong>{l s='Total price' d='Shop.Theme.Checkout'}:</strong> {$order.totals.total.value}
              </div>
              <div class="col-sm-6 mb-2">
                <strong>{l s='Status' d='Shop.Theme.Checkout'}:</strong> {$order.history.current.ostate_name}
              </div>
            </ul>
          </div>
          <div class="card-footer">
            <div class="row mt-n2">
              <div class="col-sm-6 mt-2">
                <a class="btn btn-primary btn-block btn-sm" href="{$order.details.details_url}" data-link-action="view-order-details">
                  {l s='Details' d='Shop.Theme.Customeraccount'}
                </a>
              </div>
              {if $order.details.reorder_url}
                <div class="col-sm-6 mt-2">
                  <a class="btn btn-light btn-block btn-sm" href="{$order.details.reorder_url}" data-link-action="view-order-details">
                    {l s='Reorder' d='Shop.Theme.Actions'}
                  </a>
                </div>
              {/if}
            </div>
          </div>
        </div>
      {/foreach}
    </div>

  {/if}
{/block}
