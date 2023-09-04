import $ from 'jquery';

/**
 * Function that will help you to add/remove/trigger events
 * @returns {{one, trigger, off, on}}
 */
const useEvent = () => {
    /**
     * Add event handler
     * @param element {HTMLElement}
     * @param eventName {string}
     * @param handlerOrDelegation {string|function}
     * @param handler {function}
     */
    const on = (element, eventName, handlerOrDelegation, handler) => {
        if (typeof handlerOrDelegation === 'function') {
            $(element).on(eventName, handlerOrDelegation);
        } else {
            $(element).on(eventName, handlerOrDelegation, handler);
        }
    }

    /**
     * Add event handler that will be executed only once
     * @param element {HTMLElement}
     * @param eventName {string}
     * @param handlerOrDelegation {string|function}
     * @param handler {function}
     */
    const one = (element, eventName, handlerOrDelegation, handler) => {
        if (typeof handlerOrDelegation === 'function') {
            $(element).one(eventName, handlerOrDelegation);
        } else {
            $(element).one(eventName, handlerOrDelegation, handler);
        }
    }

    /**
     * Remove event handler
     * @param element {HTMLElement}
     * @param eventName {string}
     * @param handlerOrDelegation {string|function}
     * @param handler {function}
     */
    const off = (element, eventName, handlerOrDelegation, handler) => {
        if (typeof handlerOrDelegation === 'function') {
            $(element).off(eventName, handlerOrDelegation);
        } else {
            $(element).off(eventName, handlerOrDelegation, handler);
        }
    }

    /**
     * Trigger event
     * @param element {HTMLElement}
     * @param eventName {string}
     * @param args {object}
     */
    const trigger = (element, eventName, args = {}) => {
        $(element).trigger(eventName, args);
    }

    return {
        on,
        off,
        one,
        trigger,
    }
}

export default useEvent;
