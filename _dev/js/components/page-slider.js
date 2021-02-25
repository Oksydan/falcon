
import SwiperCore, { Swiper, Navigation, Pagination } from 'swiper/core';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([Navigation, Pagination]);


$(() => {
  initSlider();
})

function initSlider() {
  $('.swiper-container').each((i, el) => {
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


