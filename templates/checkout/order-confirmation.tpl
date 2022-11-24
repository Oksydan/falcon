{extends file='page.tpl'}

{block name='page_title'}
  {l s='Your order is confirmed' d='Shop.Theme.Checkout'}
{/block}


{block name='page_content_container' prepend}
  <section id="content-hook_order_confirmation">
    <div class="card-block">

      <p>
        {l s='An email has been sent to your mail address %email%.' d='Shop.Theme.Checkout' sprintf=['%email%' => $order_customer.email]}
        {if $order.details.invoice_url}
          {* [1][/1] is for a HTML tag. *}
          {l
            s='You can also [1]download your invoice[/1]'
            d='Shop.Theme.Checkout'
            sprintf=[
              '[1]' => "<a href='{$order.details.invoice_url}'>",
              '[/1]' => "</a>"
            ]
          }
        {/if}
      </p>

      {block name='hook_order_confirmation'}
        {$HOOK_ORDER_CONFIRMATION nofilter}
      {/block}

    </div>
  </section>
{/block}

{block name='page_content_container'}
  <section id="content" class="page-content page-order-confirmation card my-4">
    {block name='order_confirmation_table'}
      {include
        file='checkout/_partials/order-confirmation-table.tpl'
        products=$order.products
        subtotals=$order.subtotals
        totals=$order.totals
        labels=$order.labels
        add_product_link=false
      }
    {/block}
  </section>

  <div class="row card-group no-gutters my-4">
    {block name='order_details'}
      <div class="col-sm-6 col-12 card">
        <div class="card-header">
          <h3 class="h5 mb-0 card-title">{l s='Order details' d='Shop.Theme.Checkout'}</h3>
        </div>
        <div class="card-body">
          <ul class="m-0">
            <li class="cart-summary-line">
              <span id="order-reference-value">
                {l s='Order reference: %reference%' d='Shop.Theme.Checkout' sprintf=['%reference%' => "<strong>`$order.details.reference`</strong>"]}
              </span>
            </li>
            <li class="cart-summary-line">
              <span>
                {l s='Payment method: %method%' d='Shop.Theme.Checkout' sprintf=['%method%' => "<strong>`$order.details.payment`</strong>"]}
              </span>
            </li>
            {if !$order.details.is_virtual}
              <li class="cart-summary-line">
                <span>
                  {l s='Shipping method: %method%' d='Shop.Theme.Checkout' sprintf=['%method%' => "<strong>`$order.carrier.name`</strong>"]}
                </span>
              </li>
            {/if}
            {if $order.details.recyclable}
              <li class="cart-summary-line">
                <span>{l s='You have given permission to receive your order in recycled packaging.' d="Shop.Theme.Customeraccount"}</span>
              </li>
            {/if}
          </ul>
        </div>
      </div>
    {/block}

    <div class="col-sm-6 col-12 card">
      <div class="card-header">
        <h3 class="h5 mb-0 card-title">{l s='Order subtotals' d='Shop.Istheme'}</h3>
      </div>

      <div class="card-body">
        {foreach $order.subtotals as $subtotal}
          {if $subtotal !== null && $subtotal.type !== 'tax' && $subtotal.label !== null}
            <div class="cart-summary-line">
              <span class="label">{$subtotal.label}</span>
              <span class="value">{if 'discount' == $subtotal.type}-&nbsp;{/if}{$subtotal.value}</span>
            </div>
          {/if}
        {/foreach}

        {if !$configuration.display_prices_tax_incl && $configuration.taxes_enabled}
          <div class="cart-summary-line">
            <span class="label">{$order.totals.total.label}&nbsp;{$order.labels.tax_short}</span>
            <span class="value">{$order.totals.total.value}</span>
          </div>
          <div class="cart-summary-line cart-total">
            <span class="label">{$order.totals.total_including_tax.label}</span>
            <span class="value">{$order.totals.total_including_tax.value}</span>
          </div>
        {else}
          <div class="cart-summary-line cart-total">
            <span class="label">{$order.totals.total.label}&nbsp;{if $configuration.taxes_enabled && $configuration.display_taxes_label}{$order.labels.tax_short}{/if}</span>
              <span class="value">{$order.totals.total.value}</span>
          </div>
        {/if}

        {if $order.subtotals !== null && $order.subtotals.tax.label !== null}
          <div class="cart-summary-line">
            <span class="label">{l s='%label%:' sprintf=['%label%' => $order.subtotals.tax.label] d='Shop.Theme.Global'}</span>
            <span class="value">{$order.subtotals.tax.value}</span>
          </div>
        {/if}
      </div>

    </div>

  </div>

  {block name='hook_payment_return'}
    {if ! empty($HOOK_PAYMENT_RETURN)}
      <section id="content-hook_payment_return">
        {$HOOK_PAYMENT_RETURN nofilter}
      </section>
    {/if}
  {/block}

  {if !$registered_customer_exists}
    {block name='account_transformation_form'}
      <div class="row">
        <div class="col-lg-6 col-md-8 col-12 mx-auto">
          {include file='customer/_partials/account-transformation-form.tpl'}
        </div>
      </div>
    {/block}
  {/if}

  {block name='hook_order_confirmation_1'}
    {hook h='displayOrderConfirmation1'}
  {/block}

  {block name='hook_order_confirmation_2'}
    <section id="content-hook-order-confirmation-footer">
      {hook h='displayOrderConfirmation2'}
    </section>
  {/block}
{/block}
