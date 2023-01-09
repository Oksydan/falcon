<td class="product-line__cell product-line__cell--img">
  {images_block webpEnabled=$webpEnabled}
    {if $product.default_image}
      <img
        {generateImagesSources image=$product.default_image size='cart_default' lazyload=false}
        alt="{$product.name|escape:'quotes'}"
        class="product-line__img rounded img-fluid"
        width="{$product.default_image.bySize.cart_default.width}"
        height="{$product.default_image.bySize.cart_default.height}">
    {else}
      <img
        src="{$urls.no_picture_image.bySize.cart_default.url}"
        width="{$urls.no_picture_image.bySize.cart_default.width}"
        height="{$urls.no_picture_image.bySize.cart_default.height}"
        class="product-line__img rounded img-fluid">
    {/if}
  {/images_block}
</td>

<td class="product-line__cell product-line__cell--prod">
  {assign var="productAttrs" value=[]}

  {foreach from=$product.attributes key="attribute" item="value"}
    {$productAttrs[]= "- `$attribute` : `$value`"}
  {/foreach}

  {$productAttrs = ""|implode:$productAttrs}

  <p class="product-line__title h6 mb-2">
    {if $product.attributes|count > 0}
      {$product.name|replace:$productAttrs : ''}
    {else}
      {$product.name}
    {/if}
  </p>

  {if $product.attributes}
    <ul class="product-line__attributes mb-0">
      {foreach from=$product.attributes key="attribute" item="value"}
        <li class="product-line__attribute text-muted small">
          <span>{$attribute}</span>: <span class="font-weight-bold">{$value}</span>
        </li>
      {/foreach}
    </ul>
  {/if}

</td>

<td class="product-line__cell product-line__cell--price" data-title="{l s='Price' d='Shop.Theme.Catalog'}">
  <div class="price product-line__price">
    {$product.price}
  </div>
</td>

<td class="product-line__cell product-line__cell--qty" data-title="{l s='Quantity' d='Shop.Theme.Catalog'}">
  <span class="price product-line__price">{$product.quantity}</span>
</td>

{if $page.page_name == 'order-detail' && $order.details.is_returnable && isset($product.qty_returned)}
  <td class="product-line__cell product-line__cell--returned" data-title="{l s='Returned' d='Shop.Theme.Customeraccount'}">
    <div class="price product-line__price">
      {$product.qty_returned}
    </div>
  </td>
{/if}

<td class="product-line__cell product-line__cell--total" data-title="{l s='Total' d='Shop.Theme.Checkout'}">
  <div class="price product-line__price">
    {if isset($product.is_gift) && $product.is_gift}
      {l s='Gift' d='Shop.Theme.Checkout'}
    {else}
      {$product.total}
    {/if}
  </div>
</td>

