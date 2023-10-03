import isQuickViewOpen from "./isQuickViewOpen";
import prestashop from "prestashop";

const productEventContextSelector = () => {
  const {
    quickViewModal,
    container,
  } = prestashop.selectors.product;

  return isQuickViewOpen() ? quickViewModal : container;
}

export default productEventContextSelector;
