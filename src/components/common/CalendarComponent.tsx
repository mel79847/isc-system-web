import { Card, CardContent, Typography } from "@mui/material";
// @ts-ignore
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

// Componente CalendarCard
// @ts-ignore
const CalendarCard = ({ events }) => {
  return (
    <Card raised sx={{ margin: 2, padding: 2 }}>
      <CardContent>
        <Typography
          data-testid="calendar-title"
          variant="h6"
          component="div"
          gutterBottom
          sx={{
            textAlign: "center",
            color: "primary.main",
            fontWeight: "bold",
          }}
        >
          Calendario de Eventos
        </Typography>
        <div style={{ height: 400 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarCard;
