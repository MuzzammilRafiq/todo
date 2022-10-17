import Button from "@mui/material/Button";
import { Edit } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

function EditTask({ taskid, idata }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(idata);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = async () => {
    try {
      await axios.put(
        "http://localhost:3001/task/upddata",
        {
          taskid,
          data,
        },
        {
          headers: {
            id: "634d6209969159e96148fae7",
          },
        }
      );
      setData("");
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="EditTask">
      <Edit onClick={handleClickOpen} style={{ cursor: "pointer" }} />
      <Dialog open={open} onClose={handleClose}>
        <DialogActions>
          <Button onClick={handleClose}>X</Button>
        </DialogActions>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <textarea
            cols="55"
            rows="10"
            className="addpost_text"
            value={data}
            onChange={(e) => setData(e.target.value)}
          ></textarea>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleEdit}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditTask;
