import prestashop from 'prestashop';

import SwiperCore, { Swiper, Navigation, Pagination, Thumbs } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/thumbs/thumbs.scss';

SwiperCore.use([Navigation, Pagination, Thumbs]);


$(() => {
  initSlider();
  initProductImageSlider();
  bindProductModalSlider();

  prestashop.on('updatedProductCombination', () => {
    bindProductModalSlider();
    initProductImageSlider();
  });
})

function initSlider() {
  $('.swiper-container.product-slider').each((i, el) => {
    const $el = $(el);
    const $parent = $(el).parent();
    const nextEl = $parent.find('.swiper-button-next');
    const prevEl = $parent.find('.swiper-button-prev');

    const swiper = new Swiper(el, {
      speed: 500,
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 20
        }
      },
      navigation: {
        nextEl: nextEl[0],
        prevEl: prevEl[0],
      },
    });
  })
}


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
