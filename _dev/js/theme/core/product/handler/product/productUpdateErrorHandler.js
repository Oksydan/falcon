import useAlertToast from '../../../../components/useAlertToast';

const { danger } = useAlertToast();

/**
 * Handles product update errors by displaying a danger toast with the error message.
 *
 * @param {object} event - The event object containing the error message.
 * @returns {void}
 * @sidEffect Displays a danger toast with the error message.
 */
const productUpdateErrorHandler = (event) => {
  if (event?.errorMessage) {
    danger(event.errorMessage);
  }
};

export default productUpdateErrorHandler;
