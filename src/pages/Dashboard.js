import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box, Paper } from "@mui/material";

export default function Dashboard() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) return navigate("/");

        try {
            const decoded = JSON.parse(atob(token.split(".")[1]));
            setEmail(decoded.email);
        } catch {
            localStorage.removeItem("jwt");
            navigate("/");
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("jwt");
        navigate("/");
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            

            <Typography variant="h4" gutterBottom>
                Welcome <strong>{email}</strong>
            </Typography>



            <Paper elevation={3} sx={{ p: 4, mt: 5, borderRadius: 3 }}>
                <Typography variant="h5" gutterBottom color="secondary">
                    Personalized Fitness Assistant
                </Typography>

                <Typography variant="body2" gutterBottom>
                    Get customized workout and calorie recommendations based on your body data and goal.
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate("/history")}
                >
                    Fitness History
                </Button>
            </Paper>

            <Paper elevation={3} sx={{ p: 4, mt: 5, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom color="secondary">
                Personalized Fitness Assistant
            </Typography>

            <Typography variant="body2" gutterBottom>
                Get customized workout and calorie recommendations based on your body data and goal.
            </Typography>

            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => navigate("/predict")}
            >
                Get Fitness Recommendation
            </Button>
        </Paper>
        </Container>
    );
}
