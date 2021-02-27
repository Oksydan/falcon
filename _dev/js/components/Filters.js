import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import FiltersUrlHandler from './FiltersUrlHandler';
import prestashop from 'prestashop';
import $ from 'jquery';

class Filters {

  constructor() {
    this.$body = $('body');
    this.initFilersSlider();
    this.setEvents();
  }

  setEvents () {
    prestashop.on('updatedProductList', () => {
      prestashop.pageLoader.hideLoader();
      this.initFilersSlider();
    });

    prestashop.on('updateFacets', () => {
      prestashop.pageLoader.showLoader();
    });

    this.$body.on('change', '#search_filters select', ({target}) => {
      const form = $(target).closest('form');
      prestashop.emit('updateFacets', `?${form.serialize()}`);
    });

    this.$body.on('click', '.js-search-link', (event) => {
      event.preventDefault();
      prestashop.emit('updateFacets', $(event.target).closest('a').get(0).href);
    });

    this.$body.on('change', '[data-action="search-select"]', ({target}) => {
      prestashop.emit('updateFacets', $(target).find('option:selected').data('href'));
    });

    this.$body.on('click', '.js-search-filters-clear-all', (event) => {
      prestashop.emit('updateFacets', this.parseSearchUrl(event));
    });

    this.$body.on('change', '#search_filters input[data-search-url]', (event) => {
      prestashop.emit('updateFacets', this.parseSearchUrl(event));
    });
  }

  static parseSearchUrl (event){
    if (event.target.dataset.searchUrl !== undefined) {
      return event.target.dataset.searchUrl;
    }

    if ($(event.target).parent()[0].dataset.searchUrl === undefined) {
      throw new Error('Can not parse search URL');
    }

    return $(event.target).parent()[0].dataset.searchUrl;
  };


  initFilersSlider () {
    const $rangeSliders = $(".js-range-slider");

    const handlerSliderChange = (
      values,
      handle,
      unencoded,
      tap,
      positions,
      noUiSlider
    ) => {
      const formatFunction = noUiSlider.options.format;
      const $target = $(noUiSlider.target);
      const group = $target.data("slider-label");
      const unit = $target.data("slider-unit");
      const [from, to] = values.map((val) => formatFunction.from(val));

      const filtersHandler = new FiltersUrlHandler();
      filtersHandler.setRangeParams(group, { unit, from, to });

      const newUrl = filtersHandler.getFiltersUrl();
      prestashop.emit("updateFacets", newUrl);
    };

    $rangeSliders.each((i, slider) => {
      const $slider = $(slider);
      const min = $slider.data("slider-min");
      const max = $slider.data("slider-max");
      const {
        maxFractionDigits,
        currencySymbol,
        positivePattern,
      } = $slider.data("slider-specifications");
      let values = $slider.data("slider-values");

      const signPosition =
        positivePattern.indexOf("¤") == 0 ? "prefix" : "suffix";

      if (!Array.isArray(values)) {
        values = [min, max];
      }

      const format = wNumb({
        thousand: ",",
        decimals: maxFractionDigits,
        [signPosition]:
          signPosition === "prefix" ? currencySymbol : ` ${currencySymbol}`,
      });

      const sliderHandler = noUiSlider.create($slider.get(0), {
        start: values,
        tooltips: [true, true],
        connect: [false, true, false],
        range: {
          min,
          max,
        },
        format,
      });

      this.constructor.mergeTooltips($slider.get(0), 35, " - ");

      sliderHandler.off("set", handlerSliderChange);
      sliderHandler.on("set", handlerSliderChange);
    });
  }

  /**
   * @param slider HtmlElement with an initialized slider
   * @param threshold Minimum proximity (in percentages) to merge tooltips
   * @param separator String joining tooltips
   */
  static mergeTooltips (slider, threshold, separator) {
    const textIsRtl = getComputedStyle(slider).direction === "rtl";
    const isRtl = slider.noUiSlider.options.direction === "rtl";
    const isVertical = slider.noUiSlider.options.orientation === "vertical";
    const tooltips = slider.noUiSlider.getTooltips();
    const origins = slider.noUiSlider.getOrigins();

    // Move tooltips into the origin element. The default stylesheet handles this.
    tooltips.forEach(function (tooltip, index) {
      if (tooltip) {
        origins[index].appendChild(tooltip);
      }
    });

    slider.noUiSlider.on(
      "update",
      function (values, handle, unencoded, tap, positions) {
        const pools = [[]];
        const poolPositions = [[]];
        const poolValues = [[]];
        let atPool = 0;

        // Assign the first tooltip to the first pool, if the tooltip is configured
        if (tooltips[0]) {
          pools[0][0] = 0;
          poolPositions[0][0] = positions[0];
          poolValues[0][0] = values[0];
        }

        for (let i = 1; i < positions.length; i++) {
          if (!tooltips[i] || positions[i] - positions[i - 1] > threshold) {
            atPool++;
            pools[atPool] = [];
            poolValues[atPool] = [];
            poolPositions[atPool] = [];
          }

          if (tooltips[i]) {
            pools[atPool].push(i);
            poolValues[atPool].push(values[i]);
            poolPositions[atPool].push(positions[i]);
          }
        }

        pools.forEach(function (pool, poolIndex) {
          const handlesInPool = pool.length;

          for (let j = 0; j < handlesInPool; j++) {
            const handleNumber = pool[j];

            if (j === handlesInPool - 1) {
              let offset = 0;

              poolPositions[poolIndex].forEach(function (value) {
                offset += 1000 - 10 * value;
              });

              const direction = isVertical ? "bottom" : "right";
              const last = isRtl ? 0 : handlesInPool - 1;
              const lastOffset = 1000 - 10 * poolPositions[poolIndex][last];
              offset =
                (textIsRtl && !isVertical ? 100 : 0) +
                offset / handlesInPool -
                lastOffset;

              // Center this tooltip over the affected handles
              tooltips[handleNumber].innerHTML = poolValues[poolIndex].join(
                separator
              );
              tooltips[handleNumber].style.display = "block";
              tooltips[handleNumber].style[direction] = offset + "%";
            } else {
              // Hide this tooltip
              tooltips[handleNumber].style.display = "none";
            }
          }
        });
      }
    );
  }
}

export default Filters;
