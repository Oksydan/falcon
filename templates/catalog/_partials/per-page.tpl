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
 {$defaultPerPage = Configuration::get('PS_PRODUCTS_PER_PAGE')}
 {$currentPerPage = $smarty.get.resultsPerPage|default:$defaultPerPage}


{if $listing.pagination.total_items > $defaultPerPage}
  {$currentPage = $listing.pagination.current_page}
  {$currentUrl = $listing.current_url}
  {$currentUrlFormatted = $currentUrl|replace:"page=`$currentPage`":"page=1"} {* RESET PAGE IS REQUIRED *}
  {$otherParamsExists = !!strpos($currentUrl, '?')}

  {$productPerPageArray = [
      $defaultPerPage,
      $defaultPerPage * 2,
      $defaultPerPage * 4
  ]}

  <select data-action="search-select" class="custom-select">
    {foreach $productPerPageArray as $perPage}
      <option
        {if $currentPerPage == $perPage}selected{/if}
        {if $smarty.get.resultsPerPage|default:0}
          data-href="{$currentUrlFormatted|replace:"resultsPerPage=`$currentPerPage`":"resultsPerPage=`$perPage`"}"
        {else}
          data-href="{$currentUrlFormatted}{if $otherParamsExists}&{else}?{/if}resultsPerPage={$perPage}"
        {/if}>
         {l s='Per page:' d='Shop.Theme.Catalog'} {$perPage}
      </option>
    {/foreach}
  </select>

{/if}
