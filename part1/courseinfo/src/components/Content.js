import { Part } from "./Part";

export const Content = (props) => (
  <>
    {props.parts.map((part) => (
      <Part part={part} key={part.name} />
    ))}
  </>
);
