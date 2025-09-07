import z from "zod";
import { NewPatientSchema } from "./utils";

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

interface BaseEntry {
  id: string,
  date: string,
  type: string,
  specialist: string,
  description: string,
  diagnosisCodes?: Array<Diagnosis['code']>
};

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
};

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
};

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string;
  };
};

interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge?: {
    date: string,
    criteria: string;
  };
};

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn?: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type nonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>;
export type newPatient = z.infer<typeof NewPatientSchema>;