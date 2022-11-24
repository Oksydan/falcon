<div id="js-product-list-footer">
    {if $category.additional_description && $listing.pagination.items_shown_from == 1}
      <div id="category-description-2" class="cms-content my-3">
        {$category.additional_description nofilter}
      </div>
    {/if}
</div>
