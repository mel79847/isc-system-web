import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import DescriptionIcon from "@mui/icons-material/Description";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import "dayjs/locale/es";
import "../../style.css";
import { EventCardProps } from "../../models/eventCardProps";
import EventSubheader from "./EventSubheader";
import { registerInternEventService } from "../../services/eventsService";
import { useUserStore } from "../../store/store";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const EventCard = ({ event }: EventCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [alert, setAlert] = useState<{
    severity: "success" | "error";
    message: string;
  } | null>(null);
  const user = useUserStore((state) => state.user);

  const {
    id: id_event,
    title: title,
    description: description,
    start_date: start_date,
    end_date: end_date,
    duration_hours: duration_hours,
    location: location,
    max_interns: max_interns,
    min_interns: min_interns,
    responsible_intern_id: responsible_intern_id,
    //TODO: get responsible intern info
  } = event;

  dayjs.locale("es");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirm = async () => {
    const res = await registerInternEventService(id_event, user!.id);
    if (res.success) {
      setAlert({
        severity: "success",
        message: `¡Te has registrado con éxito en el evento ${title}!`,
      });
    } else {
      setAlert({
        severity: "error",
        message: `No se pudo completar el registro para el evento ${title}. Por favor, intenta de nuevo más tarde.`,
      });
    }
    setSnackbarOpen(true);
    setDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDescriptionClick = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={title}
        titleTypographyProps={{
          fontSize: 20,
          align: "center",
          color: "primary",
          fontWeight: "bold",
        }}
        sx={{ minHeight: 100, maxHeight: 150 }}
      />
      <EventSubheader event={event} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          fontSize={16}
          color="text.primary"
          onClick={handleDescriptionClick}
          sx={{
            cursor: "pointer",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: showFullDescription ? "unset" : 1,
            flex: 1,
            textAlign: "justify",
          }}
        >
          {description}
        </Typography>
        {!showFullDescription && description && description.length > 0 && (
          <Typography
            fontSize={16}
            color="primary"
            onClick={handleDescriptionClick}
            sx={{ cursor: "pointer" }}
          >
            [Ver más]
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Registrarse">
          <IconButton aria-label="registrarse" onClick={handleDialogOpen}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          title="Descripción"
          aria-label="descripcion"
        >
          <DescriptionIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography align="center" fontSize={17} color="primary">
            <strong>Detalles del evento</strong>
          </Typography>
          <Typography
            fontSize={15}
            color="text.primary"
            marginLeft={2}
            marginTop={2}
          >
            <strong>Fecha inicial: </strong>{" "}
            {dayjs(start_date).format("DD/MM/YYYY HH:mm")}
          </Typography>
          <Typography fontSize={15} color="text.primary" marginLeft={2}>
            <strong>Fecha final: </strong>{" "}
            {dayjs(end_date).format("DD/MM/YYYY HH:mm")}
          </Typography>
          <Typography fontSize={15} color="text.primary" marginLeft={2}>
            <strong>Encargado: </strong> {responsible_intern_id}
          </Typography>
          <Typography fontSize={15} color="text.primary" marginLeft={2}>
            <strong>Duración: </strong> {duration_hours} horas
          </Typography>
          <Typography fontSize={15} color="text.primary" marginLeft={2}>
            <strong>Lugar: </strong> {location}
          </Typography>
          <Typography fontSize={15} color="text.primary" marginLeft={2}>
            <strong>Máximo de Becarios: </strong> {max_interns}
          </Typography>
          <Typography fontSize={15} color="text.primary" marginLeft={2}>
            <strong>Máximo de Suplentes: </strong> {min_interns}
          </Typography>
        </CardContent>
      </Collapse>
      <Dialog
        open={dialogOpen}
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            handleDialogClose();
          }
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
      >
        <DialogTitle>
          <Typography variant="h5" align="center" sx={{ fontWeight: "bold" }}>
            Confirmar inscripción
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleDialogClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" align="center">
            ¿Estás seguro de inscribirte al evento "{title}"?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "flex-end", padding: "24px" }}>
          <Button
            onClick={handleDialogClose}
            variant="contained"
            sx={{
              backgroundColor: "primary",
              color: "white",
              marginRight: 2,
              fontWeight: "bold",
              minWidth: "120px",
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            sx={{
              backgroundColor: "red",
              color: "white",
              fontWeight: "bold",
              minWidth: "120px",
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {alert && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      )}
    </Card>
  );
};

export default EventCard;
