import diaryService from "@/services/diaryService"
import { toNewDiaryEntry } from "@/utils"
import express from "express"

const router = express.Router()

router.get("/", (_, res) => {
  res.send(diaryService.getNonSensitiveEntries())
})

router.get("/:id", (req, res) => {
  const diary = diaryService.findById(Number(req.params.id))
  if (diary == null) {
    return res.sendStatus(404)
  }
  return res.send(diary)
})

router.post("/", (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body)
    const addedEntry = diaryService.addDiary(newDiaryEntry)
    res.json(addedEntry)
  } catch (error: unknown) {
    let errorMessage = "Something went wrong."
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message
    }
    res.status(400).send(errorMessage)
  }
})

export default router
