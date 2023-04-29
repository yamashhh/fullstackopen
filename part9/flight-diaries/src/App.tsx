import { useEffect, useState } from "react";
import AddNewEntry from "./components/AddNewEntry";
import DiaryEntries from "./components/DiaryEntries";
import diaryService from "./services/diaryService";
import { type DiaryEntry, type NonSensitiveDiaryEntry } from "./types";

function App(): JSX.Element {
  const [diaryEntries, setDiaryEntries] = useState<
    Array<NonSensitiveDiaryEntry | DiaryEntry>
  >([]);

  useEffect(() => {
    void (async () => {
      const data = await diaryService.getAll();
      setDiaryEntries(data);
    })();
  }, []);

  return (
    <main>
      <h1>Flight diaries</h1>
      <AddNewEntry setDiaryEntries={setDiaryEntries} />
      <DiaryEntries diaryEntries={diaryEntries} />
    </main>
  );
}

export default App;
