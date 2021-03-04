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

{block name='block_social'}
  <div class="block-social col-lg-4 col-md-12 col-sm-12">
    <ul class="mb-0 row">
      {foreach from=$social_links item='social_link'}
        <li class="col flex-grow-0 flex-shrink-0 mb-2">
          <a href="{$social_link.url}" rel="noopener noreferrer" title="{$social_link.label}" target="_blank" class="btn btn-light p-2 rounded-circle btn-lg">
            <span class="icon icon-{$social_link.class} d-block"></span>
            <div class="sr-only">
              {$social_link.label}
            </div>
          </a>
        </li>
      {/foreach}
    </ul>
  </div>
{/block}
