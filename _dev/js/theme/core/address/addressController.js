import useEvent from '../../components/event/useEvent';
import changeAddressCountryHandler from './handler/changeAddressCountryHandler';

const { on } = useEvent();

const addressController = () => {
  const init = () => {
    on(document, 'change', '.js-country', changeAddressCountryHandler);
  };

  return {
    init,
  };
};

export default addressController;
