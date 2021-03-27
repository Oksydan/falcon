<table class="table product-table">
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
      <th>
        {l s='Total' d='Shop.Theme.Checkout'}
      </th>
    </tr>
  </thead>
  {foreach from=$products item=product}
    <tr class="product-table__row product-line">
      {block name='cart_detailed_product_line'}
        {include file='customer/_partials/product-table-line.tpl' product=$product interactive=$interactive|default:false}
      {/block}
    </tr>
  {/foreach}
</table>
