export interface parameters {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface inputs {
  target: number;
  workouts: number[];
}

export const calculateExercises = (hoursPerDay: number[], target: number, userExercises: parameters):parameters => {
  userExercises.target = target;

  let hoursSum: number = 0;

  hoursPerDay.forEach(hours => {
    userExercises.periodLength++;
    if (hours > 0) {
      userExercises.trainingDays++;
      hoursSum += hours;
    }
  });

  userExercises.average = hoursSum/userExercises.periodLength;

  userExercises.success = userExercises.periodLength == userExercises.trainingDays ? true : false;

  if (hoursSum >= userExercises.periodLength*target && userExercises.success) {
    userExercises.rating = 3;
  } else if (hoursSum >= userExercises.periodLength*target || userExercises.success) {
    userExercises.rating = 2;
  } else {
    userExercises.rating = 1;
  }
  switch(userExercises.rating) {
    case 3: userExercises.ratingDescription = "Perfect!";
    break;
    case 2: userExercises.ratingDescription = "Good enough, keep going!";
    break;
    case 1: userExercises.ratingDescription = "Need improvement";
    break;
    default: userExercises.ratingDescription = "Start working out!";
    break;
  }
  return userExercises;
};

const userExercises: parameters = {
  periodLength: 0,
  trainingDays: 0,
  success: false,
  rating: 0,
  ratingDescription: '',
  target: 0,
  average: 0
};

const parseArgs = (args:string[]):inputs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const workoutHours = args.slice(3,args.length).map(hours => {
    if (!isNaN(Number(hours))) {
      return Number(hours);
    } else {
      throw new Error("Provided value is not a number");
    }
  });
  if (!isNaN(Number(args[2]))) {
    return {
        target: Number(args[2]),
        workouts: workoutHours
    };
  } else {
      throw new Error("Provided value is not a number");
  }
};

if (require.main === module) {
  try {
    const { target, workouts } = parseArgs(process.argv);
    console.log(calculateExercises(workouts, target,userExercises));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}