const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      next(HttpError(400, error.details.map((d) => d.message).join(", ")));
    }
    next();
  };
};

module.exports = validateBody;
