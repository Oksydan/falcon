{extends file='checkout/_partials/steps/checkout-step.tpl'}

{block name='step_content'}

  {hook h='displayPaymentTop'}

  {* used by javascript to correctly handle cart updates when we are on payment step (eg vouchers added) *}
  <div style="display:none" class="js-cart-payment-step-refresh"></div>

  {if !empty($display_transaction_updated_info)}
  <p class="cart-payment-step-refreshed-info">
    {l s='Transaction amount has been correctly updated' d='Shop.Theme.Checkout'}
  </p>
  {/if}

  {if $is_free}
    <p class="cart-payment-step-not-needed-info">{l s='No payment needed for this order' d='Shop.Theme.Checkout'}</p>
  {/if}
  <div class="payment-options {if $is_free}d-none{/if}">
    {foreach from=$payment_options item="module_options"}
      {foreach from=$module_options item="option"}
        <div
            id="{$option.id}-container"
            class="mb-3 checkout-option-block checkout-option {if $selected_payment_option == $option.id || $is_free}selected{/if}">
            <input class="ps-shown-by-js custom-control-input{if $option.binary} binary{/if}" id="{$option.id}"
                data-module-name="{$option.module_name}" name="payment-option" type="radio" required
                {if $selected_payment_option == $option.id || $is_free} checked {/if}>

            <label class="card mb-0 cursor-pointer h-100"  for="{$option.id}">
                <div class="card-body checkout-option__body py-sm-3 px-sm-4 p-2">
                    <div class="checkout-option__row row align-items-center">
                        <div class="col-auto checkout-option__col checkout-option__col--thumb">
                            <div class="checkout-option__thumb">
                                {if $option.logo}
                                    <img src="{$option.logo}" class="checkout-option__img img-fluid" />
                                {else}
                                    <img src="{$urls.img_url}checkout/payment_default.svg" class="checkout-option__img img-fluid" />
                                {/if}
                            </div>
                        </div>
                        <div class="col checkout-option__col">
                            <p class="h5 mb-0">
                                {$option.call_to_action_text}
                            </p>
                        </div>
                    </div>
                </div>
            </label>
        </div>
        <div
          id="pay-with-{$option.id}-form"
          style="display:none"
          class="js-payment-option-form {if $option.id != $selected_payment_option} ps-hidden {/if}"
        >
          {if $option.form}
            {$option.form nofilter}
          {else}
            <form id="payment-form" method="POST" action="{$option.action nofilter}">
              {foreach from=$option.inputs item=input}
                <input type="{$input.type}" name="{$input.name}" value="{$input.value}">
              {/foreach}
              <button style="display:none" id="pay-with-{$option.id}" type="submit"></button>
            </form>
          {/if}
        </div>

        {if $option.additionalInformation}
           <div id="{$option.id}-additional-information"
                style="display:none"
                class="mt-2 js-additional-information definition-list additional-information{if $option.id != $selected_payment_option} ps-hidden {/if}">
              <div class="alert alert-info">
                 {$option.additionalInformation nofilter}
              </div>
           </div>
        {/if}
      {/foreach}
    {foreachelse}
      <p class="alert alert-danger">{l s='Unfortunately, there are no payment method available.' d='Shop.Theme.Checkout'}</p>
    {/foreach}
  </div>

  {if $conditions_to_approve|count}
    <p style="display:none;" class="ps-hidden-by-js">
      {* At the moment, we're not showing the checkboxes when JS is disabled
               because it makes ensuring they were checked very tricky and overcomplicates
               the template. Might change later.
            *}
      {l s='By confirming the order, you certify that you have read and agree with all of the conditions below:' d='Shop.Theme.Checkout'}
    </p>
    <form id="conditions-to-approve" method="GET" class="mt-3">
      {foreach from=$conditions_to_approve item="condition" key="condition_name"}
        <div class="custom-control custom-checkbox">
          <input id="conditions_to_approve[{$condition_name}]" name="conditions_to_approve[{$condition_name}]" required
            type="checkbox" value="1" class="ps-shown-by-js custom-control-input">
          <label class="custom-control-label js-terms"
            for="conditions_to_approve[{$condition_name}]">{$condition nofilter}</label>
        </div>
      {/foreach}
    </form>
  {/if}

  {hook h='displayCheckoutBeforeConfirmation'}

  {if $show_final_summary}
    {include file='checkout/_partials/order-final-summary.tpl'}
  {/if}

  <div id="payment-confirmation" class="mt-4 js-payment-confirmation">
    <div class="ps-shown-by-js">
      <div class="text-center">
        <button type="submit" class="btn btn-primary btn-lg d-none d-md-inline-block {if !$selected_payment_option} disabled {/if}">
          {l s='Place order' d='Shop.Theme.Checkout'}
        </button>
        <button type="submit" class="btn btn-primary btn-lg btn-block d-block d-md-none {if !$selected_payment_option} disabled {/if}">
          {l s='Place order' d='Shop.Theme.Checkout'}
        </button>
      </div>
      {if $show_final_summary}
        <article class="alert alert-danger mt-2 js-alert-payment-conditions" role="alert" data-alert="danger">
          {l
            s='Please make sure you\'ve chosen a [1]payment method[/1] and accepted the [2]terms and conditions[/2].'
            sprintf=[
              '[1]' => '<a href="#checkout-payment-step">',
              '[/1]' => '</a>',
              '[2]' => '<a href="#conditions-to-approve">',
              '[/2]' => '</a>'
            ]
            d='Shop.Theme.Checkout'
          }
        </article>
      {/if}
    </div>
    <div class="ps-hidden-by-js">
      {if $selected_payment_option and $all_conditions_approved}
        <label for="pay-with-{$selected_payment_option}">{l s='Order with an obligation to pay' d='Shop.Theme.Checkout'}</label>
      {/if}
    </div>
  </div>

  {hook h='displayPaymentByBinaries'}
{/block}
