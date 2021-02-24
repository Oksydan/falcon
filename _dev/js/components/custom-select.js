
export default class CustomSelect {
  constructor({
    selector = 'select',
    excludeSelector,
    props = {}
  } = {}) {
    this.selector = selector;
    this.excludeSelector = excludeSelector;
    this.props = props;
    this.init();
    this.setPrefix = this.setPrefix.bind(this);
  }

  init() {
    let $select = $(this.selector);

    if (this.excludeSelector) {
      $select = $select.not(this.excludeSelector);
    }

    $select.each((i, select) => {
      const $select = $(select);

      if($select.parent('.bootstrap-select').length === 0) {
        $select.on('rendered.bs.select', this.setPrefix);
        $select.on('changed.bs.select', this.setPrefix);
        $select.on('refreshed.bs.select', this.setPrefix);
        $select.selectpicker(this.props);
      } else {
        $select.selectpicker('refresh');
      }
    })
  }

  setPrefix({ target }) {
    const $target = $(target);
    const prefix = $target.data('prefix');


    if(prefix) {
      const $selectValueText = $target.parent('.bootstrap-select').find('.filter-option-inner-inner');
      const selectText = $selectValueText.text();
      $selectValueText.text(`${prefix} ${selectText}`);
      console.log(prefix);
    }
  }
}
