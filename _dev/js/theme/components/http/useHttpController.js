import getUniqueId from '@js/theme/utils/getUniqueId';

/**
 * @module useHttpController
 * This function is used to control HTTP requests.
 */
const useHttpController = () => {
  let requestsStack = {};

  /**
   * @method
   * Adds request to request stack
   * @param {int} id - unique id of request
   * @param {Promise} request - request promise
   * @param {AbortController} controller - AbortController object
   */
  const addRequestToRequestStack = (id, request, controller) => {
    const newRequestStack = { ...requestsStack };
    newRequestStack[id] = { request, controller };

    requestsStack = newRequestStack;
  };

  /**
   * @method
   * Removes request from request stack
   * @param {int} id - unique id of request
   */
  const removeRequestFromRequestStack = (id) => {
    const { [id]: erasedId, ...newRequestStack } = requestsStack;

    requestsStack = newRequestStack;
  };

  /**
   * @method
   * Dispatches request and adds it to request stack
   * @param {object} request - request object
   * @param {AbortController} controller - AbortController object
   * @returns {(function(*): Promise<void>)|*}
   */
  const dispatch = (request, controller) => {
    const id = getUniqueId();
    addRequestToRequestStack(id, request, controller);

    return async (callback) => {
      await callback({ request, controller });
      removeRequestFromRequestStack(id);
    };
  };

  /**
   * @method
   * Aborts all requests in request stack
   * @returns {void}
   */
  const abortAll = () => {
    for (const id in requestsStack) {
      if (Object.hasOwn(requestsStack, id)) {
        const { controller } = requestsStack[id];
        controller.abort();

        removeRequestFromRequestStack(id);
      }
    }
  };

  return {
    dispatch,
    abortAll,
  };
};

export default useHttpController;
