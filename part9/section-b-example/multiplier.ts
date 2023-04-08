interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: typeof process.argv): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const value1 = Number(args[2]);
  const value2 = Number(args[3]);

  if (Number.isNaN(value1) || Number.isNaN(value2)) {
    throw new Error("Provided values were not numbers!");
  }

  return {
    value1,
    value2,
  };
};

const multiplier = (a: number, b: number, printText: string): void => {
  console.log(printText, a * b);
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  multiplier(
    value1,
    value2,
    `Multiplied ${value1} and ${value2}, the result is:`
  );
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
