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
{extends file='page.tpl'}

{block name='page_title'}
  {l s='Reset your password' d='Shop.Theme.Customeraccount'}
{/block}

{block name='page_content'}
  <form action="{$urls.pages.password}" method="post" class="card user-form user-form--sm">
    <section class="form-fields card-body">
      {if $errors}
        <div class="alert alert-error">
          {foreach $errors as $error}
            {$error}<br>
          {/foreach}
        </div>
      {/if}

      <p>
        {l
          s='Email address: %email%'
          d='Shop.Theme.Customeraccount'
          sprintf=['%email%' => $customer_email|stripslashes]}
      </p>

      <div class="form-group">
        <label class="form-control-label">{l s='New password' d='Shop.Forms.Labels'}</label>
        <input class="form-control" type="password" data-validate="isPasswd" name="passwd" value="">
      </div>

      <div class="form-group">
        <label class="form-control-label">{l s='Confirmation' d='Shop.Forms.Labels'}</label>
        <input class="form-control" type="password" data-validate="isPasswd" name="confirmation" value="">
      </div>

      <input type="hidden" name="token" id="token" value="{$customer_token}">
      <input type="hidden" name="id_customer" id="id_customer" value="{$id_customer}">
      <input type="hidden" name="reset_token" id="reset_token" value="{$reset_token}">

      <div class="text-center mt-3">
        <button class="btn btn-primary d-none d-md-inline-block" type="submit" name="submit">
          {l s='Change Password' d='Shop.Theme.Actions'}
        </button>
        <button class="btn btn-primary btn-block d-block d-md-none" type="submit" name="submit">
          {l s='Change Password' d='Shop.Theme.Actions'}
        </button>
      </div>

    </section>

    <div class="card-footer text-center">
      <a href="{$urls.pages.authentication}">{l s='Back to Login' d='Shop.Theme.Actions'}</a>
    </div>
  </form>
{/block}

{block name='page_footer'}
{/block}
