import { ReactNode } from "react";
import { Container, Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { EventDetails } from "../../models/eventInterface";

interface TablePageProps {
  event: EventDetails;
  children: ReactNode;
}

const TablePage: React.FC<TablePageProps> = ({ event, children }) => {
  return event ? (
    <Container fixed>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            component="h1"
            color="primary"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <PersonIcon color="primary" />
            {event.title}
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={8}>
              <Typography variant="body1" color="textSecondary">
                <strong>Fecha:</strong>{" "}
                {event.date.format("DD/MM/YYYY") || "yo"}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Duración:</strong> {event.duration}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Horas becarias:</strong> {event.scholarshipHours}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Lugar:</strong> {event.location}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Máximo de becarios:</strong> {event.maxParticipants}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Máximo de suplentes:</strong> {event.minParticipants}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" component="h2" color="primary">
                Descripción:
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {event.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Typography variant="h6" align="center">
      Cargando detalles del evento...
    </Typography>
  );
};

export default TablePage;
