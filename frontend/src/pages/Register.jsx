import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous errors

    try {
      await register(name, email, password);
      navigate("/dashboard");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Registration failed. Please try again.";
      setError(message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Paper elevation={6} sx={{ p: 4, width: "100%" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Create Account
          </Typography>

          {error && (
            <Typography color="error" align="center" mb={2}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
            >
              Register
            </Button>
          </form>

          <Typography align="center" mt={2}>
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
