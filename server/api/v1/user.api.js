import express from "express";
import { validate } from "express-validation";
import { createUser } from "../../controllers/user.controller.js";
import { register } from "../../validations/auth.validation.js";
const router = express.Router();

router.post("/create", validate(register, {}, {}), createUser);

export default router;