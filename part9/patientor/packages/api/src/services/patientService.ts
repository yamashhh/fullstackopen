import patients from "@/data/patients";
import type { NewPatient, NonSensitivePatient, PublicPatient } from "@/types";
import { randomUUID } from "crypto";

const getPatients = (): PublicPatient[] => {
  return patients.map((patient) => {
    const { ssn, ...publicPatient } = patient;
    return publicPatient;
  });
};

const getPatient = (id: string): NonSensitivePatient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  if (patient === undefined) {
    return patient;
  }
  const { ssn, entries, ...nonSensitivePatient } = patient;
  return nonSensitivePatient;
};

const addPatient = (newPatient: NewPatient): PublicPatient => {
  const newPatientWithId = { ...newPatient, id: randomUUID() };
  patients.push(newPatientWithId);
  const { ssn, ...rest } = newPatientWithId;
  return rest;
};

export default {
  getPatients,
  getPatient,
  addPatient,
};
