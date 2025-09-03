import { body } from "express-validator";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is Required")
      .isEmail()
      .withMessage("Not a valid email"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is Required")
      .isLowercase()
      .withMessage("Username must be in lowercase")
      .isLength({ min: 3, max: 16 })
      .withMessage(
        "Username must be minimum 3 characters and maximum 16 characters",
      ),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is Required")
      .isLength({ min: 8 })
      .withMessage("Password must be minimum 8 Characters"),
    body("fullName").optional().trim(),
  ];
};

export { userRegisterValidator };
