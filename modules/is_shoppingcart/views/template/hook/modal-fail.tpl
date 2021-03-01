{extends file='module:is_shoppingcart/views/template/front/modal-base.tpl'}

{block name='blockcart_modal_title'}{l s='Something went wrong' d='Shop.Theme.Checkout'}{/block}
{block name='blockcart_modal_id'}id="blockcart-error"{/block}

{block name='blockcart_modal_body'}
  <div class="alert alert-danger js-blockcart-alert">
  </div>
{/block}

{block name='blockcart_modal_footer'}
  <button type="button" class="btn btn-secondary" data-dismiss="modal">{l s='Continue shopping' d='Shop.Theme.Actions'}</button>
{/block}
