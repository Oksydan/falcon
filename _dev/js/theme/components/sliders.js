import prestashop from 'prestashop';
import $ from 'jquery';
import PageSlider from '@js/theme/components/sliders/PageSlider';
import SwiperSlider from '@js/theme/components/sliders/SwiperSlider';

prestashop.pageSlider = new PageSlider();
prestashop.SwiperSlider = SwiperSlider;

$(() => {
  prestashop.pageSlider.init();
});
