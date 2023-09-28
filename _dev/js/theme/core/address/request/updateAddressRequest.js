import useHttpRequest from '../../../components/http/useHttpRequest';
import useHttpController from '../../../components/http/useHttpController';
import useHttpPayloadDefinition from '../../../components/http/useHttpPayloadDefinition';

const { dispatch, abortAll } = useHttpController();

/**
 * @typedef ServerResponse
 * @type {object}
 * @property {string} address_form - new address form html content
 */

/**
 * Update listing facets request
 * @param url {string} - new url with from-xhr param
 * @param payload {object} - payload for request
 * @param payload.id_country {number} - country id
 * @param payload.id_address {number} - address id
 * @example
 *  const url = 'address-form.com/url'; // url to update address form
 *  const payload = {
 *      id_address: 1,
 *      id_country: 1,
 *  }
 *  const { getRequest } = updateAddressRequest(url, payload);
 *
 *  try {
 *    const resp = await getRequest();
 *  } catch (error) {
 *    console.error(error);
 *  }
 * @returns {{getRequest: (function(): Promise<ServerResponse>)}}
 */
const updateAddressRequest = (url, payload) => {
  const { request, controller } = useHttpRequest(url);

  const payloadDefinition = {
    id_country: {
      type: 'int',
      required: true,
    },
    id_address: {
      type: 'int',
      required: true,
    },
  };

  const { validatePayload } = useHttpPayloadDefinition(payload, payloadDefinition);

  const validationErrors = validatePayload();

  if (validationErrors.length) {
    throw Error(validationErrors.join(',\n'));
  }

  const getRequest = () => new Promise((resolve, reject) => {
    abortAll();

    dispatch(request, controller)(() => request
      .query(payload)
      .post()
      .json((resp) => {
        resolve(resp);
      })
      .catch((e) => {
        // IF ABORTED
        if (e instanceof DOMException) {
          return;
        }

        reject(e);
      }));
  });

  return {
    getRequest,
  };
};

export default updateAddressRequest;
