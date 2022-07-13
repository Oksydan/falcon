import SwiperSlider from './SwiperSlider';

class PageSlider {
  constructor() {
    this.observeElementClass = 'js-slider-observed';
    this.selfInitializedSlidersSelector = '.swiper:not(.swiper-custom)';
  }

  init() {
    const self = this;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(({ intersectionRatio, target }) => {
        if (intersectionRatio > 0) {
          self.observer.unobserve(target);
          self.initSlider(target);
        }
      });
    });

    this.observerElements();
  }

  initSlider(target) {
    new SwiperSlider(target, this.getConfigForSliderElement(target));
  }

  getConfigForSliderElement(target) {
    let elConfig = target.dataset.swiper || {};

    if (typeof elConfig === 'string') {
      elConfig = JSON.parse(elConfig);
    }

    const parent = target.parentElement;
    const nextEl = parent.querySelector('.swiper-button-next');
    const prevEl = parent.querySelector('.swiper-button-prev');
    const pagination = parent.querySelector('.swiper-pagination');

    if (nextEl && prevEl && typeof elConfig.navigation === 'undefined') {
      elConfig = {
        ...elConfig,
        navigation: {
          nextEl: nextEl,
          prevEl: prevEl,
        },
      };
    }

    if (pagination && typeof elConfig.pagination === 'undefined') {
      elConfig = {
        ...elConfig,
        pagination: {
          el: pagination,
          type: 'bullets',
          clickable: true,
        },
      };
    }

    return elConfig;
  }

  observerElements() {
    var elms = document.querySelectorAll(this.selfInitializedSlidersSelector);

    for (var i = 0; i < elms.length; i++) {
      const elem = elms[i];

      if (!elem.classList.contains(this.observeElementClass)) {
        this.observer.observe(elem);
        elem.classList.add(this.observeElementClass);
      }
    }
  }

  refresh() {
    this.observerElements();
  }
}

export default PageSlider;
