"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const Router = express_1.default.Router();
Router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitivePatients());
});
Router.get('/:id', (req, res) => {
    res.send(patientService_1.default.getPatientById(req.params.id));
});
Router.post('/', (req, res) => {
    try {
        const newPatient = (0, utils_1.toNewPatient)(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
});
Router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    console.log('router', req.body);
    try {
        const newEntry = (0, utils_1.toNewEntry)(req.body);
        const addedEntry = patientService_1.default.addEntry(newEntry, id);
        res.json(addedEntry);
    }
    catch (error) {
        // const errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
    // res.send(req.body);
});
exports.default = Router;
