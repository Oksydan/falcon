/**
 * Generic Http Request error
 * @class GenericHttpRequestError
 * @property {string} message - Error message
 */
class GenericHttpRequestError extends Error {
  NAME = 'GenericHttpRequestError';

  constructor(message) {
    super(message);
    this.name = this.NAME;
  }
}

export default GenericHttpRequestError;
