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
  {l s='Login and registration' d='Shop.Istheme'}
{/block}

{block name='page_content'}
  <div class="card user-form">
    <div class="row user-form__row">

      {block name='login_form_container'}
        <section class="col-md-6 col-12 user-form__block">
          <div class="user-form__content card-body h-100 bg-light d-flex flex-column">
            <h4 class="text-center h3 mb-3">
              {l s='Login' d='Shop.Istheme'}
            </h4>
            {render file='customer/_partials/login-form.tpl' ui=$login_form}
            {block name='display_after_login_form'}
              {hook h='displayCustomerLoginFormAfter'}
            {/block}
          </div>
        </section>

      {/block}

      <div class="user-form__block  col-md-6 col-12">
        <div class="user-form__content card-body h-100 d-flex flex-column">
          <h4 class="text-center h3 mb-3">
            {l s='Registration' d='Shop.Istheme'}
          </h4>

          <p class="mb-4 text-muted">
            {l s='Creating an account is simple, and thanks to this you will complete the order faster! Additionally, you have the option of tracking your order and viewing purchase history.' d='Shop.Istheme'}
          </p>

          <div class="mt-auto text-center">
            <a href="{$urls.pages.register}" class="btn btn-primary d-none d-md-inline-block">
              {l s='I want to create an account' d='Shop.Istheme'}
            </a>
            <a href="{$urls.pages.register}" class="btn btn-primary btn-block d-block d-md-none">
              {l s='I want to create an account' d='Shop.Istheme'}
            </a>
          </div>

        </div>
      </div>
    </div>
  </div>
{/block}
{block name='page_footer'}
{/block}
