import Part from "./Part";
import { type CoursePart } from "../types";

interface ContentProps {
  courses: CoursePart[]
};

const Content = (prop:ContentProps) => {
  return (
  <>
    {prop.courses.map(course => (
      <Part coursePart={course} key={course.name}></Part>
    ))}
  </>
  )
}

export default Content;