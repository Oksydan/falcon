{extends file='components/modal.tpl'}

{block name='modal_extra_attribues'}id="saerchModal" data-modal-hide-mobile{/block}
{block name='modal_extra_class'}modal-fullscreen search-modal{/block}
{block name='modal_header'}{/block}
{block name='modal_body'}
  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  <div id="_mobile_search_from">
  </div>
{/block}
