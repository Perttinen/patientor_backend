"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const entriess = [];
const patients = patients_1.default;
const getPatientById = (id) => {
    return patients.find(p => p.id === id);
};
const getPatients = () => {
    return patients;
};
const getNonSensitivePatients = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v4)(), entries: entriess }, patient);
    patients_1.default.push(newPatient);
    console.log(newPatient);
    return newPatient;
};
const addEntry = (newEntry, patientId) => {
    const patient = patients_1.default.find(p => p.id === patientId);
    const entryToAdd = Object.assign(Object.assign({}, newEntry), { id: (0, uuid_1.v4)() });
    console.log('service', entryToAdd);
    patient.entries.push(entryToAdd);
    patients_1.default.map(p => p.id === patientId ? patient : p);
    return entryToAdd;
};
exports.default = {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    getPatientById,
    addEntry
};
