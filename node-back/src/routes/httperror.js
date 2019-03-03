import HttpError from '../errors/abstract';

/**
 * @param {Object} err erro
 * @param {Object} req http request
 * @param {Object} res http response
 * @param {Function} next callback
 */
export default function (err, req, res, next) {
  if (err instanceof HttpError) {
    res.code(err.code).json(err);
  } else {
    next(err);
  }
};