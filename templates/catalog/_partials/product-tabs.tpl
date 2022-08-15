{block name='product_tabs'}
  <div class="card product-tabs">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs" role="tablist">
        {if $product.description}
          <li class="nav-item">
            <a
              class="nav-link"
              data-toggle="tab"
              href="#description"
              role="tab"
              aria-controls="description"
              >{l s='Description' d='Shop.Theme.Catalog'}</a>
          </li>
        {/if}
        <li class="nav-item">
          <a
            class="nav-link"
            data-toggle="tab"
            href="#product-details"
            role="tab"
            aria-controls="product-details"
            >{l s='Product Details' d='Shop.Theme.Catalog'}</a>
        </li>
        {if $product.attachments}
          <li class="nav-item">
            <a
              class="nav-link"
              data-toggle="tab"
              href="#attachments"
              role="tab"
              aria-controls="attachments">{l s='Attachments' d='Shop.Theme.Catalog'}</a>
          </li>
        {/if}
        {foreach from=$product.extraContent item=extra key=extraKey}
          <li class="nav-item">
            <a
              class="nav-link"
              data-toggle="tab"
              href="#extra-{$extraKey}"
              role="tab"
              aria-controls="extra-{$extraKey}">{$extra.title}</a>
          </li>
        {/foreach}
      </ul>
    </div>

    <div class="card-body">
      <div class="tab-content" id="tab-content">
        <div class="tab-pane fade in" id="description" role="tabpanel">
          {block name='product_description'}
            {cms_images_block webpEnabled=$webpEnabled}
              <div class="product-description cms-content">{$product.description nofilter}</div>
            {/cms_images_block}
          {/block}
        </div>

        {block name='product_details'}
          {include file='catalog/_partials/product-details.tpl'}
        {/block}

        {block name='product_attachments'}
          {if $product.attachments}
          <div class="tab-pane fade in" id="attachments" role="tabpanel">
              <section class="product-attachments">
                <p class="h5 text-uppercase">{l s='Download' d='Shop.Theme.Actions'}</p>
                {foreach from=$product.attachments item=attachment}
                  <div class="attachment">
                    <h4><a href="{url entity='attachment' params=['id_attachment' => $attachment.id_attachment]}">{$attachment.name}</a></h4>
                    <p>{$attachment.description}</p>
                    <a href="{url entity='attachment' params=['id_attachment' => $attachment.id_attachment]}">
                      {l s='Download' d='Shop.Theme.Actions'} ({$attachment.file_size_formatted})
                    </a>
                  </div>
                {/foreach}
              </section>
            </div>
          {/if}
        {/block}

        {foreach from=$product.extraContent item=extra key=extraKey}
        <div class="tab-pane fade in {$extra.attr.class} cms-content" id="extra-{$extraKey}" role="tabpanel" {foreach $extra.attr as $key => $val} {$key}="{$val}"{/foreach}>
          {$extra.content nofilter}
        </div>
        {/foreach}
      </div>
    </div>
  </div>
{/block}
