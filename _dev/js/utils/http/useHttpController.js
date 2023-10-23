import getUniqueId from '../getUniqueId';

/**
 * @module useHttpController
 * This module provides functions for controlling HTTP requests.
 */
const useHttpController = () => {
  let requestsStack = {};

  /**
   * Adds a request to the request stack.
   *
   * @method
   * @param {number} id - Unique id of the request.
   * @param {Promise} request - The request promise.
   * @param {AbortController} controller - The AbortController object.
   */
  const addRequestToRequestStack = (id, request, controller) => {
    const newRequestStack = { ...requestsStack };
    newRequestStack[id] = { request, controller };
    requestsStack = newRequestStack;
  };

  /**
   * Removes a request from the request stack.
   *
   * @method
   * @param {number} id - Unique id of the request.
   */
  const removeRequestFromRequestStack = (id) => {
    const { [id]: erasedId, ...newRequestStack } = requestsStack;
    requestsStack = newRequestStack;
  };

  /**
   * Dispatches a request and adds it to the request stack.
   *
   * @method
   * @param {object} request - The request object.
   * @param {AbortController} controller - The AbortController object.
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
   * Aborts all requests in the request stack.
   *
   * @method
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
