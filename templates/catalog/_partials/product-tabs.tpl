{$tabsList = []}

{if $product.description}
  {$tabsList[] = [
    'id' => 'description',
    'title' => {l s='Description' d='Shop.Theme.Catalog'},
    'content' => {include file='catalog/_partials/product-description.tpl'}
  ]}
{/if}

{$tabsList[] = [
  'id' => 'product-details-tabs',
  'title' => {l s='Product Details' d='Shop.Theme.Catalog'},
  'content' => {include file='catalog/_partials/product-details.tpl'}
]}

{if $product.attachments}
  {$tabsList[] = [
    'id' => 'attachments',
    'title' => {l s='Attachments' d='Shop.Theme.Catalog'},
    'content' => {include file='catalog/_partials/product-attachments.tpl'}
  ]}
{/if}

{foreach from=$product.extraContent item=extra key=extraKey}
  {$tabsList[] = [
    'id' => "extra-{$extraKey}",
    'title' => $extra.title,
    'content' => $extra.content,
    'attr' => $extra.attr
  ]}
{/foreach}


{block name='product_tabs'}
  <div class="card product-tabs">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs" role="tablist">
        {foreach $tabsList as $tab}
          <li class="nav-item" role="presentation">
            <a
              class="nav-link {if $tab@first}active{/if}"
              data-bs-toggle="tab"
              href="#{$tab.id}"
              data-bs-target="#{$tab.id}"
              role="tab"
              aria-selected="{if $tab@first}true{else}false{/if}"
              aria-controls="{$tab.id}"
            >
              {$tab.title}
            </a>
          </li>
        {/foreach}
      </ul>
    </div>

    <div class="card-body">
      <div class="tab-content" id="tab-content">
        {foreach $tabsList as $tab}
          <div
            class="tab-pane fade {if $tab@first}show active{/if}"
            id="{$tab.id}"
            role="tabpanel"
            aria-labelledby="{$tab.id}-tab"
            {if !empty($tab.attr)}
                {foreach $tab.attr as $key => $val} {$key}="{$val}"{/foreach}
            {/if}
          >
            {$tab.content nofilter}
          </div>
        {/foreach}
      </div>
    </div>
  </div>
{/block}
