{foreach $linkBlocks as $linkBlock}
  <div class="mb-4">
    {assign var=_expand_id value=10|mt_rand:100000}
    <div class="d-flex align-items-center mb-3 justify-content-between position-relative">
      <span class="h4 mb-0">{$linkBlock.title}</span>
      <a href="#footer_sub_menu_{$_expand_id}" class="icon-collapse stretched-link text-reset d-block d-md-none" data-toggle="collapse">
        <i class="material-icons d-block"></i>
      </a>
    </div>
    <div id="footer_sub_menu_{$_expand_id}" class="collapse d-md-block">
      <ul class="links-list">
        {foreach $linkBlock.links as $link}
          <li class="links-list__elem">
            <a
                id="{$link.id}-{$linkBlock.id}"
                class="{$link.class} links-list__link"
                href="{$link.url}"
                title="{$link.description}"
                {if !empty($link.target)} target="{$link.target}" {/if}
            >
              {$link.title}
            </a>
          </li>
        {/foreach}
      </ul>
    </div>
  </div>
{/foreach}
