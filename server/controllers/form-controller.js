import { validationResult } from "express-validator";

import { Form } from "../mongodb/schema/form.js";
import { BMIHomeWork } from "../mongodb/schema/BMIWork.js";
import { HttpError } from "../utils/HttpError.js";

export const form = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, register_no, githubLink, type } = req.body;

  let existingSubmit, newForm;

  if (!githubLink.includes("github")) {
    const error = new HttpError(
      "It seems that you have to provide github link",
      500
    );
    return next(error);
  }

  try {
    existingSubmit = await Form.findOne({ register_no });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later.",
      500
    );
    return next(error);
  }
  if (existingSubmit) {
    return next(new HttpError("Already Submitted HomeWork", 500));
  } else if (!existingSubmit) {
    try {
      newForm = new Form({ name, register_no, githubLink, type });
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, please try again later.",
        500
      );
      return next(error);
    }
    try {
      await newForm.save();
    } catch (err) {
      const error = new HttpError(
        "Something went worng while submitting, try again later",
        201
      );
      return next(error);
    }
  }

  res.json({ message: "Home Work Submitted succesfully" });
};

export const BMI = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, register_no, githubLink, type } = req.body;

  let existingSubmit, newForm;

  if (!githubLink.includes("github")) {
    const error = new HttpError(
      "It seems that you have to provide github link",
      500
    );
    return next(error);
  }

  try {
    existingSubmit = await BMIHomeWork.findOne({ register_no });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later.",
      500
    );
    return next(error);
  }
  if (existingSubmit) {
    return next(new HttpError("Already Submitted HomeWork", 500));
  } else if (!existingSubmit) {
    try {
      newForm = new BMIHomeWork({ name, register_no, githubLink, type });
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, please try again later.",
        500
      );
      return next(error);
    }
    try {
      await newForm.save();
    } catch (err) {
      const error = new HttpError(
        "Something went worng while submitting, try again later",
        201
      );
      return next(error);
    }
  }

  res.json({ message: "Home Work Submitted succesfully" });
};
