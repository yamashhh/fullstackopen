import diaries from "@/data/diaries"
import {
  type DiaryEntry,
  type NewDiaryEntry,
  type NonSensitiveDiaryEntry,
} from "@/types"

const getEntries = () => {
  return diaries
}

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }))
}

const findById = (id: number) => {
  const entry = diaries.find((diary) => diary.id === id)
  return entry
}

const addDiary = (entry: NewDiaryEntry) => {
  const newEntry: DiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry,
  }
  diaries.push(newEntry)
  return newEntry
}

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById,
}
