import {
  Gender,
  HealthCheckRating,
  type BaseEntry,
  type Diagnosis,
  type Discharge,
  type EntryWithoutId,
  type NewPatient,
  type OccupationalHealthcareEntry,
  type SickLeave,
} from "./types";

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

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (
    object == null ||
    typeof object !== "object" ||
    !("diagnosisCodes" in object)
  ) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const isObject = (param: unknown): param is object => {
  return (
    param != null &&
    typeof param === "object" &&
    param.constructor.name === "Object"
  );
};

const parseDischarge = (param: unknown): Discharge => {
  if (!isObject(param) || !("date" in param) || !("criteria" in param)) {
    throw new Error(`Incorrect or missing discharge: ${String(param)}}`);
  }
  return {
    date: parseDate(param.date, "Discharge date"),
    criteria: parseString(param.criteria, "Discharge criteria"),
  };
};

const parseSickLeave = (param: unknown): SickLeave => {
  if (!isObject(param) || !("startDate" in param) || !("endDate" in param)) {
    throw new Error(`Incorrect or missing sick leave: ${String(param)}`);
  }
  return {
    startDate: parseDate(param.startDate, "Sick leave start date"),
    endDate: parseDate(param.endDate, "Sick leave end date"),
  };
};

const isNumber = (param: unknown): param is number => {
  return Number.isFinite(param);
};

const parseHealthCheckRating = (param: unknown): HealthCheckRating => {
  if (!isNumber(param) || !(param in HealthCheckRating)) {
    throw new Error(
      `Incorrect or missing health check rating: ${String(param)}`
    );
  }
  return param;
};

export const toNewPatient = (body: unknown): NewPatient => {
  if (!isObject(body)) {
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

export const toNewEntry = (body: unknown): EntryWithoutId => {
  if (!isObject(body)) {
    throw new Error("Incorrect or missing data");
  }
  if (
    !("description" in body) ||
    !("date" in body) ||
    !("specialist" in body)
  ) {
    throw new Error("Incorrect data: some fields are missing");
  }
  const baseEntry: Omit<BaseEntry, "id"> = {
    description: parseString(body.description, "Description"),
    date: parseDate(body.date, "Date"),
    specialist: parseString(body.specialist, "Specialist"),
  };
  if ("daiagnosisCodes" in body) {
    baseEntry.diagnosisCodes = parseDiagnosisCodes(body.daiagnosisCodes);
  }
  if ("discharge" in body) {
    return {
      ...baseEntry,
      type: "Hospital",
      discharge: parseDischarge(body.discharge),
    };
  }
  if ("employerName" in body) {
    const occupationalHealthCareEntry: Omit<OccupationalHealthcareEntry, "id"> =
      {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseString(body.employerName, "Employer name"),
      };
    "sickLeave" in body &&
      (occupationalHealthCareEntry.sickLeave = parseSickLeave(body.sickLeave));
    return occupationalHealthCareEntry;
  }
  if ("healthCheckRating" in body) {
    return {
      ...baseEntry,
      type: "HealthCheck",
      healthCheckRating: parseHealthCheckRating(body.healthCheckRating),
    };
  }
  throw new Error("Failed to parse request.");
};
