import prestashop from 'prestashop';

import SwiperCore, { Swiper, Navigation, Pagination, Thumbs } from 'swiper';


SwiperCore.use([Navigation, Pagination, Thumbs]);

class PageSlider {

  constructor ({ defaultOptions } = {}) {
    this.sliders = [];
    this.defaultOptions = defaultOptions;
    this.init();
  }

  init() {
    $('.swiper-container:not(.swiper-container-initialized)').not('.swiper-container-custom').each((i, el) => {
      this.addSlider(el);
    })
  }

  addSlider(el) {
    const $el = $(el);
    let elConfig = $el.data('swiper');
    const $parent = $el.parent();
    const $nextEl = $parent.find('.swiper-button-next');
    const $prevEl = $parent.find('.swiper-button-prev');

    if($nextEl.length && $prevEl.length) {
      elConfig = {
        ...elConfig,
        navigation: {
          nextEl: $nextEl[0],
          prevEl: $prevEl[0],
        },
      }
    }

    this.sliders.push({
      el: el,
      config: this.mergeConfig(elConfig)
    });
  }

  mergeConfig(config) {
    return {
      ...this.defaultOptions,
      ...config
    }
  }

  runSliders() {
    for(const slider of this.sliders) {
      const swiper = new Swiper(slider.el, slider.config);
    }

    this.sliders = [];
  }

  refresh() {
    this.init();
    this.runSliders();
  }

}


$(() => {
  const slider = new PageSlider({
    slidesPerView: 1
  });

  slider.runSliders();

  initProductImageSlider();
  bindProductModalSlider();

  prestashop.on('updatedProductCombination', () => {
    bindProductModalSlider();
    initProductImageSlider();
  });
})



function initProductImageSlider() {
  const $thumbs = $('.js-product-thumbs');
  const $galleryTop = $('.js-product-main-images');

  if($thumbs.length === 0 && $galleryTop.length === 0) {
    return;
  }

  const galleryThumbs = new Swiper($thumbs[0], {
    spaceBetween: 10,
    breakpoints: {
      320: {
        slidesPerView: 3
      },
      576: {
        slidesPerView: 4
      }
    },
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });

  const galleryTop = new Swiper($galleryTop[0], {
    spaceBetween: 10,
    navigation: {
      nextEl: $galleryTop.find('.swiper-button-next')[0],
      prevEl: $galleryTop.find('.swiper-button-prev')[0],
    },
    thumbs: {
      swiper: galleryThumbs
    }
  });
}

function bindProductModalSlider() {
  $('.js-product-images-modal').on('shown.bs.modal', initModalGallerySlider);
}

function initModalGallerySlider() {
  const $gallery = $('.js-modal-gallery');

  console.log('init slider modal');

  if($gallery.hasClass('swiper-container-initialized')) {
    return;
  }

  const modalGallerySwiper = new Swiper($gallery[0], {
    slidesPerView: 1,
    spaceBetween: 10,
    freeMode: false,
    navigation: {
      nextEl: $gallery.find('.swiper-button-next')[0],
      prevEl: $gallery.find('.swiper-button-prev')[0],
    },
  });
}
