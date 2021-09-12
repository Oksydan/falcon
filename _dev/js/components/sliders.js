import prestashop from 'prestashop';
import $ from 'jquery';
import PageSlider, {SwiperSlider} from './PageSlider';

$(() => {
  const slider = new PageSlider({
    slidesPerView: 1,
  });

  slider.runSliders();

  initProductImageSlider();
  initModalGallerySlider();

  prestashop.on('updatedProductCombination', () => {
    initModalGallerySlider();
    initProductImageSlider();
  });
});


function initProductImageSlider() {
  const $thumbs = $('.js-product-thumbs');
  const $galleryTop = $('.js-product-main-images');

  if ($thumbs.length === 0 && $galleryTop.length === 0) {
    return;
  }

  const galleryThumbs = new SwiperSlider($thumbs[0], {
    breakpoints: {
      320: {
        slidesPerView: 3,
      },
      576: {
        slidesPerView: 4,
      },
    },
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });

  /* eslint-disable no-new */
  new SwiperSlider($galleryTop[0], {
    spaceBetween: 10,
    navigation: {
      nextEl: $galleryTop.find('.swiper-button-next')[0],
      prevEl: $galleryTop.find('.swiper-button-prev')[0],
    },
    thumbs: {
      swiper: galleryThumbs,
    },
  });
}

function initModalGallerySlider() {
  const $gallery = $('.js-modal-gallery');

  if ($gallery.hasClass('swiper-container-initialized')) {
    return;
  }

  /* eslint-disable no-new */
  const modalSlider = new SwiperSlider($gallery[0], {
    slidesPerView: 1,
    spaceBetween: 10,
    freeMode: false,
    navigation: {
      nextEl: $gallery.find('.swiper-button-next')[0],
      prevEl: $gallery.find('.swiper-button-prev')[0],
    },
  });

  $('.js-product-images-modal').on('show.bs.modal', () => changeModalImage(modalSlider, $gallery));
}

function changeModalImage(modalSlider, $gallery) {
  const mainSliderIndex = $('.js-product-main-images .swiper-slide-active').attr('data-index');

  // DIRTY HACK
  $gallery.css({
    opacity: 0
  });
  setTimeout(() => {
    modalSlider.update();
    modalSlider.slideTo(mainSliderIndex, 0);
    $gallery.css({
      opacity: 1
    });
  }, 200);
}
