{assign var=_counter value=0}
{function name="menu" nodes=[] depth=0 parent=null}
  {if $nodes|count}
    <ul {if $depth === 0}class="menu-top h-100" id="top-menu" role="navigation"{else} class="menu-sub__list menu-sub__list--{$depth}"{/if} data-depth="{$depth}">
      {foreach from=$nodes item=node}
        {if $node.children|count}
          {assign var=_expand_id value=10|mt_rand:100000}
        {/if}
        <li class="h-100 menu__item--{$depth} {$node.type} menu__item {if $depth === 0}menu__item--top{else}menu__item--sub{/if}{if $node.current} menu__item--current{/if}"
          id="{$node.page_identifier}" {if $node.children|count}aria-haspopup="true" aria-expanded="false"
          aria-owns="top_sub_menu_{$_expand_id}" aria-controls="top_sub_menu_{$_expand_id}"{/if}>
          {assign var=_counter value=$_counter+1}

          {if $node.children|count}
          <div class="menu__item-header">
          {/if}
            <a
              class="d-md-flex w-100 h-100 {if $depth === 0}menu__item-link--top{else}menu__item-link--sub menu__item-link--{$depth}{/if} {if $node.children|count}menu__item-link--hassubmenu{else}menu__item-link--nosubmenu{/if}"
              href="{$node.url}" data-depth="{$depth}"
              {if $node.open_in_new_window} target="_blank" {/if}
            >
              <span class="align-self-center">{$node.label}</span>
            </a>
            {if $node.children|count}
            {* Cannot use page identifier as we can have the same page several times *}
            {assign var=_expand_id value=10|mt_rand:100000}
            <span class="d-block d-md-none">
                <span data-target="#top_sub_menu_{$_expand_id}" data-toggle="collapse"
                      class="d-block navbar-toggler icon-collapse">
                  <i class="material-icons menu__collapseicon">&#xE313;</i>
                </span>
              </span>
          </div>
          {/if}
          {if $node.children|count}
            <div class="{if $depth === 0}menu-sub {/if}clearfix collapse show" data-collapse-hide-mobile
                 id="top_sub_menu_{$_expand_id}" role="group" aria-labelledby="{$node.page_identifier}"
                 aria-expanded="false" aria-hidden="true">
              <div{if $depth === 0} class="menu-sub__content container"{/if}>
                {menu nodes=$node.children depth=$node.depth parent=$node}
              </div>
            </div>
          {/if}
        </li>
      {/foreach}
    </ul>
  {/if}
{/function}

<div class="d-none d-md-block col-12 header-top__block header-top__block--menu mt-3">
  <div class="menu" id="_desktop_top_menu">
    {menu nodes=$menu.children}
  </div>
</div>
