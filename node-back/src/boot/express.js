import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';


const isDevelopment = process.env.NODE_ENV === 'development';


export default function (app) {
  if (isDevelopment) {
    // Логи
    app.use(morgan('combined'));
  }

  // CORS
  app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  }));

  // парсинг тела запросов
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));

  // статические файлы
  app.use(express.static('public'));
};