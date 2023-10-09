import prestashop from 'prestashop';
import DOMReady from "../../utils/DOMReady";
import PageSlider from './PageSlider';
import SwiperSlider from './SwiperSlider';

prestashop.pageSlider = new PageSlider();
prestashop.SwiperSlider = SwiperSlider;

DOMReady(() => {
  prestashop.pageSlider.init();
});
