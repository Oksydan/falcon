import prestashop from 'prestashop';
import useEvent from '../../components/event/useEvent';
import editAddressHandler from './handler/editAddressHandler';
import changeAddressHandler from './handler/changeAddressHandler';

const { on } = useEvent();

const checkoutController = () => {
  const {
    editAddresses,
    deliveryAddressRadios,
  } = prestashop.selectors.checkout;

  const init = () => {
    on(document, 'click', editAddresses, editAddressHandler);
    on(document, 'click', deliveryAddressRadios, changeAddressHandler);
  };

  return {
    init,
  };
};

export default checkoutController;
