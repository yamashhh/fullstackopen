import { Gender, type NewPatient } from "./types";

const isString = (param: unknown): param is string => {
  return typeof param === "string" || param instanceof String;
};

const parseString = (param: unknown, field: string): string => {
  if (param == null || !isString(param) || param.length === 0) {
    throw new Error(`Incorrect or missing field "${field}": ${String(param)}`);
  }
  return param;
};

const isDate = (param: string): boolean => {
  return Boolean(Date.parse(param));
};

const parseDate = (param: unknown, field: string): string => {
  if (param == null || !isString(param) || !isDate(param)) {
    throw new Error(`Incorrect or missing date "${field}": ${String(param)}`);
  }
  return param;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((gender) => gender.toString())
    .includes(param);
};

const parseGender = (param: unknown): Gender => {
  if (param == null || !isString(param) || !isGender(param)) {
    throw new Error(`Incorrect or missing gender: ${String(param)}`);
  }
  return param;
};

export const toNewPatient = (body: unknown): NewPatient => {
  if (body == null || typeof body !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    !("name" in body) ||
    !("dateOfBirth" in body) ||
    !("ssn" in body) ||
    !("gender" in body) ||
    !("occupation" in body)
  ) {
    throw new Error("Incorrect data: some fields are missing");
  }
  const newPatient: NewPatient = {
    name: parseString(body.name, "Name"),
    dateOfBirth: parseDate(body.dateOfBirth, "Date of birth"),
    ssn: parseString(body.ssn, "Social security number"),
    gender: parseGender(body.gender),
    occupation: parseString(body.occupation, "Occupation"),
  };
  return newPatient;
};
