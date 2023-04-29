import patientService from "@/services/patientService";
import { toNewEntry, toNewPatient } from "@/utils";
import express from "express";

const router = express.Router();

router.get("/", (_, res) => {
  res.send(patientService.getPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.send(addedPatient);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get("/:id", (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if (patient === undefined) {
    res.status(404).send("Patient not found.");
    return;
  }
  res.send(patient);
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const patient = patientService.addEntry(req.params.id, newEntry);
    if (patient === undefined) {
      res.status(404).send("Patient not found.");
      return;
    }
    res.send(patient);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
