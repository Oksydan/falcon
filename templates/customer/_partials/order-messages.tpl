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
{block name='order_messages_table'}
  {if $order.messages}
    <div class="box messages">
      <h3>{l s='Messages' d='Shop.Theme.Customeraccount'}</h3>
      {foreach from=$order.messages item=message}
        <div class="message row">
          <div class="col-sm-4">
            <strong>{$message.name}</strong><br/>
            <small>
              {$message.message_date}
            </small>
          </div>
          <div class="col-sm-8">
            {$message.message|escape:'html'|nl2br nofilter}
          </div>
        </div>
      {/foreach}
    </div>
  {/if}
{/block}

{block name='order_message_form'}
  <section class="order-message-form my-4">
    <form class="card" action="{$urls.pages.order_detail}" method="post">

      <header class="card-header">
        <h3 class="h4 card-title mb-0">{l s='Add a message' d='Shop.Theme.Customeraccount'}</h3>
      </header>

      <div class="card-body">
        <section class="form-fields">
          <p>{l s='If you would like to add a comment about your order, please write it in the field below.' d='Shop.Theme.Customeraccount'}</p>

          <div class="form-group">
            <label class="form-control-label">{l s='Product' d='Shop.Forms.Labels'}</label>
            <select name="id_product" class="custom-select" data-role="product">
              <option value="0">{l s='-- please choose --' d='Shop.Forms.Labels'}</option>
              {foreach from=$order.products item=product}
                <option value="{$product.id_product}">{$product.name}</option>
              {/foreach}
            </select>
          </div>

          <div class="form-group">
            <textarea rows="4" name="msgText" class="form-control" data-role="msg-text"></textarea>
          </div>

        </section>

        <footer class="form-footer text-center mt-3">
          <input type="hidden" name="id_order" value="{$order.details.id}">
          <button type="submit" name="submitMessage" class="btn btn-primary d-block btn-block d-md-none form-control-submit">
            {l s='Send' d='Shop.Theme.Actions'}
          </button>
          <button type="submit" name="submitMessage" class="btn btn-primary form-control-submit d-none d-md-inline-block">
            {l s='Send' d='Shop.Theme.Actions'}
          </button>
        </footer>
      </div>

    </form>
  </section>
{/block}
