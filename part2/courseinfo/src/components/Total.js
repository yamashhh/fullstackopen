const Total = ({ course }) => {
  return (
    <b>
      total of{" "}
      {course.parts.reduce(
        (previousValue, currentValue) => previousValue + currentValue.exercises,
        0
      )}{" "}
      exercises
    </b>
  );
};

export default Total;
