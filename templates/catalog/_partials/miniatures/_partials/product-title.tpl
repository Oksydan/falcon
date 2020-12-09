{block name='product_name'}
  {$headingTag = 'h2'}
  {if $page.page_name == 'index'}
    {$headingTag = 'h3'}
  {/if}
  <{$headingTag} class="h3 product-miniature__title">
      <a class="text-reset" href="{$product.url}">{$product.name|truncate:60:'...'}</a>
  </{$headingTag}>
{/block}
