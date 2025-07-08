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

const goals = ["Lose Weight", "Maintain Weight", "Gain Weight"];
const gender=["Male","Female"]

export default function PredictForm() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    duration: "",
    heart_rate : "",
    body_temp:"",
    goal: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    console.log(token)

    const { age, gender, height, weight, duration , heart_rate ,body_temp, goal } = formData;
    console.log(body_temp)
    console.log(formData)
    // Basic validation
    if (!age || !gender || !height || !weight || !body_temp  || !goal || !duration || !heart_rate) {
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
      console.log(data)
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
            select
            fullWidth
            label="Gender"
            name="gender"
            margin="normal"
            value={formData.gender}
            onChange={handleChange}
          >
            {gender.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>
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
            fullWidth
            label="Body Temp (C)"
            name="body_temp"
            type="number"
            margin="normal"
            value={formData.body_temp}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Excercise Duration (Min)"
            name="duration"
            type="number"
            margin="normal"
            value={formData.duration}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Average Heart Rate (BPM)"
            name="heart_rate"
            type="number"
            margin="normal"
            value={formData.heart_rate}
            onChange={handleChange}
          />
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
              <strong>Calories Burnt:</strong> {result.roundedCalories} kcal
            </Typography>
            <Typography>
              <strong>Workout Suggested:</strong> {result.workout}
            </Typography>
          </Paper>
        )}
      </Paper>
    </Container>
  );
}
