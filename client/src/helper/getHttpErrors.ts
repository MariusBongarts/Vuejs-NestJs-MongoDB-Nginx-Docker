/**
 * Reads out the array of error messages, which are translation
 * strings from the server
 *
 * @export
 * @param {*} httpError
 * @returns
 */
export function getHttpErrors(httpError) {
  const errors: string[] = [];
  try {
    httpError.message.forEach(message => {
      const constraints: object = message.constraints;
      const keys = Object.keys(constraints);
      keys.forEach(key => errors.push(`ERRORS.CONSTRAINTS.${key}`));
    });
  } catch (error) {
    errors.push(httpError.message || 'Something went wrong');
  }
  return errors;
}