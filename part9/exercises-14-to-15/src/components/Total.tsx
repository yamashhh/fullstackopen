import { type CoursePart } from "../types";

const Total = ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element => {
  const total = courseParts.reduce(
    (previousValue, currentValue) => previousValue + currentValue.exerciseCount,
    0
  );

  return <p>Number of exercises {total}</p>;
};

export default Total;
