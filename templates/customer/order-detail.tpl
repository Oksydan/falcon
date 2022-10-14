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
  {l s='Order details' d='Shop.Theme.Customeraccount'}
{/block}

{block name='page_content'}
  {block name='order_infos'}
    <div id="order-infos">
      <strong>
        {l
          s='Order Reference %reference% - placed on %date%'
          d='Shop.Theme.Customeraccount'
          sprintf=['%reference%' => $order.details.reference, '%date%' => $order.details.order_date]
        }
      </strong>

      <ul>
        {if $order.carrier.name}
          <li><strong>{l s='Carrier' d='Shop.Theme.Checkout'}</strong> {$order.carrier.name}</li>
        {/if}

        {if $order.details.invoice_url}
          <li>
            <a href="{$order.details.invoice_url}">
              {l s='Download your invoice as a PDF file.' d='Shop.Theme.Customeraccount'}
            </a>
          </li>
        {/if}

        {if $order.details.recyclable}
          <li>
            {l s='You have given permission to receive your order in recycled packaging.' d='Shop.Theme.Customeraccount'}
          </li>
        {/if}

        {if $order.details.gift_message}
          <li>{l s='You have requested gift wrapping for this order.' d='Shop.Theme.Customeraccount'}</li>
          <li>{l s='Message' d='Shop.Theme.Customeraccount'} {$order.details.gift_message nofilter}</li>
        {/if}
      </ul>

      {if $order.details.reorder_url}
        <div class="mt-2 text-right">
          <a href="{$order.details.reorder_url}" class="btn btn-outline-primary">{l s='Reorder' d='Shop.Theme.Actions'}</a>
        </div>
      {/if}

  {/block}

  {block name='order_history'}
    <section id="order-history" class="my-4">
      <div class="d-none d-md-block">
        <h3 class="h4">{l s='Follow your order\'s status step-by-step' d='Shop.Theme.Customeraccount'}</h3>
        <table class="table table-striped table-bordered hidden-xs-down">
          <thead class="thead-default">
            <tr>
              <th>{l s='Date' d='Shop.Theme.Global'}</th>
              <th>{l s='Status' d='Shop.Theme.Global'}</th>
            </tr>
          </thead>
          <tbody>
            {foreach from=$order.history item=state}
              <tr>
                <td>{$state.history_date}</td>
                <td>
                  <span
                    class="label label-pill badge {if Tools::getBrightness($state.color) < 128}text-white{/if}"
                    style="background-color:{$state.color}">
                    {$state.ostate_name}
                  </span>
                </td>
              </tr>
            {/foreach}
          </tbody>
        </table>
      </div>

      <div class="d-md-none">
        <div class="card">
          <div class="card-header">
            <h4 class="h5 card-title mb-0">
              {l s='Follow your order\'s status step-by-step' d='Shop.Theme.Customeraccount'}
            </h4>
          </div>
          <div class="card-body">
            <ul class="mb-0">
              {foreach from=$order.history item=state}
                <li class="mb-2">
                  <strong class="date">
                    {$state.history_date}:
                  </strong>
                  <strong style="color:{$state.color}">
                    {$state.ostate_name}
                  </strong>
                </li>
              {/foreach}
            </ul>
          </div>
        </div>
      </div>
    </section>
  {/block}

  {if $order.follow_up}
    <div class="mb-4">
      <p>{l s='Click the following link to track the delivery of your order' d='Shop.Theme.Customeraccount'}</p>
      <a href="{$order.follow_up}">{$order.follow_up}</a>
    </div>
  {/if}

  {block name='addresses'}
    <div class="row mt-4 mb-n2">
      {if $order.addresses.delivery}
        <div class="col-sm-6 col-12 mb-3">
          <article id="delivery-address" class="address card h-100">
            <p class="address__header card-header h5">{l s='Delivery address %alias%' d='Shop.Theme.Checkout' sprintf=['%alias%' => $order.addresses.delivery.alias]}</p>
            <div class="address__body card-body">
              <address>{$order.addresses.delivery.formatted nofilter}</address>
            </div>
          </article>
        </div>
      {/if}

      <div class="col-sm-6 col-12 mb-3">
        <article id="invoice-address" class="address card h-100">
          <p class="address__header card-header h5">{l s='Invoice address %alias%' d='Shop.Theme.Checkout' sprintf=['%alias%' => $order.addresses.invoice.alias]}</p>
          <div class="address__body card-body">
            <address>{$order.addresses.invoice.formatted nofilter}</address>
          </div>
        </article>
      </div>
    </div>
  {/block}

  {$HOOK_DISPLAYORDERDETAIL nofilter}

  {block name='order_detail'}
    {if $order.details.is_returnable && !$orderIsVirtual}
      {include file='customer/_partials/order-detail-return.tpl'}
    {else}
      {include file='customer/_partials/order-detail-no-return.tpl'}
    {/if}
  {/block}

  {block name='order_carriers'}
    {if $order.shipping}
      <div class="mb-4">
        <table class="table table-striped table-bordered hidden-sm-down">
          <thead class="thead-default">
            <tr>
              <th>{l s='Date' d='Shop.Theme.Global'}</th>
              <th>{l s='Carrier' d='Shop.Theme.Checkout'}</th>
              <th>{l s='Weight' d='Shop.Theme.Checkout'}</th>
              <th>{l s='Shipping cost' d='Shop.Theme.Checkout'}</th>
              <th>{l s='Tracking number' d='Shop.Theme.Checkout'}</th>
            </tr>
          </thead>
          <tbody>
            {foreach from=$order.shipping item=line}
              <tr>
                <td>{$line.shipping_date}</td>
                <td>{$line.carrier_name}</td>
                <td>{$line.shipping_weight}</td>
                <td>{$line.shipping_cost}</td>
                <td>{$line.tracking nofilter}</td>
              </tr>
            {/foreach}
          </tbody>
        </table>
        <div class="hidden-md-up shipping-lines">
          <div class="card">
            <div class="card-header">
              <h4 class="h5 mb-0 card-title">
                {l s='Shipping infromations' d='Shop.Theme.Customeraccount'}
              </h4>
            </div>
            <div class="card-body">
              {foreach from=$order.shipping item=line}
                <ul class="mb-0 row {if !$line@last} mb-2 border-bottom{/if}">
                  <li class="col-sm-6 mb-2">
                    <strong>{l s='Date' d='Shop.Theme.Global'}:</strong> {$line.shipping_date}
                  </li>
                  <li class="col-sm-6 mb-2">
                    <strong>{l s='Carrier' d='Shop.Theme.Checkout'}:</strong> {$line.carrier_name}
                  </li>
                  <li class="col-sm-6 mb-2">
                    <strong>{l s='Weight' d='Shop.Theme.Checkout'}:</strong> {$line.shipping_weight}
                  </li>
                  <li class="col-sm-6 mb-2">
                    <strong>{l s='Shipping cost' d='Shop.Theme.Checkout'}:</strong> {$line.shipping_cost}
                  </li>
                  <li class="col-sm-6 mb-2">
                    <strong>{l s='Tracking number' d='Shop.Theme.Checkout'}:</strong> {$line.tracking nofilter}
                  </li>
                </ul>
              {/foreach}
            </div>
          </div>
        </div>
      </div>
    {/if}
  {/block}

  {block name='order_messages'}
    {include file='customer/_partials/order-messages.tpl'}
  {/block}
{/block}
