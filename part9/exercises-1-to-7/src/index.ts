import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { weight, height } = req.query;

  if (weight === undefined || height === undefined) {
    return res.status(400).send("missing parameters");
  }

  if (Number.isNaN(Number(height)) || Number.isNaN(Number(weight))) {
    return res.status(422).send("malformatted parameters");
  }

  try {
    const result = calculateBmi(Number(weight), Number(height));
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
