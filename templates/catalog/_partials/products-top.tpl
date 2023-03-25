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
<div id="js-product-list-top" class="row products-selection align-items-center mb-4 mt-n2">
  <div class="col-auto mt-2">
    {block name='sort_by'}
      {include file='catalog/_partials/sort-orders.tpl' sort_orders=$listing.sort_orders}
    {/block}
  </div>

  <div class="col-auto mt-2">
    {block name='sort_by'}
      {include file='catalog/_partials/per-page.tpl'}
    {/block}
  </div>

  <div class="col-sm-auto col-12 mt-2 d-md-none ml-auto">
    {if !empty($listing.rendered_facets)}
      <button data-target="#mobile_filters" data-toggle="modal" class="btn btn-secondary d-sm-inline-block d-none">
        {l s='Filter' d='Shop.Theme.Actions'}
      </button>
      <button data-target="#mobile_filters" data-toggle="modal" class="btn btn-secondary btn-block d-sm-none">
        {l s='Filter' d='Shop.Theme.Actions'}
      </button>
    {/if}
  </div>

  <div class="col-auto d-none d-lg-block ml-auto mt-2">
    <ul class="display-toggle d-flex align-items-center mx-n1 m-0">
      <li class="display-toggle__elem px-1">
        <a href="#" data-toggle-listing data-display-type="grid" class="display-toggle__link d-inline-block {if $listingDisplayType == 'grid'}active{/if}">
          <span class="material-icons display-toggle__icon">view_module</span>
        </a>
      </li>
      <li class="display-toggle__elem px-1">
        <a href="#" data-toggle-listing data-display-type="list" class="display-toggle__link d-inline-block {if $listingDisplayType == 'list'}active{/if}">
          <span class="material-icons display-toggle__icon">view_list</span>
        </a>
      </li>
    </ul>
  </div>
</div>
