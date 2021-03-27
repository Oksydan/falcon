{**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 *}

{function name="categories" nodes=[] depth=0}
  {strip}
    {if $nodes|count}
      <div class="list-group list-group-flush list-group-collapse">
        {foreach from=$nodes item=node}

          {if $node.children}
            <div class="list-group-item list-group-item-action-dropdown">
              <a href="{$node.link}" class="stretched-link text-reset list-group-item-action-dropdown-link">
                {$node.name}
              </a>
              <a href="#exCollapsingNavbar{$node.id}" class="icon-collapse list-group-item-collapse text-reset" data-toggle="collapse">
                <i class="material-icons d-block">&#xE313;</i>
              </a>
            </div>
          {else}
            <a href="{$node.link}" class="list-group-item list-group-item-action">
              {$node.name}
            </a>
          {/if}
          {if $node.children}
            <div class="collapse" id="exCollapsingNavbar{$node.id}">
              {categories nodes=$node.children depth=$depth+1}
            </div>
          {/if}
        {/foreach}
      </div>
    {/if}
  {/strip}
{/function}

{extends file="components/left-column-list-group.tpl"}
{if $categories.children}
  {block name='list_group_extra_class'}mb-md-3 d-none d-md-block{/block}

  {block name='list_group_title'}
    {l s='Categories' d='Shop.Theme.Catalog'}
  {/block}

  {block name='list_group_body'}
    {categories nodes=$categories.children}
  {/block}

{else}
  {block name='list_group'}{/block}
{/if}

