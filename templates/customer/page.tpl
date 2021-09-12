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
 {extends file='page.tpl'}

{block name='page_header_container'}
  {capture name="acc_title"}
    {$smarty.block.parent}
  {/capture}
{/block}

{block name='notifications'}
{/block}


{block name='page_content_container'}
  <div class="row">
    <div class="col-lg-3 col-12">
     {include file='customer/customer-links.tpl'}
    </div>
    <div class="pl-lg-5 col-lg-9 col-12">
      <section id="content" class="{block name='pageContentClass'}page-content {/block}page-content--{$page.page_name}">
        {$smarty.capture.acc_title nofilter}

        {block name='page_content_top'}
          {block name='customer_notifications'}
            {include file='_partials/notifications.tpl'}
          {/block}
        {/block}

        {block name='page_content'}
          <!-- Page content -->
        {/block}
      </section>
    </div>
  </div>
{/block}
