{**
 * 2007-2017 PrestaShop
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
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2017 PrestaShop SA
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}
{$autocomplete = [
  'firstname' => 'given-name',
  'lastname' => 'family-name',
  'email'=>'email',
  'password'=>'current-password',
  'new_password'=>'new-password',
  'postcode'=>'postal-code',
  'birthday'=>'bday',
  'address1'=>'street-address',
  'address2'=>'address-line2',
  'id_state'=>'address-level1',
  'city'=>'address-level2',
  'company'=>'organization'
]}
{if $field.type == 'hidden'}

  {block name='form_field_item_hidden'}
    <input type="hidden" name="{$field.name}" value="{$field.value|default}">
  {/block}

{else}
  {assign var=uniqId value=10|mt_rand:100000}

  <div class="form-group js-input-column">
    {if $field.type == 'checkbox' || $field.type == 'radio-buttons'}
      {if $field.type == 'radio-buttons'}
        <div class="form-label label mr-3">{$field.label}</div>
      {/if}
    {else}
      <label class="form-label {if $field.required}required{/if}" for="f-{$field.name}_{$uniqId}">
        {$field.label}
        {block name='form_field_comment'}
          {if (!$field.required && !in_array($field.type, ['radio-buttons', 'checkbox']))}
            <small class="text-muted">({l s='Optional' d='Shop.Forms.Labels'})</small>
          {/if}
        {/block}
      </label>
    {/if}


    {if $field.type === 'select'}

      {block name='form_field_item_select'}
        <select class="custom-select wide{if !empty($field.errors)} is-invalid{/if}" name="{$field.name}"
          id="f-{$field.name}_{$uniqId}" {if $field.required} required{/if}>
          <option value disabled selected>{l s='-- please choose --' d='Shop.Forms.Labels'}</option>
          {foreach from=$field.availableValues item="label" key="value"}
            <option value="{$value}" {if $value eq $field.value} selected {/if}>{$label}</option>
          {/foreach}
        </select>
      {/block}

    {elseif $field.type === 'countrySelect'}

      {block name='form_field_item_country'}
        <select class="custom-select js-country wide{if !empty($field.errors)} is-invalid{/if}" name="{$field.name}"
          id="f-{$field.name}_{$uniqId}" {if $field.required}required{/if}>
          <option value disabled selected>{l s='-- please choose --' d='Shop.Forms.Labels'}</option>
          {foreach from=$field.availableValues item="label" key="value"}
            <option value="{$value}" {if $value eq $field.value} selected {/if}>{$label}</option>
          {/foreach}
        </select>
      {/block}

    {elseif $field.type === 'radio-buttons'}

      {block name='form_field_item_radio'}
        {foreach from=$field.availableValues item="label" key="value" name="radiolist"}
          <div class="custom-control custom-radio custom-control-inline">
            <input name="{$field.name}" type="radio" value="{$value}"
              class="custom-control-input {if !empty($field.errors)} is-invalid{/if}"
              id="f-{$field.name}_{$uniqId}-{$smarty.foreach.radiolist.iteration}" {if $field.required}required{/if}
              {if $value eq $field.value} checked {/if}>

            <label class="custom-control-label"
              for="f-{$field.name}_{$uniqId}-{$smarty.foreach.radiolist.iteration}">{$label}</label>
          </div>
        {/foreach}

      {/block}

    {elseif $field.type === 'checkbox'}

      {block name='form_field_item_checkbox'}
        <div class="custom-control custom-checkbox">
          <input name="{$field.name}" type="checkbox" value="1" id="f-{$field.name}_{$uniqId}"
            class="custom-control-input{if !empty($field.errors)} is-invalid{/if}" {if $field.value} checked="checked"
            {/if}{if $field.required} required{/if}>
          <label class="custom-control-label" for="f-{$field.name}_{$uniqId}">{$field.label|unescape:'html' nofilter}</label>
        </div>
      {/block}

    {elseif $field.type === 'date'}

      {block name='form_field_item_date'}
        <input
          name="{$field.name}"
          class="form-control{if !empty($field.errors)} is-invalid{/if}"
          type="date"
          value="{$field.value|default}"
          placeholder="{if isset($field.availableValues.placeholder)}{$field.availableValues.placeholder}{/if}"
          id="f-{$field.name}_{$uniqId}" {if isset($autocomplete[$field.name])} autocomplete="{$autocomplete[$field.name]}"
          {/if}>
        {if isset($field.availableValues.comment)}
          <span class="form-text text-muted">
            {$field.availableValues.comment}
          </span>
        {/if}
      {/block}

    {elseif $field.type === 'birthday'}

      {block name='form_field_item_birthday'}
        <div class="js-parent-focus">
          {html_select_date
            field_order=DMY
            time={$field.value}
            field_array={$field.name}
            prefix=false
            reverse_years=true
            field_separator='<br>'
            day_extra='class="form-control form-control-select"'
            month_extra='class="form-control form-control-select"'
            year_extra='class="form-control form-control-select"'
            day_empty={l s='-- day --' d='Shop.Forms.Labels'}
            month_empty={l s='-- month --' d='Shop.Forms.Labels'}
            year_empty={l s='-- year --' d='Shop.Forms.Labels'}
            start_year={'Y'|date}-100 end_year={'Y'|date}
          }
        </div>
      {/block}

    {elseif $field.type === 'password'}

      {block name='form_field_item_password'}
        <div class="input-group js-parent-focus">
          <input
            class="form-control js-child-focus js-visible-password{if !empty($field.errors)} is-invalid{/if}"
            name="{$field.name}"
            id="f-{$field.name}_{$uniqId}"
            type="password"
            value=""
            {if isset($configuration.password_policy.minimum_length)}data-minlength="{$configuration.password_policy.minimum_length}"{/if}
            {if isset($configuration.password_policy.maximum_length)}data-maxlength="{$configuration.password_policy.maximum_length}"{/if}
            {if isset($configuration.password_policy.minimum_score)}data-minscore="{$configuration.password_policy.minimum_score}"{/if}
            pattern=".{literal}{{/literal}{$configuration.password_policy.minimum_length},{literal}}{/literal}"
            {if isset($autocomplete[$field.name])}autocomplete="{$autocomplete[$field.name]}" {/if}
            {if $field.required}required{/if}>
          <span class="input-group-append">
            <button class="btn btn-primary" type="button" data-action="show-password"
              data-text-show="<span class='material-icons d-block'>visibility</span>" data-text-hide="<span class='material-icons d-block'>visibility_off</span>">
              <span class="material-icons d-block">visibility</span>
            </button>
          </span>
        </div>
        {include file='_partials/form-errors.tpl' errors=$field.errors required=$field.required label=$field.label}
      {/block}

    {elseif $field.type === 'file'}
      <div class="custom-file">
        <input name="{$field.name}" type="file" class="custom-file-input{if !empty($field.errors)} is-invalid{/if}"
          id="f-{$field.name}_{$uniqId}" {if $field.required} required{/if}>
        <label class="custom-file-label" for="f-{$field.name}_{$uniqId}">{l s='Choose file' d='Shop.Theme.Actions'}</label>
      </div>
    {else}

      {block name='form_field_item_other'}
        <input
          class="form-control{if !empty($field.errors)} is-invalid{/if}"
          name="{$field.name}"
          type="{if $field.name === "phone"}tel{else}{$field.type}{/if}"
          value="{$field.value|default}"
          id="f-{$field.name}_{$uniqId}"
          {if isset($field.availableValues.placeholder)}placeholder="{$field.availableValues.placeholder}" {/if}
          {if $field.maxLength}maxlength="{$field.maxLength}" {/if}
          {if $field.required}required{/if}
          {if isset($autocomplete[$field.name])} autocomplete="{$autocomplete[$field.name]}" {/if}
          pattern="^[^\s]+(\s+[^\s]+)*$">
        {if isset($field.availableValues.comment)}
          <small class="form-text text-muted">
            {$field.availableValues.comment}
          </small>
        {/if}
      {/block}

    {/if}

    {block name='form_field_errors'}
      {if $field.type !== 'password'}
        {include file='_partials/form-errors.tpl' errors=$field.errors required=$field.required label=$field.label}
      {/if}
    {/block}


  </div>

{/if}
