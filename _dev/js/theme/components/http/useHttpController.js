import getUniqueId from '@js/theme/utils/getUniqueId';

const useHttpController = () => {
    let requestsStack = {};

    const addRequestToRequestStack = (id, request, controller) => {
        const newRequestStack = { ...requestsStack };
        newRequestStack[id] = { request, controller };

        requestsStack = newRequestStack;
    }

    const removeRequestFromRequestStack = (id) => {
        const { [id]: erasedId, ...newRequestStack } = requestsStack;

        requestsStack = newRequestStack;
    }

    const dispatch = (request, controller) => {
        const id = getUniqueId();
        addRequestToRequestStack(id, request, controller);

        return (callback) => {
            const flush = () => removeRequestFromRequestStack(id);

            callback({ request, callback , flush });
        }
    }

    const abortAll = () => {
        for (const id in requestsStack) {
            const { controller } = requestsStack[id];
            controller.abort();

            removeRequestFromRequestStack(id);
        }
    }

    return {
        dispatch,
        abortAll,
    }
}

export default useHttpController;
