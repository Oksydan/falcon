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
  {l s='Forgot your password?' d='Shop.Theme.Customeraccount'}
{/block}

{block name='page_content'}
  <form action="{$urls.pages.password}" class="forgotten-password card user-form user-form--sm" method="post">

  <div class="card-body">
    {if $errors}
      <div class="alert alert-danger">
        {foreach $errors as $error}
          {$error}<br>
        {/foreach}
      </div>
    {/if}

    <header>
      <p class="send-renew-password-link">{l s='Please enter the email address you used to register. You will receive a temporary link to reset your password.' d='Shop.Theme.Customeraccount'}</p>
    </header>

    <section class="form-fields">
      <div class="form-group">
        <label class="form-control-label required">{l s='Email address' d='Shop.Forms.Labels'}</label>
        <input type="email" name="email" id="email" value="{if isset($smarty.post.email)}{$smarty.post.email|stripslashes}{/if}" class="form-control" required>

        <div class="text-center mt-3">
          <button class="form-control-submit btn btn-primary d-none d-md-inline-block" name="submit" type="submit">
            {l s='Send reset link' d='Shop.Theme.Actions'}
          </button>
          <button class="form-control-submit btn btn-primary btn-block d-block d-md-none" name="submit" type="submit">
            {l s='Send reset link' d='Shop.Theme.Actions'}
          </button>
        </div>

      </div>
    </section>
  </div>


  <div class="card-footer text-center">
    <a href="{$urls.pages.my_account}" class="account-link">
      <span>{l s='Back to login' d='Shop.Theme.Actions'}</span>
    </a>
  </div>

  </form>
{/block}

{block name='page_footer'}
{/block}
