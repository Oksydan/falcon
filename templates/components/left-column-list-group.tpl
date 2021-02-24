
{block name='list_group'}
  <div class="card {block name='list_group_extra_class'}{/block}">
    {block name='list_group_header'}
      <div class="card-header">
        {block name='list_group_title' hide}
          <p class="card-title h5 mb-0">
            {$smarty.block.child}
          </p>
        {/block}
      </div>
    {/block}
    {block name='list_group_body' hide}
      {$smarty.block.child}
    {/block}
  </div>
{/block}
