import patients from "@/data/patients";
import type {
  EntryWithoutId,
  NewPatient,
  Patient,
  PublicPatient,
} from "@/types";
import { randomUUID } from "crypto";

const getPatients = (): PublicPatient[] => {
  return patients.map((patient) => {
    const { ssn, ...publicPatient } = patient;
    return publicPatient;
  });
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (newPatient: NewPatient): PublicPatient => {
  const newPatientWithId = { ...newPatient, id: randomUUID() };
  patients.push(newPatientWithId);
  const { ssn, ...rest } = newPatientWithId;
  return rest;
};

const addEntry = (
  id: string,
  entry: EntryWithoutId
): PublicPatient | undefined => {
  const newEntry = { ...entry, id: randomUUID() };
  const patient = getPatient(id);
  if (patient === undefined) {
    return patient;
  }
  patient.entries.push(newEntry);
  return patient;
};

export default {
  getPatients,
  getPatient,
  addPatient,
  addEntry,
};
