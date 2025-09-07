import express from 'express';
import patientService from '../services/patientService';
import {toNewEntry, toNewPatient} from '../utils';
import {z} from 'zod';

const router = express.Router();

router.get('/', (_req,res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);

  } catch (error: unknown) {

    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

router.get('/:id', (req,res) => {
  res.send(patientService.getPatientData(req.params.id));
});

router.post('/:id/entries',(req,res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const patientWithNewEntry = patientService.addPatientEntry(newEntry,req.params.id);
    res.json(patientWithNewEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;