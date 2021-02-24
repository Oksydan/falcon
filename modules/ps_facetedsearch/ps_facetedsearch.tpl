{**
  * 2007-2019 PrestaShop.
  *
  * NOTICE OF LICENSE
  *
  * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
  * that is bundled with this package in the file LICENSE.txt.
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
  * needs please refer to http://www.prestashop.com for more information.
  *
  * @author    PrestaShop SA <contact@prestashop.com>
  * @copyright 2007-2019 PrestaShop SA
  * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
  * International Registered Trademark & Property of PrestaShop SA
  *}
{if $displayedFacets|count}
  <div id="search_filters" class="search-filters card">
    <div class="card-header">
      {block name='facets_title'}
        <p class="card-title h5 mb-0">{l s='Filter By' d='Shop.Theme.Actions'}</p>
      {/block}
    </div>

    <div class="card-body">
      {block name='facets_clearall_button'}
        {if $activeFilters|count}
          <div class="clear-all-wrapper mb-3">
            <button data-search-url="{$clear_all_link}"
              class="btn btn-sm btn-block btn-outline-secondary js-search-filters-clear-all">
              <i class="material-icons">&#xE14C;</i>
              {l s='Clear all' d='Shop.Theme.Actions'}
            </button>
          </div>
        {/if}
      {/block}
      {foreach from=$displayedFacets item="facet"}

        {assign var=_expand_id value=10|mt_rand:100000}
        {assign var=_collapse value=true}
        {foreach from=$facet.filters item="filter"}
          {if $filter.active}{assign var=_collapse value=false}{/if}
        {/foreach}
        <section class="search-filters__block {if !$facet@last} mb-3{/if}">
          <div class="search-filters__header d-flex justify-content-between mb-0 h5 position-relative pb-1">
            <span class="search-filters__title mb-0">{$facet.label}</span>
            <a href="#facet_{$_expand_id}" class="icon-collapse stretched-link text-reset" data-toggle="collapse" {if !$_collapse}
              aria-expanded="true" {/if}>
              <i class="material-icons">&#xE313;</i>
            </a>
          </div>

          {if in_array($facet.widgetType, ['radio', 'checkbox'])}
            {block name='facet_item_other'}
              <div id="facet_{$_expand_id}" class="search-filters__collapse collapse{if !$_collapse} show{/if}">
                {foreach from=$facet.filters key=filter_key item="filter"}
                  {if !$filter.displayed}
                    {continue}
                  {/if}
                  <div class="py-1">
                    <div
                      class="custom-control custom-{if $facet.multipleSelectionAllowed}checkbox{else}radio{/if}{if isset($filter.properties.color) || isset($filter.properties.texture)} custom-color{/if}{if $filter.active} custom-control--active{/if}">
                      <input id="facet_input_{$_expand_id}_{$filter_key}" data-search-url="{$filter.nextEncodedFacetsURL}"
                        type="{if $facet.multipleSelectionAllowed}checkbox{else}radio{/if}" class="custom-control-input"
                        {if $filter.active } checked{/if}>
                      <label class="custom-control-label" for="facet_input_{$_expand_id}_{$filter_key}">
                        {if isset($filter.properties.color)}
                          <span class="color" style="background-color:{$filter.properties.color}"></span>
                        {elseif isset($filter.properties.texture)}
                          <span class="color texture" style="background-image:url({$filter.properties.texture})"></span>
                        {/if}
                        <span class="color__label">{$filter.label}
                          {*{if $filter.magnitude and $show_quantities}*}
                            {*<span class="magnitude">({$filter.magnitude})</span>*}
                          {*{/if}*}
                        </span>
                      </label>
                    </div>
                  </div>
                {/foreach}
              </div>
            {/block}

          {elseif $facet.widgetType == 'dropdown'}
            {block name='facet_item_dropdown'}
              <div id="facet_{$_expand_id}" class="search-filters__collapse  collapse{if !$_collapse} show{/if}">
                <select class="custom-select">
                  <option value="">---</option>
                  {foreach from=$facet.filters item="filter"}
                    <option value="{$filter.nextEncodedFacetsURL}" {if $filter.active} selected="selected" {/if}>
                      {$filter.label}
                      {if $filter.magnitude and $show_quantities}
                        ({$filter.magnitude})
                      {/if}
                    </option>
                  {/foreach}
                </select>

              </div>
            {/block}

          {elseif $facet.widgetType == 'slider'}
            {block name='facet_item_slider'}
              {foreach from=$facet.filters item="filter"}
                <ul id="facet_{$_expand_id}" class="search-filters__slider" data-slider-min="{$facet.properties.min}"
                  data-slider-max="{$facet.properties.max}" data-slider-id="{$_expand_id}"
                  data-slider-values="{$filter.value|@json_encode}" data-slider-unit="{$facet.properties.unit}"
                  data-slider-label="{$facet.label}" data-slider-specifications="{$facet.properties.specifications|@json_encode}"
                  data-slider-encoded-url="{$filter.nextEncodedFacetsURL}">
                  <li>
                    <p id="facet_label_{$_expand_id}">
                      {$filter.label}
                    </p>

                    <div id="slider-range_{$_expand_id}"></div>
                  </li>
                </ul>
              {/foreach}
            {/block}
          {/if}
        </section>
      {/foreach}

    </div>




  </div>
{/if}
