
{block name='modal'}

<div class="modal fade {block name='modal_extra_class'}{/block}" {block name='modal_id'}{/block} tabindex="-1" aria-hidden="true">

  <div class="modal-dialog {block name='modal_dialog_extra_class'}{/block}">
    {block name='modal_content'}
        <div class="modal-content">

          {block name='modal_header'}
            <div class="modal-header">
              {block name='modal_title' hide}
                <h5 class="modal-title">{$smarty.block.child}</h5>
              {/block}
              {block name='modal_close'}
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              {/block}
            </div>
          {/block}

          {block name='modal_body' hide}
            <div class="modal-body">
              {$smarty.block.child}
            </div>
          {/block}

          {block name='modal_footer' hide}
            <div class="modal-footer">
              {$smarty.block.child}
            </div>
          {/block}

        </div>
    {/block}
  </div>

</div>

{/block}

