import diagnoseService from "@/services/diagnoseService";
import express from "express";

const router = express.Router();

router.get("/", (_, res) => {
  res.send(diagnoseService.getDiagnoses());
});

export default router;
