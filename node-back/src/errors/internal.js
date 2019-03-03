import HttpError from './abstract';

export default class HttpInternalServerError extends Error {
  constructor (message) {
    super(500,  message || 'Internal server error');
  }
};