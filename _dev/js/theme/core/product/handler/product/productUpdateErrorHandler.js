import useAlertToast from '../../../../components/useAlertToast';

const { danger } = useAlertToast();

/**
 * Handle product update error
 * @param event
 */
const productUpdateErrorHandler = (event) => {
  if (event?.errorMessage) {
    danger(event.errorMessage);
  }
};

export default productUpdateErrorHandler;
