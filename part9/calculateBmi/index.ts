import express from "express";
import { bmiVerdict, calculateBmi } from "./calculateBmi";
import {calculateExercises} from "./exerciseCalculator";
import { parameters } from "./exerciseCalculator";

const app = express();
app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.get('/hello',(_req:any,res:any)=> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  res.send('Hello Full Stack!');
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.get('/bmi',(req:any,res:any)=> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const {height, weight} = req.query;
  if (isNaN(Number(height)) && isNaN(Number(weight))) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    res.send({error:"malformatted parameter"}).status(400);
  } else {
    const bmi = calculateBmi(Number(height),Number(weight));
    const bmiResult = bmiVerdict(bmi);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    res.send({height,weight,bmi:bmiResult});
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.post('/exercises',(req:any,res:any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const {daily_exercises,target} = req.body;
  let userExercises: parameters = {
    periodLength: 0,
    trainingDays: 0,
    success: false,
    rating: 0,
    ratingDescription: '',
    target: 0,
    average: 0
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  userExercises = calculateExercises(daily_exercises,target,userExercises);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  res.send(userExercises);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});