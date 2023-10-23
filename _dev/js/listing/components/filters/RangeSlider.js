import prestashop from 'prestashop';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import FiltersUrlHandler from './FiltersUrlHandler';
import { on, off } from '../../../utils/event/eventHandler';

class RangeSlider {
  constructor(element) {
    this.slider = element;
  }

  init() {
    // If slider already initialized, do nothing
    if (typeof this.slider.noUiSlider !== 'undefined') {
      return;
    }

    this.setConfig();
    this.setFormat();

    this.initFilersSlider();

    this.setEvents();
  }

  getSliderType() {
    this.sliderType = this.slider.dataset.sliderSpecifications ? 'price' : 'weight';
  }

  setConfig() {
    this.min = Number.parseFloat(this.slider.dataset.sliderMin);
    this.max = Number.parseFloat(this.slider.dataset.sliderMax);
    this.parentContainer = this.slider.closest('.js-input-range-slider-container');
    this.inputs = [
      this.parentContainer.querySelector('[data-action="range-from"]'),
      this.parentContainer.querySelector('[data-action="range-to"]'),
    ];

    this.getSliderType();

    if (this.sliderType === 'price') {
      const {
        currencySymbol,
        positivePattern,
      } = JSON.parse(this.slider.dataset.sliderSpecifications);

      this.sign = currencySymbol;
      this.positivePattern = positivePattern;
      this.values = JSON.parse(this.slider.dataset.sliderValues);
      this.signPosition = this.positivePattern.indexOf('¤') === 0 ? 'prefix' : 'suffix';
    } else if (this.sliderType === 'weight') {
      this.sign = this.slider.dataset.sliderUnit;
      this.values = JSON.parse(this.slider.dataset.sliderValues);
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
    this.sliderHandler = noUiSlider.create(this.slider, {
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
    this.inputs.forEach((input, i) => {
      input.value = formatValue ? this.format.from(values[i]) : values[i];
    });
  }

  setEvents() {
    this.sliderHandler.off('set', this.constructor.handlerSliderSet);
    this.sliderHandler.on('set', this.constructor.handlerSliderSet);
    this.sliderHandler.off('update', this.handlerSliderUpdate);
    this.sliderHandler.on('update', this.handlerSliderUpdate);

    this.inputs.forEach((input) => {
      off(input, 'keyup', this.handleInputKeyup);
      on(input, 'keyup', this.handleInputKeyup);

      off(input, 'focus', this.handleInputFocus);
      on(input, 'focus', this.handleInputFocus);

      off(input, 'blur', this.handleInputBlur);
      on(input, 'blur', this.handleInputBlur);
    });
  }

  static getInputAction(input) {
    return input.dataset.action;
  }

  getInputPositionInValue(input) {
    const actionPosition = {
      'range-from': 0,
      'range-to': 1,
    };

    return actionPosition[this.constructor.getInputAction(input)];
  }

  handleInputFocus = ({ target: input }) => {
    input.value = this.format.from(input.value);
  };

  handleInputBlur = ({ target: input }) => {
    const { value } = input;
    const position = this.getInputPositionInValue(input);
    const oldValues = this.values;
    const newValues = [...oldValues];
    newValues[position] = value;

    if (value !== oldValues[position]) {
      this.sliderHandler.set(newValues);
    } else {
      input.value = this.format.to(Number.parseFloat(input.value));
    }
  };

  handleInputKeyup = ({ target: input, keyCode }) => {
    if (keyCode !== 13) {
      return;
    }

    const { value } = input;
    const position = this.getInputPositionInValue(input);
    const oldValues = this.values;
    const newValues = [...oldValues];
    newValues[position] = value;

    if (value !== oldValues[position]) {
      this.sliderHandler.set(newValues);
    } else {
      input.value = this.format.to(Number.parseFloat(input.value));
    }
  };

  handlerSliderUpdate = (
    values,
  ) => {
    this.setInputValues(values);
  };

  static handlerSliderSet(
    values,
    handle,
    unencoded,
    tap,
    positions,
    noUiSliderInstance,
  ) {
    const formatFunction = noUiSliderInstance.options.format;
    const { target } = noUiSliderInstance;
    const group = target.dataset.sliderLabel;
    const unit = target.dataset.sliderUnit;
    const [from, to] = values.map((val) => formatFunction.from(val));

    const filtersHandler = new FiltersUrlHandler();
    filtersHandler.setSearchUrl();
    filtersHandler.setRangeParams(group, { unit, from, to });

    const newUrl = filtersHandler.getFiltersUrl();
    prestashop.emit('updateFacets', newUrl);
  }
}

export default RangeSlider;
