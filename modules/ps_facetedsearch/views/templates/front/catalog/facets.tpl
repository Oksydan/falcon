{function renderCheckboxRadioFacet facet=null _collapse=true}
  {if $facet}
    <div id="facet_{$_expand_id}" class="search-filters__collapse collapse{if !$_collapse} show{/if}">
      {foreach $facet.filters as $filter_key => $filter}
        {if !$filter.displayed}
          {continue}
        {/if}
        <div class="py-1 {if $filter@first}pt-2{/if}">
          <div
            class="form-check
            {if $facet.multipleSelectionAllowed && (isset($filter.properties.color) || isset($filter.properties.texture))}
              form-check-color
            {/if}
            "
          >
            <input
              id="facet_input_{$_expand_id}_{$filter_key}"
              data-search-url="{$filter.nextEncodedFacetsURL}"
              type="{if $facet.multipleSelectionAllowed}checkbox{else}radio{/if}"
              class="form-check-input form-check-input-color"
              {if $filter.active}
                checked
              {/if}
            >
            <label
              for="facet_input_{$_expand_id}_{$filter_key}"
              {if isset($filter.properties.color)}
                class="form-check-label form-check-label-color"
              {else}
                class="form-check-label"
              {/if}
            >
              {if isset($filter.properties.color) || isset($filter.properties.texture)}
                <span class="form-check-color-content flex-shrink-0 flex-grow-0 me-1 fs-4"
                  {if isset($filter.properties.texture)}
                    style="background-image: url({$filter.properties.texture})"
                  {elseif isset($filter.properties.color)}
                    style="background-color: {$filter.properties.color}"
                  {/if}
                  >
                  <span class="
                    form-check-checked-color material-icons
                    {if isset($filter.properties.color)}
                      {if Tools::getBrightness($filter.properties.color) > 128}
                        form-check-checked-color-dark
                      {else}
                        form-check-checked-color-bright
                      {/if}
                    {/if}
                  ">
                    check
                  </span>
                </span>
              {/if}

              <span>
                {$filter.label}
              </span>
            </label>
          </div>
        </div>
      {/foreach}
    </div>
  {/if}
{/function}

{function renderDropdownFacet facet=null _collapse=true}
  {if $facet}
    <div id="facet_{$_expand_id}" class="search-filters__collapse collapse{if !$_collapse} show{/if}">
      <div class="py-1">
        <select class="form-select" data-action="search-select">
          {if $_collapse}
            <option value="">---</option>
          {/if}
          {foreach $facet.filters as $filter}
            <option data-href="{$filter.nextEncodedFacetsURL}" {if $filter.active} selected="selected" {/if}>
                {$filter.label}
                {if $filter.magnitude and $show_quantities}
                  ({$filter.magnitude})
                {/if}
            </option>
          {/foreach}
        </select>
      </div>
    </div>
  {/if}
{/function}

{function renderSliderFacet facet=null _collapse=true _expand_id=null}
  {foreach $facet.filters as $filter}
    <div class="py-1 {if $filter@first}pt-2{/if}">
      <div id="facet_{$_expand_id}" class="search-filters__slider">
        <div class="js-input-range-slider-container">
          <div class="js-range-slider mt-1" data-slider-min="{$facet.properties.min}"
               data-slider-max="{$facet.properties.max}" data-slider-id="{$_expand_id}"
               data-slider-values="{$filter.value|@json_encode}" data-slider-unit="{$facet.properties.unit}"
               data-slider-label="{$facet.label}"
               data-slider-specifications="{$facet.properties.specifications|@json_encode}"
               data-slider-encoded-url="{$filter.nextEncodedFacetsURL}" id="slider-range_{$_expand_id}"></div>
          <div class="d-flex mt-3 mx-n2">
            <div class="px-2 search-filters__input-group">
              <input
                class="js-input-range-slider form-control form-control-sm text-center search-filters__input"
                type="text"
                {if $facet.filters.0.value}
                  value="{$facet.filters.0.value.0}"
                {else}
                  value="{$facet.properties.min}"
                {/if}
                data-unit="{$facet.properties.unit}"
                data-action="range-from"
              >
            </div>
            <div class="px-2 ms-auto search-filters__input-group">
              <input
                class="js-input-range-slider form-control form-control-sm text-center search-filters__input"
                type="text"
                {if $facet.filters.0.value}
                  value="{$facet.filters.0.value.1}"
                {else}
                  value="{$facet.properties.max}"
                {/if}
                data-unit="{$facet.properties.unit}"
                data-action="range-to"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  {/foreach}
{/function}

<div id="_desktop_filters">
  {if isset($displayedFacets) && $displayedFacets|count}
    <div id="search_filters" class="js-search-filters search-filters card mb-md-3">
      <div class="card-header d-none d-md-block">
        {block name='facets_title'}
          <p class="card-title h5 mb-0">{l s='Filter By' d='Shop.Theme.Actions'}</p>
        {/block}
      </div>
      <div class="list-group list-group-flush">
        {block name='facets_clearall_button'}
          {if $activeFilters|count}
            <div class="clear-all-wrapper card-body">
              <button data-search-url="{$clear_all_link}"
                class="btn btn-sm d-block text-center w-100 btn-outline-secondary btn-sm js-search-filters-clear-all">
                <i class="material-icons font-reset me-1 align-middle">&#xE14C;</i>
                {l s='Clear all' d='Shop.Theme.Actions'}
              </button>
            </div>
          {/if}
        {/block}
        {foreach from=$displayedFacets item="facet"}
          {$_expand_id = 10|mt_rand:100000}
          {$_collapse = true}

          {foreach $facet.filters as $filter}
            {if $filter.active}
                {$_collapse = false}
            {/if}
          {/foreach}

          <section class="search-filters__block list-group-item">
            <div class="search-filters__header d-flex justify-content-between align-items-center mb-0 h5 position-relative">
              <span class="search-filters__title mb-0">{$facet.label}</span>
              {if $facet.widgetType != 'slider'}
                <a href="#facet_{$_expand_id}"
                   class="icon-collapse stretched-link text-reset d-block"
                   data-bs-target="#facet_{$_expand_id}"
                   role="button"
                   data-bs-toggle="collapse"
                  {if !$_collapse} aria-expanded="true" {/if}>
                  <span class="material-icons">&#xE313;</span>
                </a>
              {/if}
            </div>

            {if in_array($facet.widgetType, ['radio', 'checkbox'])}
              {block name='facet_item_other'}
                {renderCheckboxRadioFacet facet=$facet _collapse=$_collapse _expand_id=$_expand_id}
              {/block}
            {elseif $facet.widgetType == 'dropdown'}
              {block name='facet_item_dropdown'}
                {renderDropdownFacet facet=$facet _collapse=$_collapse _expand_id=$_expand_id}
              {/block}
            {elseif $facet.widgetType == 'slider'}
              {block name='facet_item_slider'}
                {renderSliderFacet facet=$facet _collapse=$_collapse _expand_id=$_expand_id}
              {/block}
            {/if}
          </section>
        {/foreach}
      </div>
    </div>
  {/if}
</div>
