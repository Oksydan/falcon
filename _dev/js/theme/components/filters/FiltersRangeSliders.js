import $ from 'jquery';
import RangeSlider from './RangeSlider';

class FiltersRangeSliders {
  static init() {
    const $rangeSliders = $('.js-range-slider');

    $rangeSliders.each((i, el) => {
      /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "slider" }] */
      const slider = new RangeSlider(el);
    });
  }
}

export default FiltersRangeSliders;
