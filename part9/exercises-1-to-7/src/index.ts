import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

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

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
