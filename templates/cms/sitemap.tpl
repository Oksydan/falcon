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
  {l s='Sitemap' d='Shop.Theme.Global'}
{/block}

{block name='page_content_container'}
  <div class="row">
      <div class="col-lg-3 col-sm-6 col-12 mb-4">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title h5 mb-0">
              {$our_offers}
            </h2>
          </div>
          {include file='cms/_partials/sitemap-nested-list.tpl' links=$links.offers}
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 col-12 mb-4">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title h5 mb-0">
              {$categories}
            </h2>
          </div>
          {include file='cms/_partials/sitemap-nested-list.tpl' links=$links.categories}
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 col-12 mb-4">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title h5 mb-0">
              {$your_account}
            </h2>
          </div>
          {include file='cms/_partials/sitemap-nested-list.tpl' links=$links.user_account}
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 col-12 mb-4">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title h5 mb-0">
              {$pages}
            </h2>
          </div>
          {include file='cms/_partials/sitemap-nested-list.tpl' links=$links.pages}
        </div>
      </div>
  </div>
{/block}
