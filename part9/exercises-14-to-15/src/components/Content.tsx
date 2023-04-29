import { type CoursePart } from "../types";
import Part from "./Part";

const Content = ({
  courseParts,
}: {
  courseParts: CoursePart[];
}): JSX.Element => {
  return (
    <>
      {courseParts.map((coursePart) => (
        <article key={coursePart.name}>
          <h2>
            {coursePart.name} {coursePart.exerciseCount}
          </h2>
          <Part coursePart={coursePart} />
        </article>
      ))}
    </>
  );
};

export default Content;
