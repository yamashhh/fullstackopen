import patients from "@/data/patients";
import type { PublicPatient } from "@/types";

const getPatients = (): PublicPatient[] => {
  return patients.map((patient) => {
    const { ssn, ...publicPatient } = patient;
    return publicPatient;
  });
};

export default {
  getPatients,
};
