import express from 'express';
import patientService from '../services/patientService';
import {toNewPatient, toNewEntry} from '../utils';

const Router = express.Router();

Router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

Router.get('/:id', (req,res) => {
  res.send(patientService.getPatientById(req.params.id));
});

Router.post('/', (req,res) => {
  try{
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  }catch(error:unknown){
    if(error instanceof Error){
      res.status(400).send(error.message);
    }
  }
});

Router.post('/:id/entries', (req,res) => {
  const id = req.params.id;
  console.log('router', req.body);
  try{
    const newEntry = toNewEntry(req.body);

    const addedEntry = patientService.addEntry(newEntry, id);
    res.json(addedEntry);
  }catch(error:unknown){
    // const errorMessage = 'Something went wrong';
    if(error instanceof Error){
      res.status(400).send(error.message);
    }
  }
  // res.send(req.body);
});

export default Router;