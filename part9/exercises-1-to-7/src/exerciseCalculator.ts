import { getArguments, handleError } from "./utilities";

const RATING = {
  HIGH: {
    VALUE: 3,
    DESCRIPTION: "Fantastic!",
  },
  NORMAL: {
    VALUE: 2,
    DESCRIPTION: "Great!",
  },
  LOW: {
    VALUE: 1,
    DESCRIPTION: "You can do it!",
  },
} as const;

interface CalculateExercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: (typeof RATING)[keyof typeof RATING]["VALUE"];
  ratingDescription: (typeof RATING)[keyof typeof RATING]["DESCRIPTION"];
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseHours: number[],
  target: number
): CalculateExercisesResult => {
  if (
    exerciseHours.some((hours) => Number.isNaN(hours)) ||
    Number.isNaN(target)
  ) {
    throw new Error("Invalid arguments.");
  }

  const periodLength = exerciseHours.length;
  const trainingHours = exerciseHours.filter((hours) => hours > 0);
  const trainingDays = trainingHours.length;
  const average =
    trainingHours.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    ) / periodLength;
  const success = average >= target;
  const ratingThresholdBelow = target * 0.8;
  const ratingThresholdAbove = target * 1.2;
  const rating =
    average > ratingThresholdAbove
      ? RATING.HIGH.VALUE
      : average > ratingThresholdBelow
      ? RATING.NORMAL.VALUE
      : RATING.LOW.VALUE;
  const ratingDescription =
    Object.values(RATING).find((element) => element.VALUE === rating)
      ?.DESCRIPTION ?? RATING.LOW.DESCRIPTION;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  if (process.argv.length < 4) {
    throw new Error("Not enough arguments.");
  }
  const [target, ...exerciseHours] = getArguments(process.argv);
  console.log(
    calculateExercises(
      exerciseHours.map((element) => Number(element)),
      Number(target)
    )
  );
} catch (error) {
  handleError(error);
}
