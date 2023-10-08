{extends file='components/offcanvas.tpl'}

{block name='offcanvas_extra_attribues'}id="mobile_filters"{/block}
{block name='offcanvas_extra_class'}offcanvas-end{/block}
{block name='offcanvas_title'}{l s='Filters' d='Shop.Theme.Catalog'}{/block}
{block name='offcanvas_body'}
  <div id="_mobile_filters"></div>
  <button
    type="button"
    class="btn d-block text-center w-100 btn-primary"
    data-bs-dismiss="offcanvas"
    aria-label="Close"
  >
      {l s='Show results' d='Shop.Istheme'}
  </button>
{/block}


