import useEvent from '../../components/event/useEvent';

const { on, off } = useEvent();

/**
 * Handles dynamic import events by binding and unbinding specified events on the document.
 * @param {Array} events - An array of event configurations, each containing a name and selector.
 * @param {Function} handler - The event handler function.
 * @returns {{
 *   bindEvents: Function,
 *   unbindEvents: Function,
 * }}
 */
const useDynamicImportEventsHandler = (events, handler) => {
  /**
   * Binds the specified events on the document.
   * @returns {void}
   */
  const bindEvents = () => {
    events.forEach(({ name = '', selector = '' }) => {
      if (!name || !selector) {
        throw new Error('Event name and selector are required');
      }

      on(document, name, selector, handler);
    });
  };

  /**
   * Unbinds the specified events on the document.
   * @returns {void}
   */
  const unbindEvents = () => {
    events.forEach(({ name = '', selector = '' }) => {
      if (!name || !selector) {
        throw new Error('Event name and selector are required');
      }

      off(document, name, selector, handler);
    });
  };

  return {
    bindEvents,
    unbindEvents,
  };
};

export default useDynamicImportEventsHandler;
