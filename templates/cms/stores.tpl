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

{block name='page_title'}
  {l s='Our stores' d='Shop.Theme.Global'}
{/block}

{block name='page_content_container'}
  <section id="content" class="page-content page-stores">

    {foreach $stores as $store}
      <article id="store-{$store.id}" class="store-item card mb-4">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-auto store-picture hidden-sm-down">
              <img
                src="{$store.image.bySize.stores_default.url}"
                {if !empty($store.image.legend)}
                  alt="{$store.image.legend}"
                  title="{$store.image.legend}"
                {else}
                  alt="{$store.name}"
                {/if}
              >
            </div>
            <div class="col-md col-sm-7 col-12 store-description">
              <p class="h4 card-title">{$store.name}</p>
              <address class="mb-0">{$store.address.formatted nofilter}</address>
            </div>
            <div class="col-md-auto col-sm-5 col-12 mt-2 mt-sm-0">
              {$daysFormated = []}
              {foreach $store.business_hours as $day}
                {$daysFormatedCount = $daysFormated|count}
                {$daysFormatedIndex = $daysFormatedCount - 1}
                {$isPrevValueTheSame = false}
                {if $daysFormatedCount > 0 && isset($daysFormated[$daysFormatedIndex][0]) && $daysFormated[$daysFormatedIndex][0].hours == $day.hours[0]}
                  {$isPrevValueTheSame = true}
                {/if}

                {if $daysFormatedCount == 0 || !$isPrevValueTheSame}
                  {$daysFormated[][]= [
                    'day' => $day.day,
                    'hours' => $day.hours[0]
                  ]}
                {elseif $isPrevValueTheSame}
                  {$daysFormated[$daysFormatedIndex][] = [
                    'day' => $day.day,
                    'hours' => $day.hours
                  ]}
                {/if}

              {/foreach}
              {foreach $daysFormated as $fDay}
                {if $fDay[0].hours == ''}
                  {continue}
                {/if}
                {$daysCount = $fDay|count}
                {$suffix = ''}

                {if $daysCount > 1}
                  {$suffix = "- `$fDay[$daysCount-1].day|truncate:'4':'.'`"}
                {/if}

                {if $daysCount == 1}
                  <span class="text-muted">{$fDay[0].day}</span> {$fDay[0].hours}
                {else}
                  <span class="text-muted">{$fDay[0].day|truncate:'4':'.'} {$suffix}</span> {$fDay[0].hours}
                {/if}
                <br>
              {/foreach}
            </div>

            {if $store.note || $store.phone || $store.fax || $store.email}
              <div class="col-12">
                <div class="pt-3 mt-4 border-top text-center">
                  <a data-toggle="collapse" class="icon-collapse d-inline-flex" href="#about-{$store.id}" aria-expanded="false" aria-controls="about-{$store.id}">
                    {l s='About and Contact' d='Shop.Theme.Global'}
                    <span class="material-icons"></span>
                  </a>
                </div>
              </div>
            {/if}
          </div>
        </div>

        <footer id="about-{$store.id}" class="collapse">
          <div class="card-footer">
            {if $store.note}
              <p>{$store.note}</p>
            {/if}
            <ul class="card-block mb-0 row">
              {if $store.phone}
                <li class="col-md-4 d-flex align-items-center mt-1">
                  <span class="material-icons mr-2 font-reset">
                    call
                  </span>
                  <a href="tel:{$store.phone}">{$store.phone}</a>
                </li>
              {/if}
              {if $store.fax}
                <li class="col-md-4 d-flex align-items-center mt-1">
                  <span class="material-icons mr-2 font-reset">
                    local_printshop
                  </span>
                  <span>{$store.fax}</span>
                </li>
              {/if}
              {if $store.email}
                <li class="col-md-4 d-flex align-items-center mt-1">
                  <span class="material-icons mr-2 font-reset">
                    mail
                  </span>
                  <a href="mailto:{$store.email}">
                    {$store.email}
                  </a>
                </li>
              {/if}
            </ul>
          </div>
        </footer>
      </article>
    {/foreach}

  </section>
{/block}
