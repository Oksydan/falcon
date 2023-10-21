import useEvent from '../../components/event/useEvent';

const { on, off } = useEvent();

/**
 * Use dynamic import events handler
 * @param {array} events - Array of events
 * @param {function} handler - Event handler
 * @return {{
 * bindEvents: function(): (void),
 * unbindEvents: (function(): (void)),
 * }}
 */
const useDynamicImportEventsHandler = (events, handler) => {
  /**
   * Bind events
   * @return {void}
   */
  const bindEvents = () => {
    events.forEach(({
      name = '',
      selector = '',
    }) => {
      if (!name || !selector) {
        throw new Error('Event name and selector are required');
      }

      on(
        document,
        name,
        selector,
        handler,
      );
    });
  };

  /**
   * Unbind events
   * @return {void}
   */
  const unbindEvents = () => {
    events.forEach(({
      name = '',
      selector = '',
    }) => {
      if (!name || !selector) {
        throw new Error('Event name and selector are required');
      }

      off(
        document,
        name,
        selector,
        handler,
      );
    });
  };

  return {
    bindEvents,
    unbindEvents,
  };
};

export default useDynamicImportEventsHandler;
