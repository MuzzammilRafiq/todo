import express from "express";
import {
  checkAuthorized,
  login,
  register,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/check", checkAuthorized);

export default router;
