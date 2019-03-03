import express from './express';
import mongoose from './mongoose'


export default app => {
  express(app);
  mongoose(app);
};