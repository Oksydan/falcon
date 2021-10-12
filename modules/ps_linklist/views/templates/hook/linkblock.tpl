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

  {foreach $linkBlocks as $linkBlock}
    <div class="col-md-3 col-12 mb-lg-4">
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
