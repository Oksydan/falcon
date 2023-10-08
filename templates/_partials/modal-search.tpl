{extends file='components/offcanvas.tpl'}

{block name='offcanvas_extra_attribues'}id="search_dialog"{/block}
{block name='offcanvas_extra_class'}search-modal offcanvas-start{/block}
{block name='offcanvas_header'}{/block}
{block name='offcanvas_body'}
  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
  </button>
  <div id="_mobile_search_from">
  </div>
{/block}
