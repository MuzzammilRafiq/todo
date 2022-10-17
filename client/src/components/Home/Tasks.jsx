import { Box, List, Grid, Typography } from "@mui/material/";
import { useSelector } from "react-redux";
import Task from "./Task";

function Tasks() {
  const user = useSelector((state) => state.user.value);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752, margin: "auto" }}>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h3" component="div">
          Tasks
        </Typography>
        <List>
          {user.tasks?.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </List>
      </Grid>
    </Box>
  );
}
export default Tasks;
