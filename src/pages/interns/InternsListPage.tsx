import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Event, EventDetails } from "../../models/eventInterface";
import EventDetailsPage from "../../components/common/EventDetailsPage";
import { getFullEventInformationService } from "../../services/eventsService";

interface FullEvent extends Event {
  interns: [];
}
const InternsListPage = () => {
  const [editHoursOpen, setEditHoursOpen] = useState(false);
  const [newHours, setNewHours] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [event, setEvent] = useState<FullEvent>();
  const [eventDetails, setEventDetails] = useState<any>(null);
  const [students, setStudents] = useState<any>([
    {
      id: 1,
      name: "Alexia Diana Marín Mamani",
      code: "608555",
      time: "22:23",
      status: "Rechazado",
      hours: 10,
    },
    {
      id: 2,
      name: "Rodrigo Gustavo Reyes Monzón",
      code: "679523",
      time: "08:49",
      status: "Aceptado",
      hours: 20,
    },
  ]);
  const { id_event } = useParams<{ id_event: string }>();
  const navigate = useNavigate();

  const handleStatusChange = (id: number, newStatus: string) => {
    setStudents((prevStudents: any) =>
      prevStudents.map((student: any) =>
        student.id === id ? { ...student, status: newStatus } : student
      )
    );
  };

  const fetchFullEvent = async () => {
    const res = id_event && (await getFullEventInformationService(id_event));
    if (res.success) {
      setEvent(res.data);
    }
  };

  const setupEventDetails = () => {
    const details = event && {
      title: event?.title,
      date: dayjs(event?.start_date),
      endDate: dayjs(event?.end_date),
      duration: event?.duration_hours,
      scholarshipHours: event?.assigned_hours,
      location: event?.location,
      maxParticipants: event?.max_interns,
      minParticipants: event?.min_interns,
      responsiblePerson: event?.responsible_intern_id,
      description: event?.description,
    };
    setEventDetails(details);
    console.log(event, "xd");
  };

  const setupStudents = () => {
    const students =
      event &&
      event.interns.map((intern: any) => ({
        id: `${intern.id_interns}${intern.code}`,
        name: `${intern.name} ${intern.lastname} ${intern.mothername}`,
        code: intern.code,
        time: dayjs(intern.registration_date).format("DD/MM: hh:MM"),
        status: intern.type,
        hours: event.assigned_hours,
        //TODO: change to hours from event_interns
      }));
    setStudents(students);
  };

  useEffect(() => {
    fetchFullEvent();
  }, []);

  useEffect(() => {
    setupEventDetails();
    setupStudents();
  }, [event]);

  const handleHoursSave = () => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === selectedId
          ? { ...student, hours: Number(newHours) }
          : student
      )
    );
    handleEditHoursClose();
  };

  const handleEditHoursOpen = (id: number, currentHours: string) => {
    setSelectedId(id);
    setNewHours(currentHours);
    setEditHoursOpen(true);
  };

  const handleEditHoursClose = (event?: object, reason?: string) => {
    if (reason && reason === "backdropClick") return;
    setEditHoursOpen(false);
    setSelectedId(null);
  };

  const handleAddStudent = () => {
    navigate("/students");
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nombre del becario/a",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "code",
      headerName: "Código",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "time",
      headerName: "Hora de registro",
      type: "string",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Estado",
      headerAlign: "center",
      align: "center",
      flex: 1,

      renderCell: (params) => (
        <Select
          fullWidth
          value={params.value}
          onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
          variant="standard"
          sx={{
            minHeight: 0,
            lineHeight: 1.5,
            padding: "2px 8px",
            "& .MuiSelect-select": {
              padding: 0,
            },
            "& .MuiInputBase-root": {
              margin: 0,
            },
          }}
        >
          <MenuItem value="accepted">Aceptado</MenuItem>
          <MenuItem value="rejected">Rechazado</MenuItem>
          <MenuItem value="reserve">Suplente</MenuItem>
          <MenuItem value="pending">Pendiente</MenuItem>
        </Select>
      ),
    },
    {
      field: "hours",
      headerName: "Horas Becarias",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => `${params.value} horas`,
    },
    {
      field: "edit",
      headerName: "Editar",
      headerAlign: "center",
      align: "center",
      flex: 1,

      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => handleEditHoursOpen(params.row.id, params.row.hours)}
        >
          Editar
        </Button>
      ),
    },
  ];

  return (
    <div style={{ position: "relative", height: "100vh", padding: "19px" }}>
      <IconButton
        onClick={() => window.history.back()}
        aria-label="back"
        style={{
          position: "absolute",
          top: "17px",
          left: "-9px",
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleAddStudent}
        startIcon={<AddIcon />}
        style={{
          position: "absolute",
          top: "29px",
          right: "39px",
          zIndex: 1,
        }}
      >
        Agregar Estudiante
      </Button>
      {eventDetails && (
        <EventDetailsPage
          event={eventDetails}
          children={
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={students}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                classes={{
                  root: "bg-white dark:bg-gray-800",
                  columnHeader: "bg-gray-200 dark:bg-gray-800 ",
                  cell: "bg-white dark:bg-gray-800",
                  row: "bg-white dark:bg-gray-800",
                  columnHeaderTitle: "!font-bold text-center",
                }}
                pageSizeOptions={[5, 10]}
              />
              <Dialog
                open={editHoursOpen}
                onClose={handleEditHoursClose}
                aria-labelledby="edit-hours-dialog-title"
                sx={{
                  "& .MuiDialog-paper": { width: "500px", maxWidth: "80%" },
                }}
              >
                <DialogTitle id="edit-hours-dialog-title" sx={{ mt: 2 }}>
                  <Typography
                    variant="h5"
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    Editar Horas Becarias
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: "left", mt: 1 }}>
                    {
                      students.find((student) => student.id === selectedId)
                        ?.name
                    }
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  <IconButton
                    aria-label="close"
                    onClick={handleEditHoursClose}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[800],
                      padding: "7px",
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <TextField
                    fullWidth
                    value={newHours}
                    onChange={(e) => setNewHours(e.target.value)}
                    label="Horas Becarias"
                    type="number"
                    margin="dense"
                  />
                </DialogContent>
                <DialogActions
                  sx={{ justifyContent: "flex-end", padding: "24px" }}
                >
                  <Button
                    onClick={handleEditHoursClose}
                    sx={{
                      color: "white",
                      backgroundColor: "primary",
                      "&:hover": { backgroundColor: "darkblue" },
                      fontWeight: "bold",
                      marginRight: 2,
                    }}
                    variant="contained"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleHoursSave}
                    sx={{
                      color: "white",
                      backgroundColor: "red",
                      "&:hover": { backgroundColor: "darkred" },
                      fontWeight: "bold",
                    }}
                    variant="contained"
                  >
                    Guardar
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          }
        />
      )}
    </div>
  );
};

export default InternsListPage;
