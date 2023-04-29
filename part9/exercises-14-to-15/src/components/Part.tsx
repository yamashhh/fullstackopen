import { type HTMLAttributes } from "react";
import { type CoursePart } from "../types";
import { assertNever } from "../utils";

const flexbox: HTMLAttributes<HTMLDivElement>["style"] = {
  display: "flex",
  flexDirection: "column",
  rowGap: "16px",
};

const Part = ({ coursePart }: { coursePart: CoursePart }): JSX.Element => {
  switch (coursePart.kind) {
    case "basic": {
      return <i>{coursePart.description}</i>;
    }
    case "group": {
      return <p>project exercises {coursePart.groupProjectCount}</p>;
    }
    case "background": {
      return (
        <div style={flexbox}>
          <i>{coursePart.description}</i>
          <a
            href={coursePart.backgroundMaterial}
            target="_blank"
            rel="noreferrer"
          >
            background material
          </a>
        </div>
      );
    }
    case "special": {
      return (
        <div style={flexbox}>
          <i>{coursePart.description}</i>
          <p>required skills: {coursePart.requirements.toString()}</p>
        </div>
      );
    }
    default: {
      return assertNever(coursePart);
    }
  }
};

export default Part;
