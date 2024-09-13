import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CompleteScholarshipHourEventCard = ({ event }) => {
    const { id_event, name, description, validatedHours, startDate, duration, place, maxInterns, minInterns } = event;
    const [dialogConfirmationFinishEvent, setDialogConfirmationFinishEventOpen] = useState(false);
    const [dialogShowTheResultsFinishEvent, setDialogShowTheResultsFinishEventOpen] = useState(false);

    dayjs.locale("es");

    const navigate = useNavigate();

    const goToShowEvent = () => {
        navigate(`/interns`);
    }

    const handleDialogConfirmationFinishEventOpen = () => {
        setDialogConfirmationFinishEventOpen(true);
    };

    const handleDialogShowTheResultsFinishEventOpen = () => {
        setDialogShowTheResultsFinishEventOpen(true);
        setDialogConfirmationFinishEventOpen(false);
    };
    
    const handleDialogConfirmationFinishEventClose = () => {
        setDialogConfirmationFinishEventOpen(false);
    };

    const handleDialogShowTheResultsFinishEventClose = () => {
        setDialogShowTheResultsFinishEventOpen(false);
    };

    const handleConfirmationEnding = () => {
        setDialogShowTheResultsFinishEventOpen(false);
        navigate(`/interns`);
    };

    return (
        <Card sx={{ maxWidth: 1150 }}>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography fontSize={20} color="text.primary" sx={{ fontWeight: "bold" }}>
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3.5}>
                        <Typography fontSize={17} color="text.primary">
                            <strong>Fecha:</strong> {dayjs(startDate).format("DD/MM/YYYY")}
                        </Typography>
                        <Typography fontSize={17} color="text.primary">
                            <strong>Duración:</strong> {duration}
                        </Typography>
                        <Typography fontSize={17} color="text.primary">
                            <strong>Horas becarias:</strong> {validatedHours}
                        </Typography>
                        <Typography fontSize={17} color="text.primary">
                            <strong>Lugar:</strong> {place}
                        </Typography>
                        <Typography fontSize={17} color="text.primary">
                            <strong>Máximo de becarios:</strong> {maxInterns}
                        </Typography>
                        <Typography fontSize={17} color="text.primary">
                            <strong>Máximo de suplentes:</strong> {minInterns}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Typography fontSize={17} color="text.primary">
                            <strong>Descripción:</strong> {description}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3.5} sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                        <Button aria-label="Solicitudes de inscripción"
                            variant="contained"
                            color="secondary"
                            sx={{ width: 250 }}
                            onClick={goToShowEvent}> Solicitudes de inscripción
                        </Button>
                        <Button aria-label="Finalizar evento"
                            variant="contained"
                            color="error"
                            sx={{ marginTop: 3, width: 180 }}
                            onClick={handleDialogConfirmationFinishEventOpen}> Finalizar evento
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
            
            <Dialog
                open={dialogConfirmationFinishEvent}
                onClose={(_, reason) => {
                    if (reason !== "backdropClick") {
                        handleDialogConfirmationFinishEventClose();
                    }
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center", position: "relative" }}>
                    <Typography variant="h5" align="center" sx={{ fontWeight: 'bold' }}>
                        Seguro de finalizar evento
                    </Typography>
                    <Button
                        onClick={handleDialogConfirmationFinishEventClose}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            minWidth: 32,
                            minHeight: 32,
                            padding: 0,
                            color: "grey",
                            fontSize: "1.25rem",
                        }}
                    >
                        &#10005;
                    </Button>
                    <Typography variant="body1" sx={{ marginTop: 1 }}>
                        ¿Estás seguro de que deseas finalizar este evento? Esta acción no se puede deshacer.
                    </Typography>
                </DialogTitle>
                <DialogActions sx={{ justifyContent: "flex-end", padding: "16px", gap: 2 }}>
                    <Button
                        onClick={handleDialogShowTheResultsFinishEventOpen}
                        color="error"
                        variant="contained"
                        sx={{ textTransform: "none", fontWeight: "bold" }}
                    >
                        Finalizar
                    </Button>
                    <Button
                        onClick={handleDialogConfirmationFinishEventClose}
                        color="primary"
                        variant="contained"
                        sx={{ textTransform: "none", fontWeight: "bold", backgroundColor: "primary", color: "white" }}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={dialogShowTheResultsFinishEvent}
                onClose={handleDialogShowTheResultsFinishEventClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {name} finalizado exitosamente.
                </DialogTitle>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button onClick={handleConfirmationEnding} color="primary" autoFocus>
                        Ver resultados
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default CompleteScholarshipHourEventCard;