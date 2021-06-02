{*
* 2007-2016 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
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
* @copyright 2007-2015 PrestaShop SA
* @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
* International Registered Trademark & Property of PrestaShop SA
*}

<div class="card overflow-hidden">
  <div class="row no-gutters flex-nowrap align-items-center">
    <div class="col-auto">
      <a href="{$mailAlert.link}">
        <img src="{$mailAlert.cover_url}" alt=""/>
      </a>
    </div>
    <div class="col p-2">
      <p class="h6 mb-1">
        {$mailAlert.name}
      </p>
      <span class="font-size-sm">{$mailAlert.attributes_small}</span>
    </div>
    <div class="col-auto">
      <a href="#"
        title="{l s='Remove mail alert' d='Modules.Mailalerts.Shop'}"
        class="js-remove-email-alert btn btn-link"
        rel="js-id-emailalerts-{$mailAlert.id_product|intval}-{$mailAlert.id_product_attribute|intval}"
        data-url="{url entity='module' name='ps_emailalerts' controller='actions' params=['process' => 'remove']}">
        <i class="material-icons">delete</i>
      </a>
    </div>
  </div>
</div>
