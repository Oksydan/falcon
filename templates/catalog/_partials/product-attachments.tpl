
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
