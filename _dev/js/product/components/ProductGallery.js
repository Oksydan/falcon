class ProductGallery {
  constructor({
    thumbsSliderSelector = '.js-product-thumbs',
    mainSliderSelector = '.js-product-main-images',
    modalSliderSelector = '.js-modal-gallery',
    galleryModalSelector = '.js-product-images-modal',
  } = {}) {
    this.thumbsSliderSelector = thumbsSliderSelector;
    this.mainSliderSelector = mainSliderSelector;
    this.modalSliderSelector = modalSliderSelector;
    this.galleryModalSelector = galleryModalSelector;
    this.mainSliderSwiperInstance = null;
    this.modalSliderSwiperInstance = null;
  }

  init() {
    this.mainSliderSwiperInstance = null;
    this.modalSliderSwiperInstance = null;
    this.initProductImageSlider();
    this.initModalGallerySlider();
  }

  async initProductImageSlider() {
    const thumbsElem = document.querySelector(this.thumbsSliderSelector);
    const galleryTopElem = document.querySelector(this.mainSliderSelector);

    if (!thumbsElem && !galleryTopElem) {
      return;
    }

    const galleryThumbs = new prestashop.SwiperSlider(thumbsElem, {
      breakpoints: {
        320: {
          slidesPerView: 3,
        },
        576: {
          slidesPerView: 4,
        },
      },
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });

    const galleryThumbsInstance = await galleryThumbs.initSlider();

    const mainSlider = new prestashop.SwiperSlider(galleryTopElem, {
      spaceBetween: 10,
      navigation: {
        nextEl: galleryTopElem.querySelector('.swiper-button-next'),
        prevEl: galleryTopElem.querySelector('.swiper-button-prev'),
      },
      thumbs: {
        swiper: galleryThumbsInstance,
      },
    });

    const mainSliderInstance = await mainSlider.initSlider();

    this.mainSliderSwiperInstance = mainSliderInstance;
  }

  initModalGallerySlider() {
    const gallerySliderElem = document.querySelector(this.modalSliderSelector);

    if (!gallerySliderElem) {
      return;
    }

    const handleModalOpen = async () => {
      if (this.modalSliderSwiperInstance) {
        gallerySliderElem.style.opacity = 0;

        // DIRTY HACK
        setTimeout(() => {
          this.modalSliderSwiperInstance.update();
          this.modalSliderSwiperInstance.slideTo(this.mainSliderSwiperInstance ? this.mainSliderSwiperInstance.activeIndex : 0, 0);
          gallerySliderElem.style.opacity = 1;
        }, 200);
      } else {
        const modalSlider = new prestashop.SwiperSlider(gallerySliderElem, {
          slidesPerView: 1,
          spaceBetween: 10,
          initialSlide: this.mainSliderSwiperInstance ? this.mainSliderSwiperInstance.activeIndex : 0,
          navigation: {
            nextEl: gallerySliderElem.querySelector('.swiper-button-next'),
            prevEl: gallerySliderElem.querySelector('.swiper-button-prev'),
          },
        });

        const modalSliderInstance = await modalSlider.initSlider();

        this.modalSliderSwiperInstance = modalSliderInstance;
      }
    };

    // TO REFACTO LATER WITH BS5 REMOVE JQUERY!
    $(this.galleryModalSelector).on('show.bs.modal', handleModalOpen);
  }
}

export default ProductGallery;
