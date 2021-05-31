import $ from 'jquery';
import RangeSlider from './RangeSlider';

class FiltersRangeSliders {
  init() {
    const $rangeSliders = $('.js-range-slider');

    $rangeSliders.each((i, el) => {
      const slider = new RangeSlider(el);
    })
  }
}

export default FiltersRangeSliders;
