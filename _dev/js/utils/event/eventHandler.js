import EventHandler from 'bootstrap/js/src/dom/event-handler';

/**
 * Add event handler
 *
 * @description exposed to window as eventHandlerOn
 *
 * @param element {HTMLElement|Document|Window}
 * @param eventName {string}
 * @param handlerOrDelegation {string|function}
 * @param handler {function}
 */
export const on = (element, eventName, handlerOrDelegation, handler) => {
  EventHandler.on(element, eventName, handlerOrDelegation, handler);
};

/**
 * Add event handler that will be executed only once
 *
 * @description exposed to window as eventHandlerOne
 *
 * @param element {HTMLElement|Document|Window}
 * @param eventName {string}
 * @param handlerOrDelegation {string|function}
 * @param handler {function}
 */
export const one = (element, eventName, handlerOrDelegation, handler) => {
  EventHandler.one(element, eventName, handlerOrDelegation, handler);
};

/**
 * Remove event handler
 *
 * @description exposed to window as eventHandlerOff
 *
 * @param element {HTMLElement|Document|Window}
 * @param eventName {string}
 * @param handlerOrDelegation {string|function}
 * @param handler {function}
 */
export const off = (element, eventName, handlerOrDelegation, handler) => {
  EventHandler.off(element, eventName, handlerOrDelegation, handler);
};

/**
 * Trigger event
 *
 * @description exposed to window as eventHandlerTrigger
 *
 * @param element {HTMLElement}
 * @param eventName {string}
 * @param args {object}
 */
export const trigger = (element, eventName, args = {}) => {
  EventHandler.trigger(element, eventName, args);
};
