import express, { json } from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(json());

app.get("/hello", (_, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (height === undefined || weight === undefined) {
    return res.status(400).send("missing parameters");
  }

  const heightInCentimeters = Number(height);
  const weightInKilograms = Number(weight);

  if (Number.isNaN(heightInCentimeters) || Number.isNaN(weightInKilograms)) {
    return res.status(422).send("malformed parameters");
  }

  try {
    const result = calculateBmi(heightInCentimeters, weightInKilograms);
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .send(error instanceof Error ? error.message : "internal server error");
  }
});

interface ExercisesRequestBody {
  daily_exercises?: number[];
  target?: number;
}

app.post("/exercises", (req, res) => {
  const dailyExercises = (req.body as ExercisesRequestBody)?.daily_exercises;
  const target = (req.body as ExercisesRequestBody)?.target;

  if (dailyExercises == null || target == null) {
    return res.status(400).send({ error: "parameters missing" });
  }

  if (
    !Array.isArray(dailyExercises) ||
    dailyExercises.some((hours) => typeof hours !== "number" || isNaN(hours)) ||
    Number.isNaN(target)
  ) {
    return res.status(422).send({ error: "malformatted parameters" });
  }

  try {
    const result = calculateExercises(dailyExercises, target);
    return res.status(200).send(result);
  } catch (error) {
    return res
      .status(500)
      .send(error instanceof Error ? error.message : "internal server error");
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
