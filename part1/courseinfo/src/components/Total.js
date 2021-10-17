export const Total = (props) => (
  <p>
    Number of exercises{" "}
    {props.parts.reduce(
      (previousValue, currentValue) => previousValue + currentValue.exercises,
      0
    )}
  </p>
);
