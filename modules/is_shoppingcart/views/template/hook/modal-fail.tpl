{extends file='components/modal.tpl'}

{block name='modal_title'}{l s='Something went wrong' d='Shop.Theme.Checkout'}{/block}
{block name='modal_extra_attribues'}id="blockcart-error"{/block}

{block name='modal_body'}
  <div class="alert alert-danger js-blockcart-alert">
  </div>
{/block}

{block name='modal_footer'}
  <button type="button" class="btn btn-secondary" data-dismiss="modal">{l s='Continue shopping' d='Shop.Theme.Actions'}</button>
{/block}
