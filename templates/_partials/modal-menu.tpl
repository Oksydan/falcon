{extends file='components/offcanvas.tpl'}

{block name='offcanvas_extra_attribues'}id="mobile_top_menu_wrapper"{/block}
{block name='offcanvas_title'}{l s='Menu' d='Shop.Theme.Catalog'}{/block}
{block name='offcanvas_body'}
  <div class="js-top-menu mobile" id="_mobile_top_menu"></div>
  <div class="js-top-menu-bottom">
    <div id="_mobile_currency_selector" class="mb-2"></div>
    <div id="_mobile_language_selector" class="mb-2"></div>
    <div id="_mobile_contact_link" class="mb-2"></div>
  </div>
{/block}
