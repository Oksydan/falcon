import updateProduct from '@js/theme/core/product/updateProduct';
import productController from "./productController";
import DOMReady from "../../utils/DOMReady";

const { init } = productController();

DOMReady(() => {
  updateProduct();
  init();
})
