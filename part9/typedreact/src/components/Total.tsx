interface TotalProps {
  totalExercises: number;
};

const Total = (props:TotalProps) => (
  <p>Total number of exercises: {props.totalExercises}</p>
);

export default Total