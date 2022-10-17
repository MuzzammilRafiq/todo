import Button from "@mui/material/Button";
import { AddBoxRounded } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function AddTask() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const user = useSelector((state) => state.user.value);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:3001/task/add",
        { text },
        {
          headers: {
            id: user._id,
          },
        }
      );
      setText("");
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="addTask">
      <AddBoxRounded onClick={handleClickOpen} style={{ cursor: "pointer" }} />
      <Dialog open={open} onClose={handleClose}>
        <DialogActions>
          <Button onClick={handleClose}>X</Button>
        </DialogActions>
        <DialogTitle>Add Your Task</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <textarea
            cols="55"
            rows="10"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleSubmit}>Post</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTask;
