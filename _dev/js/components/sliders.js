import prestashop from 'prestashop';
import $ from 'jquery';
import PageSlider from './sliders/PageSlider';
import SwiperSlider from './sliders/SwiperSlider';

prestashop.pageSlider = new PageSlider();
prestashop.SwiperSlider = SwiperSlider;

$(() => {
  prestashop.pageSlider.init();
});
