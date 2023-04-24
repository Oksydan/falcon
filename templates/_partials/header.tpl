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
{block name='header_banner'}
    <div class="header-banner">
        {hook h='displayBanner'}
    </div>
{/block}

{block name='header_nav'}
    <nav class="header-nav border-bottom bg-light py-1 d-none d-md-block">
        <div class="container">
            <div class="row align-items-center">
                {hook h='displayNav1'}
                {hook h='displayNav2'}
            </div>
        </div>
    </nav>
{/block}

{block name='header_top'}
    <div class="js-header-top-wrapper">

        <div class="header-top js-header-top">
            <div class="header-top__content pt-md-3 pb-md-0 py-2">

                <div class="container">

                    <div class="row header-top__row">

                        <div class="col flex-grow-0 header-top__block header-top__block--menu-toggle d-block d-md-none">
                            <a
                                    class="header-top__link"
                                    rel="nofollow"
                                    href="#"
                                    data-toggle="modal"
                                    data-target="#mobile_top_menu_wrapper"
                            >
                                <div class="header-top__icon-container">
                                    <span class="header-top__icon material-icons">menu</span>
                                </div>
                            </a>
                        </div>

                        <div class="col-md-4 col header-top__block header-top__block--logo">
                            <a href="{$urls.pages.index}">
                                {images_block webpEnabled=$webpEnabled}
                                    <img
                                            {if !empty($shop.logo_details)}
                                                src="{$shop.logo_details.src}"
                                                width="{$shop.logo_details.width}"
                                                height="{$shop.logo_details.height}"
                                            {else}
                                                src="{$shop.logo}"
                                            {/if}
                                            class="logo img-fluid"
                                            alt="{$shop.name} {l s='logo' d='Shop.Theme.Global'}">
                                {/images_block}
                            </a>
                        </div>

                        {hook h='displayTop'}
                    </div>

                </div>
            </div>
        </div>
    </div>
    {hook h='displayNavFullWidth'}
{/block}
