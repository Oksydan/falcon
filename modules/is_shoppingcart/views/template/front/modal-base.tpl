
{block name='blockcart_modal'}

  <div class="modal fade" {block name='blockcart_modal_id'}{/block} tabindex="-1" aria-hidden="true">

    <div class="modal-dialog modal-sm">
      {block name='blockcart_modal_content'}
          <div class="modal-content">

            {block name='blockcart_modal_header'}
              <div class="modal-header">
                {block name='blockcart_modal_title' hide}
                  <h5 class="modal-title">{$smarty.block.child}</h5>
                {/block}
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            {/block}

            {block name='blockcart_modal_body' hide}
              <div class="modal-body">
                {$smarty.block.child}
              </div>
            {/block}

            {block name='blockcart_modal_footer' hide}
              <div class="modal-footer">
                {$smarty.block.child}
              </div>
            {/block}

          </div>
      {/block}
    </div>

  </div>

{/block}

