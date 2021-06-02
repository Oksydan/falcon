{block name='product_thumbnail'}
  <div class="product-miniature__thumb position-relative {$thumbExtraClass|default:''}">
    <a href="{$product.url}" class="product-miniature__thumb-link">
      <img
        {if $product.default_image}
          data-full-size-image-url="{$product.default_image.large.url}"
          data-src="{$product.default_image.bySize.home_default.url}"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='{$product.default_image.bySize.home_default.width}' height='{$product.default_image.bySize.home_default.height}' viewBox='0 0 1 1'%3E%3C/svg%3E"
        {else}
          src="{$urls.no_picture_image.bySize.home_default.url}"
        {/if}
        alt="{if !empty($product.default_image.legend)}{$product.default_image.legend}{else}{$product.name|truncate:30:'...'}{/if}"
        loading="lazy"
        class="img-fluid rounded lazyload"
        width="{$product.default_image.bySize.home_default.width}"
        height="{$product.default_image.bySize.home_default.height}"
        />

      {include file='catalog/_partials/product-flags.tpl'}
    </a>

    {block name='quick_view'}
      <a class="quick-view product-miniature__quick-view btn btn-light shadow rounded-circle" href="#" data-link-action="quickview">
        <i class="material-icons product-miniature__quick-view-icon">visibility</i>
      </a>
    {/block}


    {block name='product_reviews'}
      {hook h='displayProductListReviews' product=$product}
    {/block}
  </div>
{/block}
