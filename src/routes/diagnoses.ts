import express from 'express';
import diagnosesService from '../services/diagnoseService';

const Router = express.Router();

Router.get('/', (_req, res) => {
  res.json(diagnosesService.getDiagnoses());
});

export default Router;