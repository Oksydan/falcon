{block name='product_thumbnail'}
  <div class="product-miniature__thumb">
    <a href="{$product.url}">
      {if $product.cover}
        <img
          src="{$product.cover.bySize.home_default.url}"
          alt="{if !empty($product.cover.legend)}{$product.cover.legend}{else}{$product.name|truncate:30:'...'}{/if}"
          loading="lazy"
          data-full-size-image-url="{$product.cover.large.url}"
          />
        {else}
          <img src="{$urls.no_picture_image.bySize.home_default.url}" loading="lazy" />
      {/if}
      {include file='catalog/_partials/product-flags.tpl'}
    </a>
  </div>
{/block}
