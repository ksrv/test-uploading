import express from 'express';

import upload from './upload';
import httpError from './httperror';
import error from './error';


const router = express.Router();

/**
 * POST Загрузка файла
 */
router.post('/', upload);

/**
 * Http ошибки
 */
router.use(httpError);

/**
 * Другие ошибки
 */
router.use(error);


export default router;