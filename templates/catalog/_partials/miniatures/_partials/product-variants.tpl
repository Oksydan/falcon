<div class="product-miniature__information {if !$product.main_variants} product-miniature__information--no-variants{/if} d-none d-md-block">
  {block name='product_variants'}
    {if $product.main_variants}
      {include file='catalog/_partials/variant-links.tpl' variants=$product.main_variants}
    {/if}
  {/block}
</div>
