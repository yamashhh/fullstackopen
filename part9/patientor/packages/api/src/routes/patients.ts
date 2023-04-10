import patientService from "@/services/patientService";
import express from "express";

const router = express.Router();

router.get("/", (_, res) => {
  res.send(patientService.getPatients());
});

export default router;
