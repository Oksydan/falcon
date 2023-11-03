{extends file='components/modal.tpl'}

{block name='modal_extra_attribues'}id="email-alert-modal"{/block}

{block name='modal_content'}
  <div class="modal-content js-mailalert" data-url="{url entity='module' name='ps_emailalerts' controller='actions' params=['process' => 'add']}">
    {block name='modal_header'}
      <div class="modal-header {block name='modal_header_extra_class'}{/block}">
        {block name='modal_title'}
          <h5 class="modal-title">{l s='Notify me when available' d='Modules.Emailalerts.Shop'}</h5>
        {/block}
        {block name='modal_close'}
          <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"></span>
          </button>
        {/block}
      </div>
    {/block}
    {block name='modal_body'}
      <div class="modal-body {block name='modal_body_extra_class'}{/block}">
        <div class="js-mailalert-alert-box"></div>
        <p>
          {l s='Sign up and get notification when product will be available again.' d='Shop.Theme.Catalog'}
        </p>
        <div class="mb-3">
          <input
            class="form-control js-mailalert-email"
            type="email"
            placeholder="{l s='your@email.com' d='Modules.Emailalerts.Shop'}"

            {if !empty($customer.email)}
              value="{$customer.email}"
            {/if}

            {if $customer.is_logged && !$customer.is_guest}
              readonly
            {/if}
            />
        </div>
        {if isset($id_module)}
          {hook h='displayGDPRConsent' id_module=$id_module}
        {/if}
        <input class="js-mailalert-id-product" type="hidden" value="{$id_product}"/>
        <input class="js-mailalert-id-product-attribute" type="hidden" value="{$id_product_attribute}"/>
      </div>
    {/block}
    {block name='modal_footer'}
      <div class="modal-footer {block name='modal_footer_extra_class'}{/block}">
        <button class="btn btn-primary d-block text-center w-100 js-mailalert-submit" type="submit">
          {l s='Send' d='Shop.Theme.Actions'}
        </button>
      </div>
    {/block}
  </div>
{/block}

