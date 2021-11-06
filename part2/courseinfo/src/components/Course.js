import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </>
);

export default Course;
