<table class="table product-table">
  <div class="card-header d-md-none">
    <p class="card-title mb-0 h5">
      {l s='Products' d='Shop.Theme.Catalog'}
    </p>
  </div>
  <thead class="thead-default product-table__head">
    <tr>
      <th></th>
      <th>
        {l s='Product' d='Shop.Theme.Catalog'}
      </th>
      <th>
        {l s='Price' d='Shop.Theme.Catalog'}
      </th>
      <th>
        {l s='Quantity' d='Shop.Theme.Catalog'}
      </th>
      {if $page.page_name == 'order-detail' && $order.details.is_returnable}
        <th>
          {l s='Returned' d='Shop.Theme.Customeraccount'}
        </th>
      {/if}
      <th>
        {l s='Total' d='Shop.Theme.Checkout'}
      </th>
    </tr>
  </thead>
  {foreach from=$products item=product}
    <tr class="product-table__row product-line {if $page.page_name == 'order-detail' && $order.details.is_returnable}product-line--extended{/if}">
      {block name='cart_detailed_product_line'}
        {include file='customer/_partials/product-table-line.tpl' product=$product interactive=$interactive|default:false}
      {/block}
    </tr>
  {/foreach}
</table>
