import { useEffect, useState } from "react";
import { Container, Typography, Paper } from "@mui/material";

export default function PredictionHistory() {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("jwt");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/predict/history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setPredictions(data);
    };

    fetchHistory();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Your Fitness History
      </Typography>

      {predictions.length === 0 ? (
        <Typography>No predictions yet.</Typography>
      ) : (
        predictions.map((pred, idx) => (
          <Paper key={idx} elevation={2} sx={{ p: 2, my: 2 }}>
            <Typography variant="body1">
              <strong>Date:</strong> {new Date(pred.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body1">
              <strong>Calories:</strong> {pred.calories} kcal
            </Typography>
            <Typography variant="body1">
              <strong>Workout:</strong> {pred.workout}
            </Typography>
          </Paper>
        ))
      )}
    </Container>
  );
}
