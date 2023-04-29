import { apiBaseUrl } from "@/constants";
import {
  type EntryFormValues,
  type Patient,
  type PatientFormValues,
} from "@/types";
import axios from "axios";

const getAll = async (): Promise<Patient[]> => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return data;
};

const getPatient = async (id: string): Promise<Patient> => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: PatientFormValues): Promise<Patient> => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);
  return data;
};

const addEntry = async (
  id: string,
  object: EntryFormValues
): Promise<Patient> => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );
  return data;
};

export default {
  getAll,
  getPatient,
  create,
  addEntry,
};
