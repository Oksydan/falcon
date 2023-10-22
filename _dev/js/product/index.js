import ProductGallery from './components/ProductGallery';
import DOMReady from '../theme/utils/DOMReady';

DOMReady(() => {
  const gallery = new ProductGallery();

  gallery.init();
});
