import $ from 'jquery';

function initRmaItemSelector() {
  $(`${prestashop.themeSelectors.order.returnForm} table thead input[type=checkbox]`).on('click', ({ currentTarget }) => {
    const checked = $(currentTarget).prop('checked');
    $(`${prestashop.themeSelectors.order.returnForm} table tbody input[type=checkbox]`).each((_, checkbox) => {
      $(checkbox).prop('checked', checked);
    });
  });
}

function setupCustomerScripts() {
  if ($('body#order-detail')) {
    initRmaItemSelector();
  }
}

$(document).ready(setupCustomerScripts);
