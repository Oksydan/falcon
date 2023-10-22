import RangeSlider from './RangeSlider';
import { each } from '../../../theme/utils/DOMHelpers';

class FiltersRangeSliders {
  static init() {
    each('.js-range-slider', (slider) => {
      const rangeSlider = new RangeSlider(slider);

      rangeSlider.init();
    });
  }
}

export default FiltersRangeSliders;
