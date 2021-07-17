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
<section class="contact-form">
  <form class="card mb-4" action="{$urls.pages.contact}" method="post" {if $contact.allow_file_upload}enctype="multipart/form-data"{/if}>

    <div class="card-header">
      <p class="h4 card-title mb-0">
        {l s='Contact us' d='Shop.Theme.Global'}
      </p>
    </div>

    <div class="card-body">

      {if $notifications}
        <div class="col-12 alert {if $notifications.nw_error}alert-danger{else}alert-success{/if}">
          <ul>
            {foreach $notifications.messages as $notif}
              <li>{$notif}</li>
            {/foreach}
          </ul>
        </div>
      {/if}

      {if !$notifications || $notifications.nw_error}
        <section class="form-fields">

          <div class="form-group">
            <label class="form-control-label">{l s='Subject' d='Shop.Forms.Labels'}</label>
            <select name="id_contact" class="custom-select">
              {foreach from=$contact.contacts item=contact_elt}
                <option value="{$contact_elt.id_contact}">{$contact_elt.name}</option>
              {/foreach}
            </select>
          </div>

          <div class="form-group">
            <label class="form-control-label">{l s='Email address' d='Shop.Forms.Labels'}</label>
            <input
              class="form-control"
              name="from"
              type="email"
              value="{$contact.email}"
              placeholder="{l s='your@email.com' d='Shop.Forms.Help'}"
            >
          </div>

          {if $contact.orders}
            <div class="form-group">
              <label class="form-control-label">{l s='Order reference' d='Shop.Forms.Labels'}</label>
              <select name="id_order" class="custom-select">
                <option value="">{l s='Select reference' d='Shop.Forms.Help'}</option>
                {foreach from=$contact.orders item=order}
                  <option value="{$order.id_order}">{$order.reference}</option>
                {/foreach}
              </select>
              <small class="form-text text-muted">
                {l s='optional' d='Shop.Forms.Help'}
              </small>
            </div>
          {/if}

          {if $contact.allow_file_upload}
            <div class="form-group">
              <label class="form-control-label">{l s='Attachment' d='Shop.Forms.Labels'}</label>

              <div class="custom-file">
                <input name="fileUpload" type="file" class="custom-file-input" id="fileUpload">
                <label class="custom-file-label" for="fileUpload">{l s='Choose file' d='Shop.Theme.Actions'}</label>
              </div>
              <small class="form-text text-muted">
                {l s='optional' d='Shop.Forms.Help'}
              </small>
            </div>
          {/if}

          <div class="form-group">
            <label class="form-control-label">{l s='Message' d='Shop.Forms.Labels'}</label>
            <textarea
              class="form-control"
              name="message"
              placeholder="{l s='How can we help?' d='Shop.Forms.Help'}"
              rows="5"
            >{if $contact.message}{$contact.message}{/if}</textarea>
          </div>

          {if isset($id_module)}
            <div class="form-group">
              {hook h='displayGDPRConsent' id_module=$id_module}
            </div>
          {/if}

        </section>

        <footer class="form-footer text-right">
          <style>
            input[name=url] {
              display: none !important;
            }
          </style>
          <input type="text" name="url" value=""/>
          <input type="hidden" name="token" value="{$token}" />
          <input class="btn btn-primary d-none d-md-inline-block" type="submit" name="submitMessage" value="{l s='Send' d='Shop.Theme.Actions'}">
          <input class="btn btn-primary btn-block d-block d-md-none" type="submit" name="submitMessage" value="{l s='Send' d='Shop.Theme.Actions'}">
        </footer>
      {/if}
    </div>



  </form>
</section>
