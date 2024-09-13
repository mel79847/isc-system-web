import { Grid, Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GraphicHours from "./GraphicHours";
import HoursCard from "../../components/common/HoursCard";
import { Interns } from "../../models/internsInterface";
import { getInternService } from "../../services/internService";



function HoursPage() {
    const navigate = useNavigate();
    const [intern, setIntern] = useState<Interns>();

    const fetchIntern = async () => {
        const res = await getInternService(1);
        if(res.success){
            setIntern(res.data);
        }
    }

    useEffect(()=>{
        fetchIntern();
    },[]);

    const handleEventsClick = () => {
    navigate("/events");
    };

    const handleRegistrationEventsClick = () => {
    navigate("/myEvents");
    };

    return (
    <Container fixed>
        <Grid container spacing={8} alignItems="center" justifyContent="center">
        <Grid item xs={22} md={4}>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <HoursCard
                backgroundColor="#f3a43f"
                textColor="#FFFFFF"
                title="Total de Horas Requeridas"
                subtitle=""
                count={intern?.total_hours || 0}
                percentage={100}
                />
            </Grid>
            <Grid item xs={12}>
                <HoursCard
                backgroundColor="#359be5"
                textColor="#FFFFFF"
                title="Horas Realizadas"
                subtitle=""
                count={intern?.completed_hours || 0}
                percentage={(intern?.completed_hours || 0) / (intern?.total_hours || 1) * 100}
                />
            </Grid>
            <Grid item xs={12}>
                <HoursCard
                backgroundColor="#ef4444"
                textColor="#FFFFFF"
                title="Horas Faltantes"
                subtitle=""
                count={intern?.pending_hours || 0}
                percentage={(intern?.pending_hours || 0) / (intern?.total_hours || 1) * 100}
                />
            </Grid>
            </Grid>
        </Grid>
        <Grid item xs={16} md={6}>
            <Box sx={{ width: "100%", padding: "20px" }}>
            <GraphicHours />
            </Box>
        </Grid>
        </Grid>
        <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            flexDirection: { xs: "column", md: "row" },
        }}
        >
        <Button
            variant="contained"
            color="primary"
            sx={{ margin: "10px", width: { xs: "100%", md: "200px" } }}
            onClick={handleRegistrationEventsClick}
        >
            Pre inscripciones
        </Button>
        <Button
            variant="contained"
            color="primary"
            sx={{ margin: "10px", width: { xs: "100%", md: "200px" } }}
            onClick={handleEventsClick}
        >
            Eventos
        </Button>
        </Box>
    </Container>
    );
}

export default HoursPage;
