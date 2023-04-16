import { type NonSensitiveDiaryEntry } from "../types";

export default function DiaryEntries({
  diaryEntries,
}: {
  diaryEntries: NonSensitiveDiaryEntry[];
}): JSX.Element {
  return (
    <section>
      <h2>Diary entries</h2>
      {diaryEntries.map((diary) => (
        <article key={diary.id}>
          <h3>{diary.date}</h3>
          <dl>
            <dt>visibility:</dt>
            <dd>{diary.visibility}</dd>
            <dt>weather:</dt>
            <dd>{diary.weather}</dd>
          </dl>
        </article>
      ))}
    </section>
  );
}
