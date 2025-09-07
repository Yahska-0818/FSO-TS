import { type CoursePart } from "../types";

interface PartProps {
  coursePart: CoursePart
};

const Part = (props:PartProps) => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (props.coursePart.kind) {
    case "basic":
      return (
        <div>
          <h3>{props.coursePart.name} {props.coursePart.exerciseCount}</h3>
          <em>{props.coursePart.description}</em>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>{props.coursePart.name} {props.coursePart.exerciseCount}</h3>
          <p>Project exercises: {props.coursePart.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>{props.coursePart.name} {props.coursePart.exerciseCount}</h3>
          <em>{props.coursePart.description}</em>
          <p>Background material: {props.coursePart.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>{props.coursePart.name} {props.coursePart.exerciseCount}</h3>
          <em>{props.coursePart.description}</em>
          <p>required skills: {props.coursePart.requirements.join(', ')}</p>
        </div>
      )
    default:
      return assertNever(props.coursePart);
  }
}

export default Part;