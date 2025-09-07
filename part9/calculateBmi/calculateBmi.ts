interface bmiDimensions {
  height: number;
  weight: number;
}

export const calculateBmi = (height: number, weight: number): number => {
  const bmi = weight/((height/100)*(height/100));
  return(bmi);
};

export const bmiVerdict = (bmi:number):string => {
  if (bmi < 18.5) {
    return "Underweight range";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal range";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight range";
  } else {
    return "Obese range";
  }
};

const parseArgs = (args:string[]):bmiDimensions => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const {height,weight} = parseArgs(process.argv);
  const bmi = calculateBmi(height,weight);
  console.log(bmiVerdict(bmi));
} catch (error:unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}