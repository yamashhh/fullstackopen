import { Visibility, Weather, type NewDiaryEntry } from "@/types"

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const isWeather = (weather: string): weather is Weather => {
  return Object.values(Weather)
    .map((weather) => String(weather))
    .includes(weather)
}

const isVisibility = (visibility: string): visibility is Visibility => {
  return Object.values(Visibility)
    .map((visibility) => String(visibility))
    .includes(visibility)
}

const parseComment = (comment: unknown): string => {
  if (!isString(comment)) {
    throw new Error("Incorrect or missing comment: ")
  }
  return comment
}

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${String(date)}`)
  }
  return date
}

const parseWeather = (weather: unknown): Weather => {
  if (!isString(weather) || !isWeather(weather)) {
    throw new Error(`Incorrect or missing weather: ${String(weather)}`)
  }
  return weather
}

const parseVisibility = (visibility: unknown): Visibility => {
  if (!isString(visibility) || !isVisibility(visibility)) {
    throw new Error(`Incorrect or missing visibility: ${String(visibility)}`)
  }
  return visibility
}

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (object == null || typeof object !== "object") {
    throw new Error("Incorrect or missing object")
  }

  if (
    !("date" in object) ||
    !("weather" in object) ||
    !("visibility" in object)
  ) {
    throw new Error("Incorrect data: some fields are missing")
  }

  const newEntry: NewDiaryEntry = {
    date: parseDate(object.date),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility),
  }

  if ("comment" in object) {
    newEntry.comment = parseComment(object.comment)
  }

  return newEntry
}
