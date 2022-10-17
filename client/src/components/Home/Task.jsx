import { ListItem, ListItemText, IconButton, Checkbox } from "@mui/material/";
import { Delete } from "@mui/icons-material";
import EditTask from "./EditTask";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
function Task({ task }) {
  const user = useSelector((state) => state.user.value);
  const { reFetch } = useFetch("http://localhost:3001/task/get", {
    headers: {
      id: user._id,
    },
  });
  const [check, setCheck] = useState(task.flag);
  const handleDelete = async () => {
    try {
      await axios.put(
        "http://localhost:3001/task/del",
        {
          taskid: task._id,
        },
        {
          headers: {
            id: user._id,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheck = async () => {
    setCheck(!check);
    try {
      await axios.put(
        "http://localhost:3001/task/updflag",
        {
          taskid: task._id,
          flag: !check,
        },
        {
          headers: {
            id: "634d6209969159e96148fae7",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ListItem>
      <ListItemText>{task.data}</ListItemText>
      <IconButton onClick={handleDelete}>
        <Delete />
      </IconButton>
      <IconButton>
        <EditTask taskid={task._id} idata={task.data} />
      </IconButton>
      <Checkbox checked={check} onClick={handleCheck} />
    </ListItem>
  );
}

export default Task;
