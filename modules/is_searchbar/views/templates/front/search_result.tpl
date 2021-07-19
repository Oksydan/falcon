
<div class="search-result">
  {if $products}
    <div class="search-result__products row">
      {foreach from=$products item=$product}
        {include file="module:is_searchbar/views/templates/front/product.tpl"}
      {/foreach}
    </div>

    {if $moreResults}
      <div class="search-result__bottom">
        <a href="{$moreResults}" class="btn btn-block btn-outline-secondary btn-sm">
          {l
            s='Show the remaining %qty% products'
            sprintf=[
              '%qty%' => $moreResultsCount
            ]
            d='Shop.Istheme'
          }
        </a>
      </div>
    {/if}
  {else}
    <div class="search-result__not-result">
      {l s='There are no matching results' d='Shop.Istheme'}
    </div>
  {/if}
</div>
