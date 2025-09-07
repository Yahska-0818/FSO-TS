interface CoursePart {
  name:string;
  exerciseCount:number;
};

interface ContentProps {
  courses: CoursePart[]
};

const Content = (prop:ContentProps) => {
  return (
  <>
    {prop.courses.map(course => (
      <p key={course.name}>{course.name} {course.exerciseCount}</p>
    ))}
  </>
  )
}

export default Content;