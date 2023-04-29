import { isAxiosError } from "axios";
import { useState, type Dispatch, type SetStateAction } from "react";
import diaryService from "../services/diaryService";
import {
  Visibility,
  Weather,
  type DiaryEntry,
  type NonSensitiveDiaryEntry,
} from "../types";

export default function AddNewEntry({
  setDiaryEntries,
}: {
  setDiaryEntries: Dispatch<
    SetStateAction<Array<NonSensitiveDiaryEntry | DiaryEntry>>
  >;
}): JSX.Element {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");

  const resetForm = (): void => {
    setDate("");
    setVisibility(Visibility.Great);
    setWeather(Weather.Sunny);
    setComment("");
    setError("");
  };

  return (
    <section>
      <h2>Add new entry</h2>
      {error.length > 0 && (
        <span style={{ color: "red", display: "block", marginBottom: "16px" }}>
          {error}
        </span>
      )}
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          rowGap: "8px",
        }}
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const data = await diaryService.create({
              date,
              visibility,
              weather,
              comment,
            });
            setDiaryEntries((diaryEntries) => diaryEntries.concat(data));
            resetForm();
          } catch (error) {
            if (isAxiosError(error)) {
              setError(error.response?.data);
              return;
            }
            setError(String(error));
          }
        }}
      >
        <label>
          date
          <input
            type="date"
            required
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
            }}
          />
        </label>
        <fieldset>
          <legend>visibility</legend>
          {Object.entries(Visibility).map(([key, value]) => (
            <label key={key}>
              <input
                type="radio"
                name="visibility"
                value={value}
                checked={visibility === value}
                onChange={(event) => {
                  setVisibility(event.target.value as Visibility);
                }}
              />
              {key.toLowerCase()}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>weather</legend>
          {Object.entries(Weather).map(([key, value]) => (
            <label key={key}>
              <input
                type="radio"
                name="weather"
                value={value}
                checked={weather === value}
                onChange={(event) => {
                  setWeather(event.target.value as Weather);
                }}
              />
              {key.toLowerCase()}
            </label>
          ))}
        </fieldset>
        <label>
          comment
          <input
            type="text"
            required
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
        </label>
        <button type="submit">add</button>
      </form>
    </section>
  );
}
