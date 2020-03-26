export function getHttpErrors(httpError: any) {
  const errors: string[] = [];
  try {
    httpError.message.forEach(message => {
      const constraints: object = message.constraints;
      const keys = Object.keys(constraints);

      keys.forEach(key => errors.push(constraints[key]));
    });
  } catch (error) {
    errors.push(httpError.error || 'Something went wrong');
  }
  return errors;
}