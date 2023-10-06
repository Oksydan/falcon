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
{block name='step'}
  {$step_is_clickable = false}

  {if $step_is_reachable && !$step_is_current}
    {$step_is_clickable = true}
  {/if}

  <section  id    = "{$identifier}"
            class = "{[
                        'js-checkout-step'   => true,
                        'checkout-step'   => true,
                        '-current'        => $step_is_current,
                        '-reachable'      => $step_is_reachable,
                        '-complete'       => $step_is_complete,
                        '-clickable'      => $step_is_clickable,
                        'js-current-step' => $step_is_current
                    ]|classnames}"
  >
    <div class="card-header checkout-step__header position-relative" id="heading-{$identifier}" data-identifier="{$identifier}">
      <p class="step-title js-step-title h5 mb-0 d-flex align-items-center">
        <span>
          <span class="step-number">{$position}.</span>
          {$title}
          <i class="material-icons font-reset rtl-no-flip text-success mx-2">&#xE876;</i>
        </span>

        {if $step_is_reachable}
          <a
            href="#"
            class="ms-auto checkout-step__edit-btn step-edit js-step-edit text-muted btn btn-sm btn-link py-0 stretched-link"
            data-bs-target="#content-{$identifier}">
            <span class="d-inline-flex align-items-center">
              <span class="material-icons font-sm me-1 btn-icon">mode_edit</span>
              {l s='Edit' d='Shop.Theme.Actions'}
            </span>
          </a>
        {/if}
      </p>
    </div>

    <div class="content checkout-step__content card-body">
      {block name='step_content'}DUMMY STEP CONTENT{/block}
    </div>
  </section>
{/block}
