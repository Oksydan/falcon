import prestashop from 'prestashop';
import DOMReady from "../utils/DOMReady";
import PageSlider from './sliders/PageSlider';
import SwiperSlider from './sliders/SwiperSlider';

prestashop.pageSlider = new PageSlider();
prestashop.SwiperSlider = SwiperSlider;

DOMReady(() => {
  prestashop.pageSlider.init();
});
