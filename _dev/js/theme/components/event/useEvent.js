import $ from 'jquery';
import EventHandler from "bootstrap/js/src/dom/event-handler";

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
    EventHandler.on(element, eventName, handlerOrDelegation, handler);
  };

  /**
     * Add event handler that will be executed only once
     * @param element {HTMLElement}
     * @param eventName {string}
     * @param handlerOrDelegation {string|function}
     * @param handler {function}
     */
  const one = (element, eventName, handlerOrDelegation, handler) => {
    EventHandler.one(element, eventName, handlerOrDelegation, handler);
  };

  /**
     * Remove event handler
     * @param element {HTMLElement}
     * @param eventName {string}
     * @param handlerOrDelegation {string|function}
     * @param handler {function}
     */
  const off = (element, eventName, handlerOrDelegation, handler) => {
    EventHandler.off(element, eventName, handlerOrDelegation, handler);
  };

  /**
     * Trigger event
     * @param element {HTMLElement}
     * @param eventName {string}
     * @param args {object}
     */
  const trigger = (element, eventName, args = {}) => {
    EventHandler.trigger(element, eventName, args);
  };

  return {
    on,
    off,
    one,
    trigger,
  };
};

export default useEvent;
