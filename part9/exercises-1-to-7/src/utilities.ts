/**
 * strip first 2 elements from process.argv
 * @param args
 * @returns
 */
export const getArguments = (args: typeof process.argv) => {
  const [_, __, ...rest] = args;
  return rest;
};

/**
 * a simple error handling function
 * @param error
 * @returns
 */
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
    return;
  }
  console.error(`----------
Unhandled error:

${error}
----------`);
};
