import { type CoursePart } from "../types";

const Content = ({
  courseParts,
}: {
  courseParts: CoursePart[];
}): JSX.Element => {
  return (
    <>
      {courseParts.map(({ name, exerciseCount }) => (
        <p key={name}>
          {name} {exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
