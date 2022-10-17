import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
export const AddTask = async (req, res, next) => {
  try {
    const id = req.headers["id"];
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { $push: { tasks: { data: req.body.text } } },
      { new: true }
    );
    res.status(200).json({ updatedTasks: updatedUser.tasks });
  } catch (err) {
    next(err);
  }
};

export const getTasks = async (req, res, next) => {
  const id = await req.headers["id"];
  try {
    const user = await UserModel.findById(id);
    res.status(200).json({ tasks: user.tasks });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (req, res) => {
  try {
    const id = req.headers["id"];
    const taskid = req.body.taskid;
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { $pull: { tasks: { _id: taskid } } },
      { new: true }
    );
    res.status(200).json({ updatedTasks: updatedUser.tasks });
  } catch (err) {
    next(err);
  }
};

export const updateTaskFlag = async (req, res) => {
  try {
    const id = req.headers["id"];
    const taskid = req.body.taskid;
    const updatedUser = await UserModel.findById(id);
    updatedUser.tasks.id(taskid).flag = req.body.flag;
    updatedUser.save();
    res.status(200).json({ updatedTasks: updatedUser.tasks });
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res) => {
  try {
    const id = req.headers["id"];
    const taskid = req.body.taskid;
    const updatedUser = await UserModel.findById(id);
    updatedUser.tasks.id(taskid).data = req.body.data;
    updatedUser.save();
    res.status(200).json({ updatedTasks: updatedUser.tasks });
  } catch (err) {
    next(err);
  }
};
