import patientData from '../data/patients';
import { v1 as uuid } from 'uuid';
import {EntryWithoutId, newPatient, nonSensitivePatientData, Patient } from '../types';

const getPatients = ():Patient[] => {
  return patientData;
};

const getNonSensitivePatients = ():nonSensitivePatientData[] => {
  return patientData.map(({ id, name, gender, dateOfBirth,occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry:newPatient):Patient => {
  const id:string = uuid();
  const newPatient = {
    id,
    ...entry,
    entries:[]
  };
  patientData.push(newPatient);
  return newPatient;
};

const getPatientData = (id: string):Patient => {
  const patient = patientData.find(p => p.id == id);
  if (!patient) {
    throw new Error('Patient not found');
  } else {
    return patient;
  }
};

const addPatientEntry = (entry:EntryWithoutId,id:string):Patient => {
  const patient = patientData.find(p => p.id == id);
  if (!patient) {
    throw new Error('Patient not found');
  }
  const newEntry = {
    id:uuid(),
    ...entry
  };
  patient?.entries.push(newEntry);
  return patient;
};

export default {getPatients,getNonSensitivePatients,addPatient, getPatientData, addPatientEntry};