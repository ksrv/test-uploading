import HttpError from './abstract';

export default class HttpNotFoundError extends HttpError {
  constructor (message) {
    super(404, message || 'Not found');
  }
};