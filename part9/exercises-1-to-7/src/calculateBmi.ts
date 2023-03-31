const calculateBmi = (
  heightInCentimeters: number,
  weightInKilograms: number
) => {
  if (Number.isNaN(heightInCentimeters) && Number.isNaN(weightInKilograms)) {
    throw new Error("Provided values were not numbers.");
  }

  const bmiRoundedToTenths =
    Math.round((weightInKilograms / (heightInCentimeters / 100) ** 2) * 10) /
    10;

  if (bmiRoundedToTenths < 16.0) {
    return "Underweight (Severe thinness)";
  }
  if (bmiRoundedToTenths >= 16.0 && bmiRoundedToTenths <= 16.9) {
    return "Underweight (Moderate thinness)";
  }
  if (bmiRoundedToTenths >= 17.0 && bmiRoundedToTenths <= 18.4) {
    return "Underweight (Mild thinness)";
  }
  if (bmiRoundedToTenths >= 18.5 && bmiRoundedToTenths <= 24.9) {
    return "Normal range";
  }
  if (bmiRoundedToTenths >= 25.0 && bmiRoundedToTenths <= 29.9) {
    return "Overweight (Pre-obese)";
  }
  if (bmiRoundedToTenths >= 30.0 && bmiRoundedToTenths <= 34.9) {
    return "Obese (Class I)";
  }
  if (bmiRoundedToTenths >= 35.0 && bmiRoundedToTenths <= 39.9) {
    return "Obese (Class II)";
  }
  if (bmiRoundedToTenths >= 40.0) {
    return "Obese (Class III)";
  }

  throw new Error("Failed to evaluate BMI.");
};

console.log(calculateBmi(170, 112));
