import prestashop from 'prestashop';
import useEvent from '../../components/event/useEvent';
import submitVoucherHandler from './handler/voucher/submitVoucherHandler';
import codeLinkSubmitHandler from './handler/voucher/codeLinkSubmitHandler';
import deleteVoucherHandler from './handler/voucher/deleteVoucherHandler';

const { on } = useEvent();

/**
 * Cart controller
 * @returns {object} return
 * @returns {function} return.init initialize cart controller
 */
const cartController = () => {
  const init = () => {
    const {
      discountCode,
    } = prestashop.selectors.cart;

    on(document, 'submit', '.js-voucher-form', submitVoucherHandler);
    on(document, 'click', discountCode, codeLinkSubmitHandler);
    on(document, 'click', '.js-voucher-delete', deleteVoucherHandler);
  };

  return {
    init,
  };
};

export default cartController;
