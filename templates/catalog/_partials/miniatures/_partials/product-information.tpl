<div class="product-miniature__information {if !$product.main_variants} product-miniature__information--no-variants{/if} hidden-sm-down">
  {block name='quick_view'}
    <a class="quick-view" href="#" data-link-action="quickview">
      {l s='Quick view' d='Shop.Theme.Actions'}
    </a>
  {/block}

  {block name='product_variants'}
    {if $product.main_variants}
      {include file='catalog/_partials/variant-links.tpl' variants=$product.main_variants}
    {/if}
  {/block}
</div>
