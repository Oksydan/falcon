
{block name='offcanvas'}
  <div
    class="offcanvas {block name='offcanvas_extra_class'}offcanvas-start{/block}"
    tabindex="-1"
    {block name='offcanvas_extra_attribues'}{/block}
  >
    {block name='offcanvas_content'}
      {block name='offcanvas_header'}
        <div class="offcanvas-header {block name='offcanvas_header_extra_class'}border-bottom{/block}">
          {block name='offcanvas_title' hide}
            <h5 class="offcanvas-title">{$smarty.block.child}</h5>
          {/block}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
          </button>
        </div>
      {/block}
      {block name='offcanvas_body' hide}
        <div class="offcanvas-body {block name='offcanvas_body_extra_class'}{/block}">
          {$smarty.block.child}
        </div>
      {/block}
      {block name='offcanvas_footer' hide}
        <div class="offcanvas-footer {block name='offcanvas_footer_extra_class'}{/block}">
          {$smarty.block.child}
        </div>
      {/block}
    {/block}
  </div>
{/block}
