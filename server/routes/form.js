import { Router } from "express";
import { check } from "express-validator";

import { form } from "../controllers/form-controller.js";

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

export default router;
