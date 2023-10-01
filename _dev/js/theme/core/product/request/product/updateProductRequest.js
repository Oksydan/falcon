import prestashop from 'prestashop';
import useHttpRequest from '../../../../components/http/useHttpRequest';
import useHttpController from '../../../../components/http/useHttpController';
import useHttpPayloadDefinition from '../../../../components/http/useHttpPayloadDefinition';

const { dispatch, abortAll } = useHttpController();

/**
 * @typedef ServerResponse
 * @type {object}
 * @property {string} address_form - new address form html content
 */

/**
 * Update listing facets request
 * @param payload {object} - payload for request
 * @param payload.preview {number} - is preview 1 or 0
 * @param payload.quickview {number} - is quick view 1 or 0
 * @param payload.quantity_wanted {number} - quantity wanted
 * @param payload.id_product {number} - product id
 * @param payload.id_product_attribute {number} - product attribute id
 * @param payload.id_customization {number} - customization id - optional, default 0
 * @param payload.ajax {number} - optional, default 1
 * @param payload.action {string} - optional, default refresh
 * @param payload.group[] {array} - array of attributes groups - optional
 * @example
 *  const url = 'address-form.com/url'; // url to update address form
 *  const payload = {
 *      id_product: 1,
 *      id_product_attribute: 1,
 *      quantity_wanted: 1,
 *      preview: 0,
 *      quickview: 0,
 *  }
 *  const { getRequest } = updateProductRequest(payload);
 *
 *  try {
 *    const resp = await getRequest();
 *  } catch (error) {
 *    console.error(error);
 *  }
 * @returns {{getRequest: (function(): Promise<ServerResponse>)}}
 */
const updateProductRequest = (payload) => {
  const { request, controller } = useHttpRequest(prestashop.urls.pages.product);
  const payloadToSend = {
    ajax: 1,
    action: 'refresh',
    ...payload,
  };

  const payloadDefinition = {
    action: {
      type: 'string',
      required: true,
    },
    ajax: {
      type: 'int',
      required: true,
    },
    preview: {
      type: 'int',
      required: true,
    },
    quickview: {
      type: 'int',
      required: true,
    },
    quantity_wanted: {
      type: 'int',
      required: true,
    },
    id_product: {
      type: 'int',
      required: true,
    },
    id_product_attribute: {
      type: 'int',
      required: true,
    },
    id_customization: {
      type: 'int',
      required: false,
    },
  };

  const { validatePayload } = useHttpPayloadDefinition(payloadToSend, payloadDefinition);

  const validationErrors = validatePayload();

  if (validationErrors.length) {
    throw Error(validationErrors.join(',\n'));
  }

  const getRequest = () => {
    abortAll();

    return new Promise((resolve, reject) => {
      dispatch(request, controller)(() => request
        .query(payloadToSend)
        .post()
        .json((resp) => {
          resolve(resp);
        })
        .catch((e) => {
          // IF ABORTED
          if (e instanceof DOMException) {
            return;
          }

          reject();
        }));
    });
  };

  return {
    getRequest,
  };
};

export default updateProductRequest;
