// Handle try..catch blocks

const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error); // Includes model schema validation errors.  A way to catch errors from any of the controller functions and send to either the Express "default built-in error handler" middleware or our custom error-handling middleware
    }
  };
};

module.exports = asyncWrapper;
