import $ from 'jquery';
import prestashop from 'prestashop';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import FiltersUrlHandler from './FiltersUrlHandler';


class RangeSlider {
  constructor(element) {
    this.$slider = $(element);

    this.setConfig();
    this.setFormat();

    this.initFilersSlider();

    this.setEvents();
  }

  getSliderType() {
    this.sliderType = this.$slider.data('slider-specifications') ? 'price' : 'weight';
  }

  setConfig() {
    this.min = this.$slider.data('slider-min');
    this.max = this.$slider.data('slider-max');
    this.$parentContainer = this.$slider.closest('.js-input-range-slider-container');
    this.$inputs = [this.$parentContainer.find('[data-action="range-from"]'), this.$parentContainer.find('[data-action="range-to"]')];

    this.getSliderType();

    if (this.sliderType === 'price') {
      const {
        currencySymbol,
        positivePattern,
      } = this.$slider.data('slider-specifications');

      this.sign = currencySymbol;
      this.positivePattern = positivePattern;
      this.values = this.$slider.data('slider-values');
      this.signPosition = this.positivePattern.indexOf('¤') === 0 ? 'prefix' : 'suffix';
    } else if (this.sliderType === 'weight') {
      const unit = this.$slider.data('slider-unit');

      this.sign = unit;
      this.values = this.$slider.data('slider-values');
      this.signPosition = 'suffix';
    }


    if (!Array.isArray(this.values)) {
      this.values = [this.min, this.max];
    }
  }

  setFormat() {
    this.format = wNumb({
      mark: ',',
      thousand: ' ',
      decimals: 0,
      [this.signPosition]:
        this.signPosition === 'prefix' ? this.sign : ` ${this.sign}`,
    });
  }

  initFilersSlider() {
    this.sliderHandler = noUiSlider.create(this.$slider.get(0), {
      start: this.values,
      connect: [false, true, false],
      range: {
        min: this.min,
        max: this.max,
      },
      format: this.format,
    });
  }

  initFilersSliderInputs() {
    this.setInputValues(this.values, true);
  }

  setInputValues(values, formatValue = false) {
    this.$inputs.forEach((input, i) => {
      const val = formatValue ? this.format.from(values[i]) : values[i];
      $(input).val(val);
    });
  }

  setEvents() {
    this.sliderHandler.off('set', this.constructor.handlerSliderSet);
    this.sliderHandler.on('set', this.constructor.handlerSliderSet);
    this.sliderHandler.off('update', this.handlerSliderUpdate);
    this.sliderHandler.on('update', this.handlerSliderUpdate);

    this.$inputs.forEach(($input) => {
      $input.off('focus', this.handleInputFocus);
      $input.on('focus', this.handleInputFocus);
      $input.off('blur', this.handleInputBlur);
      $input.on('blur', this.handleInputBlur);
    });
  }

  static getInputAction($input) {
    return $input.data('action');
  }

  getInputPositionInValue($input) {
    const actionPosition = {
      'range-from': 0,
      'range-to': 1,
    };

    return actionPosition[this.constructor.getInputAction($input)];
  }

  handleInputFocus = ({target}) => {
    const $input = $(target);
    $input.val(this.format.from($input.val()));
  }

  handleInputBlur = ({target}) => {
    const $input = $(target);
    const value = $input.val();
    const position = this.getInputPositionInValue($input);
    const oldValues = this.values;
    const newValues = [...oldValues];
    newValues[position] = value;

    if (value !== oldValues[position]) {
      this.sliderHandler.set(newValues);
    } else {
      $input.val(this.format.to(parseFloat($input.val(), 10)));
    }
  }

  handlerSliderUpdate = (
    values,
  ) => {
    this.setInputValues(values);
  }

  static handlerSliderSet(
    values,
    handle,
    unencoded,
    tap,
    positions,
    noUiSliderInstance,
  ) {
    const formatFunction = noUiSliderInstance.options.format;
    const $target = $(noUiSliderInstance.target);
    const group = $target.data('slider-label');
    const unit = $target.data('slider-unit');
    const [from, to] = values.map(val => formatFunction.from(val));

    const filtersHandler = new FiltersUrlHandler();
    filtersHandler.setRangeParams(group, {unit, from, to});

    const newUrl = filtersHandler.getFiltersUrl();
    prestashop.emit('updateFacets', newUrl);
  }
}

export default RangeSlider;
