import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import FiltersUrlHandler from './components/FiltersUrlHandler';
import $ from 'jquery';
import prestashop from 'prestashop';

$(() => {
  initFilersSlider();

  $('body').on('click', '#search_filter_toggler', () => {
    $('#search_filters_wrapper').removeClass('hidden-sm-down');
    $('#content-wrapper').addClass('hidden-sm-down');
    $('#footer').addClass('hidden-sm-down');
  });
  $('#search_filter_controls .clear').on('click', () => {
    $('#search_filters_wrapper').addClass('hidden-sm-down');
    $('#content-wrapper').removeClass('hidden-sm-down');
    $('#footer').removeClass('hidden-sm-down');
  });
  $('#search_filter_controls .ok').on('click', () => {
    $('#search_filters_wrapper').addClass('hidden-sm-down');
    $('#content-wrapper').removeClass('hidden-sm-down');
    $('#footer').removeClass('hidden-sm-down');
  });

  const parseSearchUrl = (event) => {
    if (event.target.dataset.searchUrl !== undefined) {
      return event.target.dataset.searchUrl;
    }

    if ($(event.target).parent()[0].dataset.searchUrl === undefined) {
      throw new Error('Can not parse search URL');
    }

    return $(event.target).parent()[0].dataset.searchUrl;
  };

  $('body').on('change', '#search_filters input[data-search-url]', (event) => {
    prestashop.emit('updateFacets', parseSearchUrl(event));
  });

  $('body').on('click', '.js-search-filters-clear-all', (event) => {
    prestashop.emit('updateFacets', parseSearchUrl(event));
  });

  $('body').on('click', '.js-search-link', (event) => {
    event.preventDefault();
    prestashop.emit('updateFacets', $(event.target).closest('a').get(0).href);
  });

  $('body').on('change', '[data-action="search-select"]', ({target}) => {
    prestashop.emit('updateFacets', $(target).find('option:selected').data('href'));
  });

  $('body').on('change', '#search_filters select', ({target}) => {
    const form = $(target).closest('form');
    prestashop.emit('updateFacets', `?${form.serialize()}`);
  });

  prestashop.on('updateProductList', (data) => {
    updateProductListDOM(data);
    window.scrollTo(0, 0);
  });
});


function updateProductListDOM(data) {
  $('#search_filters').replaceWith(data.rendered_facets);
  $('#js-active-search-filters').replaceWith(data.rendered_active_filters);
  $('#js-product-list-top').replaceWith(data.rendered_products_top);
  $('#js-product-list').replaceWith(data.rendered_products);
  $('#js-product-list-bottom').replaceWith(data.rendered_products_bottom);
  if (data.rendered_products_header) {
    $('#js-product-list-header').replaceWith(data.rendered_products_header);
  }

  prestashop.BSSelect.init();
  prestashop.emit('updatedProductList', data);
  initFilersSlider();
}

function initFilersSlider() {
  const $rangeSliders = $('.js-range-slider');

  const handlerSliderChange = (values, handle, unencoded, tap, positions, noUiSlider) => {
    const formatFunction = noUiSlider.options.format;
    const $target = $(noUiSlider.target);
    const group = $target.data('slider-label');
    const unit = $target.data('slider-unit');
    const [ from, to ] = values.map(val => formatFunction.from(val));

    const filtersHandler = new FiltersUrlHandler();
    filtersHandler.setRangeParams(group, {unit, from, to});

    const newUrl = filtersHandler.getFiltersUrl();
    prestashop.emit('updateFacets', newUrl);
  }

  $rangeSliders.each((i, slider) => {
    const $slider = $(slider);
    const min = $slider.data('slider-min');
    const max = $slider.data('slider-max');
    const {
      maxFractionDigits,
      currencySymbol,
      positivePattern
    } = $slider.data('slider-specifications');
    let values = $slider.data('slider-values');

    const signPosition = positivePattern.indexOf('¤') == 0 ? 'prefix' : 'suffix';

    if(!Array.isArray(values)) {
      values = [min, max];
    }

    const format = wNumb({
      thousand: ',',
      decimals: maxFractionDigits,
      [signPosition]: signPosition === 'prefix' ? currencySymbol : ` ${currencySymbol}`
    });

    const sliderHandler = noUiSlider.create($slider.get(0), {
      start: values,
      tooltips: [true, true],
      connect: [false, true, false],
      range: {
        min,
        max
      },
      format
    });

    mergeTooltips($slider.get(0), 35, ' - ');

    sliderHandler.off('end', handlerSliderChange);
    sliderHandler.on('end', handlerSliderChange);
  })

}


/**
 * @param slider HtmlElement with an initialized slider
 * @param threshold Minimum proximity (in percentages) to merge tooltips
 * @param separator String joining tooltips
 */
function mergeTooltips(slider, threshold, separator) {

  var textIsRtl = getComputedStyle(slider).direction === 'rtl';
  var isRtl = slider.noUiSlider.options.direction === 'rtl';
  var isVertical = slider.noUiSlider.options.orientation === 'vertical';
  var tooltips = slider.noUiSlider.getTooltips();
  var origins = slider.noUiSlider.getOrigins();

  // Move tooltips into the origin element. The default stylesheet handles this.
  tooltips.forEach(function (tooltip, index) {
      if (tooltip) {
          origins[index].appendChild(tooltip);
      }
  });

  slider.noUiSlider.on('update', function (values, handle, unencoded, tap, positions) {

      var pools = [[]];
      var poolPositions = [[]];
      var poolValues = [[]];
      var atPool = 0;

      // Assign the first tooltip to the first pool, if the tooltip is configured
      if (tooltips[0]) {
          pools[0][0] = 0;
          poolPositions[0][0] = positions[0];
          poolValues[0][0] = values[0];
      }

      for (var i = 1; i < positions.length; i++) {
          if (!tooltips[i] || (positions[i] - positions[i - 1]) > threshold) {
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
          var handlesInPool = pool.length;

          for (var j = 0; j < handlesInPool; j++) {
              var handleNumber = pool[j];

              if (j === handlesInPool - 1) {
                  var offset = 0;

                  poolPositions[poolIndex].forEach(function (value) {
                      offset += 1000 - 10 * value;
                  });

                  var direction = isVertical ? 'bottom' : 'right';
                  var last = isRtl ? 0 : handlesInPool - 1;
                  var lastOffset = 1000 - 10 * poolPositions[poolIndex][last];
                  offset = (textIsRtl && !isVertical ? 100 : 0) + (offset / handlesInPool) - lastOffset;

                  // Center this tooltip over the affected handles
                  tooltips[handleNumber].innerHTML = poolValues[poolIndex].join(separator);
                  tooltips[handleNumber].style.display = 'block';
                  tooltips[handleNumber].style[direction] = offset + '%';
              } else {
                  // Hide this tooltip
                  tooltips[handleNumber].style.display = 'none';
              }
          }
      });
  });
}
