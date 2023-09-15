/**
 * DOMReady function runs a callback function when the DOM is ready (DOMContentLoaded)
 * @param callback {function} - callback function
 */
const DOMReady = (callback) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
};

export default DOMReady;
