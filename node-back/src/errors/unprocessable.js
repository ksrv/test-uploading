import HttpError from './abstract';

export default class UnprocessableEntityError extends HttpError {
  constructor (message) {
    super(422, message || 'Unprocessable Entity');
  }
};