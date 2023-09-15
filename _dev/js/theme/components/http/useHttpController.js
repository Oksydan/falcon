import getUniqueId from '@js/theme/utils/getUniqueId';

/**
 * @description This function is used to control HTTP requests.
 * @returns {{dispatch: (function(*, *): function(*): Promise<void>), abortAll: abortAll}}
 */
const useHttpController = () => {
  let requestsStack = {};

  const addRequestToRequestStack = (id, request, controller) => {
    const newRequestStack = { ...requestsStack };
    newRequestStack[id] = { request, controller };

    requestsStack = newRequestStack;
  };

  const removeRequestFromRequestStack = (id) => {
    const { [id]: erasedId, ...newRequestStack } = requestsStack;

    requestsStack = newRequestStack;
  };

  const dispatch = (request, controller) => {
    const id = getUniqueId();
    addRequestToRequestStack(id, request, controller);

    return async (callback) => {
      await callback({ request, controller });
      removeRequestFromRequestStack(id);
    };
  };

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
