import HttpInternalServerError from '../errors/internal';

/**
 * @param {Object} err erro
 * @param {Object} req http request
 * @param {Object} res http response
 * @param {Function} next callback
 */
export default function (err, req, res, next) {
  console.error({ err });
  const error = new HttpInternalServerError();
  res.status(500).json(error);
};