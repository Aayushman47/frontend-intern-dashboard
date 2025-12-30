import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [search, setSearch] = useState("");



  const fetchTasks = async () => {
    const { data } = await api.get("/tasks");
    setTasks(data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await api.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditingTitle(task.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const saveEdit = async (id) => {
    await api.put(`/tasks/${id}`, { title: editingTitle });
    setEditingId(null);
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) =>
  task.title.toLowerCase().includes(search.toLowerCase())
);


  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Task Dashboard</Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography>{user.name}</Typography>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={4} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            Your Tasks
          </Typography>

          <TextField
            fullWidth
            label="Search tasks"
            margin="normal"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />


          {/* Add Task */}
          <Box component="form" onSubmit={addTask} display="flex" gap={2} mb={3}>
            <TextField
              fullWidth
              label="New Task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button variant="contained" type="submit">
              Add
            </Button>
          </Box>

          {/* Task List */}
          {filteredTasks.length === 0 ? (
            <Typography color="text.secondary">
              No tasks yet. Add your first one 🚀
            </Typography>
          ) : (
            <List>
              {filteredTasks.map((task, index) => (
                <Box key={task._id}>
                  <ListItem
                    secondaryAction={
                      editingId === task._id ? (
                        <>
                          <IconButton
                            color="success"
                            onClick={() => saveEdit(task._id)}
                          >
                            <SaveIcon />
                          </IconButton>
                          <IconButton color="inherit" onClick={cancelEdit}>
                            <CloseIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton onClick={() => startEdit(task)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => deleteTask(task._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )
                    }
                  >
                    {editingId === task._id ? (
                      <TextField
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        size="small"
                        fullWidth
                      />
                    ) : (
                      <ListItemText primary={task.title} />
                    )}
                  </ListItem>
                  {index !== tasks.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          )}
        </Paper>
      </Container>
    </>
  );
}
