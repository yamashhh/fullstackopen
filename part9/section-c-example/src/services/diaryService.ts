import diaries from "@/data/diaries"
import { type NonSensitiveDiaryEntry } from "@/types"

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

const addDiary = () => {
  return null
}

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
}
