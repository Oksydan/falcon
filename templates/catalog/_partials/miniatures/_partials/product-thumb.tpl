{block name='product_thumbnail'}
  <div class="product-miniature__thumb position-relative {$thumbExtraClass|default:''}">
    <a href="{$product.url}" class="product-miniature__thumb-link">
      <img
        {if $product.cover}
          data-full-size-image-url="{$product.cover.large.url}"
          src="{$product.cover.bySize.home_default.url}"
        {else}
          src="{$urls.no_picture_image.bySize.home_default.url}"
        {/if}
        alt="{if !empty($product.cover.legend)}{$product.cover.legend}{else}{$product.name|truncate:30:'...'}{/if}"
        loading="lazy"
        class="img-fluid rounded"
        />

      {include file='catalog/_partials/product-flags.tpl'}
    </a>

    {block name='quick_view'}
      <a class="quick-view product-miniature__quick-view btn btn-light shadow rounded-circle" href="#" data-link-action="quickview">
        <i class="material-icons product-miniature__quick-view-icon">visibility</i>
      </a>
    {/block}
  </div>
{/block}
