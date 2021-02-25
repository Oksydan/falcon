{block name='featured_products'}
  <div class="featured-products my-4 {block name='featured_products_class'}{/block}">

    {block name='featured_products_header'}
      <div class="featured-products__header d-flex align-items-center mb-3">
        {block name='featured_products_title' hide}
          <p class="h1 featured-products__title m-0">
            {$smarty.block.child}
          </p>
        {/block}
        <div class="featured-products__navigation d-flex flex-grow-0 flex-shrink-0 ml-auto">
          <div class="swiper-button-prev swiper-button-prev-custom position-static">
            <span class="sr-only">{l s='Previous' d='Shop.Theme.Actions'}</span>
            <span class="material-icons">keyboard_arrow_left</span>
          </div>
          <div class="swiper-button-next swiper-button-prev-custom position-static">
            <span class="sr-only">{l s='Next' d='Shop.Theme.Actions'}</span>
            <span class="material-icons">keyboard_arrow_right</span>
          </div>
        </div>
      </div>
    {/block}

    <div class="swiper-container py-1 my-n1">
      {block name='featured_products_products'}
        <div class="featured-products__slider swiper-wrapper {block name='featured_products_slider_class'}{/block}">
          {foreach from=$products item="product"}
            {block name='product_miniature'}
              {include file='catalog/_partials/miniatures/product.tpl' product=$product type='slider'}
            {/block}
          {/foreach}
        </div>
      {/block}
    </div>

    {block name='featured_products_footer' hide}
      <div class="featured-products__footer mt-4 d-flex justify-content-center">
        {$smarty.block.child}
      </div>
    {/block}


  </div>
{/block}
