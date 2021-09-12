{$pageIdentity = ['identity']}
{$pageAddresses = ['addresses', 'address']}
{$pageHistory = ['history', 'order-detail']}
{$pageDiscount = ['discount']}
{$pageCartHistory = ['cart-history']}
{$pageOrderSlip = ['order-slip']}
{$pageOrderFollow = ['order-follow', 'order-return']}

<div class="customer-links">
  <div class="customer-links__list js-customer-links">
    <a class="col-lg-4 col-md-6 col-sm-6 col-12 {if in_array($page.page_name, $pageIdentity)}active{/if}" id="identity-link" href="{$urls.pages.identity}">
      <span class="link-item">
        <i class="material-icons">&#xE853;</i>
        {l s='Information' d='Shop.Theme.Customeraccount'}
      </span>
    </a>

    {if $customer.addresses|count}
      <a class="col-lg-4 col-md-6 col-sm-6 col-12 {if in_array($page.page_name, $pageAddresses)}active{/if}" id="addresses-link" href="{$urls.pages.addresses}">
        <span class="link-item">
          <i class="material-icons">&#xE56A;</i>
          {l s='Addresses' d='Shop.Theme.Customeraccount'}
        </span>
      </a>
    {else}
      <a class="col-lg-4 col-md-6 col-sm-6 col-12 {if in_array($page.page_name, $pageAddresses)}active{/if}" id="address-link" href="{$urls.pages.address}">
        <span class="link-item">
          <i class="material-icons">&#xE567;</i>
          {l s='Add first address' d='Shop.Theme.Customeraccount'}
        </span>
      </a>
    {/if}

    {if !$configuration.is_catalog}
      <a class="col-lg-4 col-md-6 col-sm-6 col-12 {if in_array($page.page_name, $pageHistory)}active{/if}" id="history-link" href="{$urls.pages.history}">
        <span class="link-item">
          <i class="material-icons">&#xE916;</i>
          {l s='Order history and details' d='Shop.Theme.Customeraccount'}
        </span>
      </a>
    {/if}

    {if !$configuration.is_catalog}
      <a class="col-lg-4 col-md-6 col-sm-6 col-12 {if in_array($page.page_name, $pageOrderSlip)}active{/if}" id="order-slips-link" href="{$urls.pages.order_slip}">
        <span class="link-item">
          <i class="material-icons">&#xE8B0;</i>
          {l s='Credit slips' d='Shop.Theme.Customeraccount'}
        </span>
      </a>
    {/if}

    {if $configuration.voucher_enabled && !$configuration.is_catalog}
      <a class="col-lg-4 col-md-6 col-sm-6 col-12 {if in_array($page.page_name, $pageDiscount)}active{/if}" id="discounts-link" href="{$urls.pages.discount}">
        <span class="link-item">
          <i class="material-icons">&#xE54E;</i>
          {l s='Vouchers' d='Shop.Theme.Customeraccount'}
        </span>
      </a>
    {/if}

    {if $configuration.return_enabled && !$configuration.is_catalog}
      <a class="col-lg-4 col-md-6 col-sm-6 col-12 {if in_array($page.page_name, $pageOrderFollow)}active{/if}" id="returns-link" href="{$urls.pages.order_follow}">
        <span class="link-item">
          <i class="material-icons">&#xE860;</i>
          {l s='Merchandise returns' d='Shop.Theme.Customeraccount'}
        </span>
      </a>
    {/if}

    {block name='display_customer_account'}
      {hook h='displayCustomerAccount'}
    {/block}
  </div>

  <div class="text-center customer-links__footer">
    <a href="{$link->getPageLink('index', true, null, 'mylogout')}" class="customer-links__logout">
      {l s='Sign out' d='Shop.Theme.Actions'}
    </a>
  </div>
</div>

