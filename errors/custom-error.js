class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};

module.exports = {
  CustomAPIError,
  createCustomError,
};

/* Create a custom Error class.
  1 constructor() method is invoked whenever we create a new instance of the class
  2 extends Error - basically we are setting up a child class that extends Error class
  3 When we extend we need to call super() method which in turn invokes a constructor() method of a parent class
  4 As a result we will have access to all the methods and properties of the parent
  5 So in our instance we will have access to the message property and the this.statusCode as well.
*/
