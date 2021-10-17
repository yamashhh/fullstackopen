import Part from "./Part";

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </>
  );
};

export default Content;
