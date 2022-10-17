import express from "express";
import {
  AddTask,
  deleteTask,
  getTasks,
  updateTask,
  updateTaskFlag,
} from "../controllers/taskController.js";
const router = express.Router();

router.put("/add", AddTask);
router.get("/get", getTasks);
router.put("/del", deleteTask);
router.put("/updflag", updateTaskFlag);
router.put("/upddata", updateTask);

export default router;
