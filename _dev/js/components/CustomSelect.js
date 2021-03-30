import $ from 'jquery';
import 'jquery-nice-select';

class CustomSelect {
  constructor({
    selector = 'select',
    excludeSelector,
  } = {}) {
    this.selector = selector;
    this.excludeSelector = excludeSelector;
    this.init();
  }

  init() {
    let $selects = $(this.selector);

    if (this.excludeSelector) {
      $selects = $selects.not(this.excludeSelector);
    }

    $selects.each((i, select) => {
      const $select = $(select);

      if ($select.hasClass('nice-select-init')) {
        $select
          .niceSelect('update');
      } else {
        $select
          .wrap($('<div>').addClass('position-relative'))
          .niceSelect()
          .addClass('nice-select-init');
      }
    });
  }
}

export default CustomSelect;
