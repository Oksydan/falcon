{extends file='components/modal.tpl'}

{block name='modal_extra_attribues'}id="order-return-modal"{/block}
{block name='modal_dialog_extra_class'}modal-lg{/block}

{block name='modal_content'}

  <form id="order-return-form" class="modal-content js-order-return-form" action="{$urls.pages.order_follow}" method="post">

    {block name='modal_header'}
      <div class="modal-header {block name='modal_header_extra_class'}{/block}">
        {block name='modal_title'}
          <h5 class="modal-title">{l s='Merchandise return' d='Shop.Theme.Customeraccount'}</h5>
        {/block}
        {block name='modal_close'}
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        {/block}
      </div>
    {/block}

    {block name='modal_body'}
      <div class="modal-body {block name='modal_body_extra_class'}{/block}">
        <div class="mb-3">
          <p>{l s='If you wish to return one or more products, please mark the corresponding boxes and provide an explanation for the return. When complete, click the button below.' d='Shop.Theme.Customeraccount'}</p>
        </div>

        <div class="card my-4">
          {include file="customer/_partials/order-details-return-table.tpl" products=$order.products}
        </div>

        <section class="form-fields">
          <label for="returnText" class="form-control-label">
            {l s='Reason for the return' d='Shop.Theme.Customeraccount'}
          </label>
          <div class="form-group">
            <textarea cols="67" rows="3" name="returnText" id="returnText" class="form-control"></textarea>
          </div>
        </section>
      </div>
    {/block}

    {block name='modal_footer'}
      <div class="modal-footer {block name='modal_footer_extra_class'}{/block}">
        <input type="hidden" name="id_order" value="{$order.details.id}">
        <button class="form-control-submit btn btn-primary d-none d-md-inline-block" type="submit" name="submitReturnMerchandise">
          {l s='Request a return' d='Shop.Theme.Customeraccount'}
        </button>
        <button class="form-control-submit btn btn-primary btn-block d-block d-md-none" type="submit" name="submitReturnMerchandise">
          {l s='Request a return' d='Shop.Theme.Customeraccount'}
        </button>
      </div>
    {/block}

  </form>
{/block}
