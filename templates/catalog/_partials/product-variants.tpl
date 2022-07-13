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
<div class="product-variants js-product-variants mb-3">
  {foreach from=$groups key=id_attribute_group item=group}
    {if !empty($group.attributes)}
    <div class="product-variants-item mb-3">
      <p class="control-label h6 mb-2">{$group.name}</p>
      {if $group.group_type == 'select'}
        <select
          class="custom-select"
          id="group_{$id_attribute_group}"
          data-product-attribute="{$id_attribute_group}"
          name="group[{$id_attribute_group}]">
          {foreach from=$group.attributes key=id_attribute item=group_attribute}
            <option value="{$id_attribute}" title="{$group_attribute.name}"{if $group_attribute.selected} selected="selected"{/if}>{$group_attribute.name}</option>
          {/foreach}
        </select>
      {elseif $group.group_type == 'color'}
        <ul class="row mx-n1" id="group_{$id_attribute_group}">

          {foreach from=$group.attributes key=id_attribute item=group_attribute}
            <li class="col flex-grow-0 px-1 pb-2">
              <div class="custom-control custom-radio-color">
                  <input class="custom-control-input" type="radio" data-product-attribute="{$id_attribute_group}" id="{$id_attribute_group}_{$id_attribute}"  name="group[{$id_attribute_group}]" value="{$id_attribute}" title="{$group_attribute.name}"{if $group_attribute.selected} checked="checked"{/if}>

                  <label class="custom-control-label {if $group_attribute.html_color_code}custom-control-label-{if Tools::getBrightness($group_attribute.html_color_code) > 128}dark{else}bright{/if}{/if}" for="{$id_attribute_group}_{$id_attribute}" aria-label="{$group_attribute.name}">
                    <span
                      {if $group_attribute.texture}
                        class="custom-control-input-color" style="background-image: url({$group_attribute.texture})"
                      {elseif $group_attribute.html_color_code}
                        class="custom-control-input-color" style="background-color: {$group_attribute.html_color_code}"
                      {/if}
                    >
                    </span>
                    <span class="sr-only">
                      {$group_attribute.name}
                    </span>
                </label>
              </div>
            </li>
          {/foreach}
        </ul>
      {elseif $group.group_type == 'radio'}
        <ul id="group_{$id_attribute_group}" class="row mx-n1">
          {foreach from=$group.attributes key=id_attribute item=group_attribute}
            <li class="input-container attribute-radio col-auto px-1 mb-2">
              <label class="attribute-radio__label">
                <input
                  class="input-radio attribute-radio__input"
                  type="radio"
                  data-product-attribute="{$id_attribute_group}"
                  name="group[{$id_attribute_group}]"
                  value="{$id_attribute}"
                  title="{$group_attribute.name}"
                  {if $group_attribute.selected}checked="checked"{/if}>
                <span class="attribute-radio__text">{$group_attribute.name}</span>
              </label>
            </li>
          {/foreach}
        </ul>
      {/if}
    </div>
    {/if}
  {/foreach}
</div>
