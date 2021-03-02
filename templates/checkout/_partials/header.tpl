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
{block name='header'}
  {block name='header_nav'}
    <nav class="header-nav">
      <div class="container">
        <div class="row">
          <div class="col-md-6 hidden-sm-down" id="_desktop_logo">
            <a href="{$urls.base_url}">
              <img class="logo img-fluid" src="{$urls.img_ps_url}{$shop.logo}" alt="{$shop.name} {l s='logo' d='Shop.Theme.Global'}" loading="lazy">
            </a>
          </div>
          <div class="col-md-6 text-xs-right hidden-sm-down">
            {hook h='displayNav1'}
          </div>
          <div class="hidden-md-up text-sm-center mobile">
            {hook h='displayNav2'}
            <div class="float-left" id="menu-icon">
              MENU
            </div>
            <div class="float-right" id="_mobile_cart"></div>
            <div class="float-right" id="_mobile_user_info"></div>
            <div class="top-logo" id="_mobile_logo"></div>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </nav>
  {/block}

  {block name='header_top'}
    <div class="header-top hidden-md-up">
      <div class="container">
         <div class="row">
          <div class="col-sm-12">
            <div class="row">
              {hook h='displayTop'}
              <div class="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {hook h='displayNavFullWidth'}
  {/block}
{/block}
