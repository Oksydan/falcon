import useAlertToast from '../../../../components/useAlertToast';

const { danger } = useAlertToast();

const productUpdateErrorHandler = (event) => {
  if (event?.errorMessage) {
    danger(event.errorMessage);
  }
};

export default productUpdateErrorHandler;
