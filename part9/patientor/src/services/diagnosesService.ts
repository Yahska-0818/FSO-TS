import diagnosesData from '../data/diagnoses';

import { Diagnosis } from '../types';

const getDiagnoses = ():Diagnosis[] => {
  return diagnosesData;
};

const addDiagnoses = () => {
  return null;
};

export default {getDiagnoses,addDiagnoses};