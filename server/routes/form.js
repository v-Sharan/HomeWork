import { Router } from "express";
import { check } from "express-validator";

import { form, BMI } from "../controllers/form-controller.js";

const router = Router();

router.post(
  "/",
  [
    check("name").notEmpty(),
    check("register_no").notEmpty(),
    check("githubLink").notEmpty().isURL(),
    check("type").notEmpty(),
  ],
  form
);

router.post(
  "/bmi",
  [
    check("name").notEmpty(),
    check("register_no").notEmpty(),
    check("githubLink").notEmpty().isURL(),
    check("type").notEmpty(),
  ],
  BMI
);

export default router;
