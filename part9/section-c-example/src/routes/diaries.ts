import diaryService from "@/services/diaryService"
import express from "express"

const router = express.Router()

router.get("/", (_, res) => {
  res.send(diaryService.getNonSensitiveEntries())
})

router.post("/", (_, res) => {
  res.send("Saving a diary!")
})

export default router
