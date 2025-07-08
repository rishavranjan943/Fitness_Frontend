import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const activityLevels = ["Sedentary", "Moderate", "Active"];
const goals = ["Lose", "Maintain", "Gain"];

export default function PredictForm() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    goal: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");

    const { age, gender, height, weight, activityLevel, goal } = formData;

    // Basic validation
    if (!age || !gender || !height || !weight || !activityLevel || !goal) {
      return alert("Please fill out all fields.");
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setResult(data);
      setLoading(false);
    } catch (error) {
      console.error("Prediction error:", error);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Enter Your Fitness Info
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            margin="normal"
            value={formData.age}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Gender"
            name="gender"
            margin="normal"
            value={formData.gender}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Height (cm)"
            name="height"
            type="number"
            margin="normal"
            value={formData.height}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Weight (kg)"
            name="weight"
            type="number"
            margin="normal"
            value={formData.weight}
            onChange={handleChange}
          />
          <TextField
            select
            fullWidth
            label="Activity Level"
            name="activityLevel"
            margin="normal"
            value={formData.activityLevel}
            onChange={handleChange}
          >
            {activityLevels.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="Goal"
            name="goal"
            margin="normal"
            value={formData.goal}
            onChange={handleChange}
          >
            {goals.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Recommendation"}
          </Button>
        </form>

        {result && (
          <Paper elevation={2} sx={{ mt: 4, p: 3 }}>
            <Typography variant="h6">Prediction Result:</Typography>
            <Typography>
              <strong>Calories:</strong> {result.calories} kcal
            </Typography>
            <Typography>
              <strong>Workout:</strong> {result.workout}
            </Typography>
          </Paper>
        )}
      </Paper>
    </Container>
  );
}
