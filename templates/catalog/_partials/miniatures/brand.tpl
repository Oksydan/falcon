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
{block name='brand_miniature_item'}
  <li class="col-lg-3 col-sm-4 col-6 mb-3">
    <div class="card h-100">
      {$sizes = Image::getSize('home_default')}
      <img
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='{$sizes.width}' height='{$sizes.height}' viewBox='0 0 1 1'%3E%3C/svg%3E"
        data-src="{$brand.image|replace:'small_default':'home_default'}"
        alt="{$brand.name}"
        loading="lazy"
        class="card-img-top lazyload"
        width="{$sizes.width}"
        height="{$sizes.height}"
        >
      <div class="card-body">
        <p class="h6 mb-0">
          <a class="text-reset stretched-link" href="{$brand.url}">{$brand.name}</a>
        </p>
      </div>
      <div class="card-footer text-center">
        <span class="btn btn-link p-0">{$brand.nb_products}</span>
      </div>
    </div>
  </li>
{/block}
