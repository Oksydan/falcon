import ProductGallery from './components/ProductGallery';
import { DOMReady } from '../utils/DOM/DOMHelpers';

DOMReady(() => {
  const gallery = new ProductGallery();

  gallery.init();
});
