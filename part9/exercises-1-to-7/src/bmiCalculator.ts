const BMI_STRING = {
  UNDERWEIGHT_SEVERE: "Underweight (Severe thinness)",
  UNDERWEIGHT_MODERATE: "Underweight (Moderate thinness)",
  UNDERWEIGHT_MILD: "Underweight (Mild thinness)",
  NORMAL: "Normal range",
  OVERWEIGHT: "Overweight (Pre-obese)",
  OBESE_I: "Obese (Class I)",
  OBESE_II: "Obese (Class II)",
  OBESE_III: "Obese (Class III)",
} as const;

interface CalculateBmiResult {
  weight: number;
  height: number;
  bmi: (typeof BMI_STRING)[keyof typeof BMI_STRING];
}

/**
 * @see https://en.wikipedia.org/wiki/Body_mass_index
 * @param heightInCentimeters
 * @param weightInKilograms
 * @returns
 */
export const calculateBmi = (
  heightInCentimeters: number,
  weightInKilograms: number
): CalculateBmiResult => {
  const bmiRoundedToTenths =
    Math.round((weightInKilograms / (heightInCentimeters / 100) ** 2) * 10) /
    10;

  const result: CalculateBmiResult = {
    weight: weightInKilograms,
    height: heightInCentimeters,
    bmi: (() => {
      if (bmiRoundedToTenths < 16.0) {
        return BMI_STRING.UNDERWEIGHT_SEVERE;
      }
      if (bmiRoundedToTenths >= 16.0 && bmiRoundedToTenths <= 16.9) {
        return BMI_STRING.UNDERWEIGHT_MODERATE;
      }
      if (bmiRoundedToTenths >= 17.0 && bmiRoundedToTenths <= 18.4) {
        return BMI_STRING.UNDERWEIGHT_MILD;
      }
      if (bmiRoundedToTenths >= 18.5 && bmiRoundedToTenths <= 24.9) {
        return BMI_STRING.NORMAL;
      }
      if (bmiRoundedToTenths >= 25.0 && bmiRoundedToTenths <= 29.9) {
        return BMI_STRING.OVERWEIGHT;
      }
      if (bmiRoundedToTenths >= 30.0 && bmiRoundedToTenths <= 34.9) {
        return BMI_STRING.OBESE_I;
      }
      if (bmiRoundedToTenths >= 35.0 && bmiRoundedToTenths <= 39.9) {
        return BMI_STRING.OBESE_II;
      }
      if (bmiRoundedToTenths >= 40.0) {
        return BMI_STRING.OBESE_III;
      }
      throw new Error("Failed to evaluate BMI.");
    })(),
  };

  return result;
};
