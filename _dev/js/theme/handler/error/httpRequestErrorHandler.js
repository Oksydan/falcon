import GenericHttpRequestError from "../../components/http/error/GenericHttpRequestError";
import useAlertToast from "../../components/useAlertToast";
import prestashop from 'prestashop';

const { danger } = useAlertToast();

const httpRequestErrorHandler = ({
                        resp = {},
                        error = null,
                      }) => {
  if (error && error instanceof GenericHttpRequestError) {
    danger(prestashop.t.alert.genericHttpError);
  } else if (typeof resp.errors !== 'undefined') {
    const errors = resp.errors;
    const errorMessage = Array.isArray(errors) ? errors.join('\n') : errors;

    danger(errorMessage);
  }
}

export default httpRequestErrorHandler;
