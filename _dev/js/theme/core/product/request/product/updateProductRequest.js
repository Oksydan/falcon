import prestashop from 'prestashop';
import useHttpRequest from '../../../../components/http/useHttpRequest';
import useHttpController from '../../../../components/http/useHttpController';
import useHttpPayloadDefinition from '../../../../components/http/useHttpPayloadDefinition';
import GenericHttpRequestError from '../../../../components/http/error/GenericHttpRequestError';

const { dispatch, abortAll } = useHttpController();

/**
 * Server response object for the update product request.
 *
 * @typedef {object} ServerResponse
 * @property {number} id_customization - Saved customization id.
 * @property {number} id_product_attribute - Saved product attribute id.
 * @property {number} product_minimal_quantity - Product minimal quantity.
 * @property {boolean} is_quick_view - Indicates if it's a quick view.
 * @property {boolean} product_has_combinations - Indicates if the product has combinations.
 * @property {string} product_url - Product URL address.
 * @property {string} product_title - Product meta title.
 * @property {string} product_add_to_cart - Product "Add to Cart" HTML content.
 * @property {string} product_additional_info - Product additional info HTML content.
 * @property {string} product_cover_thumbnails - Product cover thumbnails HTML content.
 * @property {string} product_customization - Product customization HTML content.
 * @property {string} product_details - Product details HTML content.
 * @property {string} product_discounts - Product discounts HTML content.
 * @property {string} product_flags - Product flags HTML content.
 * @property {string} product_prices - Product prices HTML content.
 * @property {string} product_images_modal - Product images modal HTML content.
 * @property {string} product_variants - Product variants HTML content.
 */

/**
 * Update listing facets request.
 *
 * @param {object} payload - Payload for the request.
 * @param {number} payload.preview - Is preview (1 or 0).
 * @param {number} payload.quickview - Is quick view (1 or 0).
 * @param {number} payload.quantity_wanted - Quantity wanted.
 * @param {number} payload.id_product - Product ID.
 * @param {number} payload.id_product_attribute - Product attribute ID.
 * @param {number} [payload.id_customization=0] - Customization ID (optional, default 0).
 * @param {number} [payload.ajax=1] - AJAX flag (optional, default 1).
 * @param {string} [payload.action='refresh'] - Action (optional, default 'refresh').
 * @param {Array} [payload.group] - Array of attributes groups (optional).
 * @example
 * const payload = {
 *    id_product: 1,
 *    id_product_attribute: 1,
 *    quantity_wanted: 1,
 *    preview: 0,
 *    quickview: 0,
 * };
 * const { getRequest } = updateProductRequest(payload);
 *
 * try {
 *    const resp = await getRequest();
 * } catch (error) {
 *    console.error(error);
 * }
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

  /**
   * Get the request function for the update product request.
   *
   * @function
   * @returns {Promise<ServerResponse>} - Promise that resolves to the server response.
   */
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

          reject(new GenericHttpRequestError('Error while sending request'));
        }));
    });
  };

  return {
    getRequest,
  };
};

export default updateProductRequest;
