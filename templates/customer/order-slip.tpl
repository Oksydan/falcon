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
  {l s='Credit slips' d='Shop.Theme.Customeraccount'}
{/block}

{block name='page_content'}
  <h6>{l s='Credit slips you have received after canceled orders.' d='Shop.Theme.Customeraccount'}</h6>
  {if $credit_slips}
    <table class="table table-striped table-bordered hidden-sm-down">
      <thead class="thead-default">
        <tr>
          <th>{l s='Order' d='Shop.Theme.Customeraccount'}</th>
          <th>{l s='Credit slip' d='Shop.Theme.Customeraccount'}</th>
          <th>{l s='Date issued' d='Shop.Theme.Customeraccount'}</th>
          <th>{l s='View credit slip' d='Shop.Theme.Customeraccount'}</th>
        </tr>
      </thead>
      <tbody>
        {foreach from=$credit_slips item=slip}
          <tr>
            <td class="align-middle"><a href="{$slip.order_url_details}" data-link-action="view-order-details">{$slip.order_reference}</a></td>
            <td class="align-middle" scope="row">{$slip.credit_slip_number}</td>
            <td class="align-middle">{$slip.credit_slip_date}</td>
            <td class="align-middle text-sm-center">
              <a href="{$slip.url}" class="btn btn-primary btn-sm">
                <span class="material-icons btn-icon ml-1">file_download</span>
                {l s='Download' d='Shop.Theme.Catalog'}
              </a>
            </td>
          </tr>
        {/foreach}
      </tbody>
    </table>
    <div class="credit-slips hidden-md-up">
      {foreach from=$credit_slips item=slip}
        <div class="card mb-5">
          <div class="card-header">
            <p class="card-title h5 mb-0">
              {l s='Credit slip' d='Shop.Theme.Customeraccount'} - {$slip.credit_slip_number}
            </p>
          </div>
          <div class="card-body">
            <ul class="mb-0 row">
              <li class="col-sm-6 mb-2">
                <strong>{l s='Order' d='Shop.Theme.Customeraccount'}:</strong>
                <a href="{$slip.order_url_details}" data-link-action="view-order-details">{$slip.order_reference}</a>
              </li>
              <li class="col-sm-6 mb-2">
                <strong>{l s='Date issued' d='Shop.Theme.Customeraccount'}:</strong>
                {$slip.credit_slip_date}
              </li>
            </ul>
          </div>
          <div class="card-footer">
            <a href="{$slip.url}" class="btn btn-primary btn-sm btn-block">
              <span class="material-icons btn-icon ml-1">file_download</span>
              {l s='View credit slip' d='Shop.Theme.Customeraccount'}
            </a>
          </div>
        </div>
      {/foreach}
    </div>
  {/if}
{/block}
