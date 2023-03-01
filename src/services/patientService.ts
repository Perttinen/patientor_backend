import patientsData from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

import { Patient, NonSensitivePatient, NewPatient, Entry, NewEntry} from '../types';

const entriess: Entry[] = [];
const patients: Patient[] = patientsData;

const getPatientById = (id: string):Patient => {
  return patients.find(p => p.id === id) as Patient;
};

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient): Patient => {
   const newPatient = {
    id: uuidv4(),
    entries: entriess,
    ...patient
   };
   patientsData.push(newPatient);
   console.log(newPatient);
   
  return newPatient;
};

const addEntry = (newEntry: NewEntry, patientId:string): Entry => {
  const patient: Patient = patientsData.find(p => p.id === patientId) as Patient;
  const entryToAdd = {...newEntry, id: uuidv4()};
  console.log('service',entryToAdd);
  
  patient.entries.push(entryToAdd);
  patientsData.map(p=> p.id === patientId ? patient : p);
  return entryToAdd;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatientById,
  addEntry
};