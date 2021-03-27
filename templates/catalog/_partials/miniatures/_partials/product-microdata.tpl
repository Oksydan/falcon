<meta itemprop="url" content="{$product.url}" />
<meta itemprop="name" content="{$product.name}" />

{if $product.cover}
  <meta itemprop="image" content="{$product.cover.bySize.home_default.url}" />
{/if}

{if $product.description_short}
  <meta itemprop="description" content="{$product.description_short}" />
{/if}

<div itemprop="offers" itemscope itemtype="http://schema.org/Offer" class="invisible">
  <link itemprop="availability" href="{$product.seo_availability}"/>
  <meta itemprop="url" content="{$product.url}" />
  <meta itemprop="priceCurrency" content="{$currency.iso_code}" />
  <meta itemprop="price" content="{$product.price_amount}" />
</div>
