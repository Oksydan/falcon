{extends file='components/modal.tpl'}

{block name='modal_extra_attribues'}id="mobile_filters" data-modal-hide-mobile{/block}
{block name='modal_extra_class'}fixed-right{/block}
{block name='modal_dialog_extra_class'}modal-dialog-aside{/block}
{block name='modal_title'}{l s='Filters' d='Shop.Theme.Catalog'}{/block}
{block name='modal_body_extra_class'}p-0{/block}
{block name='modal_body'}
  <div id="_mobile_filters"></div>
{/block}

{block name='modal_footer'}
  <button type="button" class="btn btn-block btn-primary" data-dismiss="modal" aria-label="Close">
    {l s='Show results' d='Shop.Istheme'}
  </button>
{/block}



