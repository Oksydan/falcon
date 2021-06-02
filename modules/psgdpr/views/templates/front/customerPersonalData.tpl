{**
 * 2007-2020 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}
{extends file='customer/page.tpl'}

{block name='page_title'}
    {l s='GDPR - Personal data' mod='psgdpr'}
{/block}

{block name='page_content'}
<section class="page_content">
    <div class="card mb-4">
        <div class="card-header">
            <p class="mb-0 card-title h5">
                {l s='Access to my data' mod='psgdpr'}
            </p>
        </div>
        <div class="card-body">
            <p>{l s='At any time, you have the right to retrieve the data you have provided to our site. Click on "Get my data" to automatically download a copy of your personal data on a pdf or csv file.' mod='psgdpr'}</p>
            <a id="exportDataToCsv" class="btn btn-primary btn-sm psgdprgetdatabtn17" target="_blank" href="{$psgdpr_csv_controller|escape:'htmlall':'UTF-8'}">{l s='GET MY DATA TO CSV' mod='psgdpr'}</a>
            <a id="exportDataToPdf" class="btn btn-primary btn-sm psgdprgetdatabtn17" target="_blank" href="{$psgdpr_pdf_controller|escape:'htmlall':'UTF-8'}">{l s='GET MY DATA TO PDF' mod='psgdpr'}</a>
        </div>
    </div>
    <div class="card mb-4">
        <div class="card-header">
            <p class="mb-0 card-title h5">
                {l s='Rectification & Erasure requests' mod='psgdpr'}
            </p>
        </div>

        <div class="card-body">
            <p class="mb-0">{l s='You have the right to modify all the personal information found in the "My Account" page. For any other request you might have regarding the rectification and/or erasure of your personal data, please contact us through our' mod='psgdpr'} <a href="{$psgdpr_contactUrl|escape:'htmlall':'UTF-8'}">{l s='contact page' mod='psgdpr'}</a>. {l s='We will review your request and reply as soon as possible.' mod='psgdpr'}</p>
        </div>
    </div>
</section>
{literal}
<script type="text/javascript">
    var psgdpr_front_controller = "{/literal}{$psgdpr_front_controller|escape:'htmlall':'UTF-8'}{literal}";
    var psgdpr_id_customer = "{/literal}{$psgdpr_front_controller|escape:'htmlall':'UTF-8'}{literal}";
    var psgdpr_ps_version = "{/literal}{$psgdpr_ps_version|escape:'htmlall':'UTF-8'}{literal}";
</script>
{/literal}
{/block}
