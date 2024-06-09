import forEach from "lodash.foreach";
import values from "lodash.values";

export const yupToFormErrors = (yupErrors) => {
  let errors = {};
  const yupErrorsValues = values(yupErrors.inner);

  const formatError = (err) => {
    if (!errors[err.path]) {
      errors[err.path] = err.message;
    }
  };

  forEach(yupErrorsValues, formatError);

  return errors;
};
