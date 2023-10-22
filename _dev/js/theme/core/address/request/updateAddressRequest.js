import useHttpRequest from '../../../components/http/useHttpRequest';
import useHttpController from '../../../components/http/useHttpController';
import useHttpPayloadDefinition from '../../../components/http/useHttpPayloadDefinition';
import GenericHttpRequestError from '../../../components/http/error/GenericHttpRequestError';

/**
 * @typedef {Object} ServerResponse
 * @property {string} address_form - New address form HTML content.
 */

/**
 * Creates an update address request.
 *
 * @function
 * @param {string} url - The new URL with the from-xhr parameter.
 * @param {Object} payload - The payload for the request.
 * @param {number} payload.id_country - Country ID.
 * @param {number} payload.id_address - Address ID.
 * @example
 * const url = 'address-form.com/url'; // URL to update the address form
 * const payload = {
 *   id_address: 1,
 *   id_country: 1,
 * };
 * const { getRequest } = updateAddressRequest(url, payload);
 *
 * try {
 *   const resp = await getRequest();
 * } catch (error) {
 *   console.error(error);
 * }
 * @returns {{getRequest: (function(): Promise<ServerResponse>)}}
 * @throws {Error} Throws an error if the payload validation fails.
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

  /**
   * Retrieves the HTTP request function for updating the address.
   *
   * @function
   * @returns {Promise<ServerResponse>} A Promise that resolves with the server response.
   * @throws {GenericHttpRequestError} Throws an error if there is an issue with the HTTP request.
   */
  const getRequest = () => new Promise((resolve, reject) => {
    useHttpController.abortAll();

    useHttpController.dispatch(request, controller)(() => request
      .query(payload)
      .post()
      .json((resp) => {
        resolve(resp);
      })
      .catch((e) => {
        // If ABORTED
        if (e instanceof DOMException) {
          return;
        }

        reject(new GenericHttpRequestError('Error while sending request'));
      }));
  });

  return {
    getRequest,
  };
};

export default updateAddressRequest;
