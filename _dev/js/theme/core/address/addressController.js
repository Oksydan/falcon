import useEvent from '../../components/event/useEvent';
import changeAddressCountryHandler from './handler/changeAddressCountryHandler';

/**
 * @typedef {Object} AddressController
 * @property {function} init - Initializes the address controller.
 */

const { on } = useEvent();

/**
 * Creates an address controller.
 *
 * @function
 * @returns {AddressController} An object with methods to manage the address controller.
 */
const addressController = () => {
  /**
   * Initializes the address controller.
   *
   * @method
   */
  const init = () => {
    on(document, 'change', '.js-country', changeAddressCountryHandler);
  };

  return {
    init,
  };
};

export default addressController;
