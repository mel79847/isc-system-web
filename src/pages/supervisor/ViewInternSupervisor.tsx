import { useState } from "react";
import { Checkbox, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid } from "@mui/material";
import dayjs from "dayjs";
import * as XLSX from "xlsx"; 
import EventDetailsPage from "../../components/common/EventDetailsPage"; 
interface StudentRow {
  id: number;
  name: string;
  code: string;
  observations: string;
  assistance: boolean;
}

const eventDetails = {
  title: "Evento de 100 mejores",
  date: dayjs("2024-07-01T10:00:00Z"),
  endDate: dayjs("2024-07-01T16:00:00Z"),
  duration: 6,
  scholarshipHours: "4 horas",
  location: "Centro de Eventos, Campus Achocalla",
  maxParticipants: 30,
  minParticipants: 5,
  responsiblePerson: "Juan",
  description: "Se necesitan becarios que ayuden en la logística del evento donde se recibirá a los estudiantes ganadores de la beca 100 mejores.",
  status: "PENDIENTE",
};

const ViewInternSupervisor = () => {
  const [students, setStudents] = useState<StudentRow[]>([
    {
      id: 1,
      name: "Alexia Diana Marín Mamani",
      code: "60855",
      observations: "Hizo más de lo esperado",
      assistance: true,
    },
    {
      id: 2,
      name: "Rodrigo Gustavo Reyes Monzón",
      code: "67952",
      observations: "Desapareció después de la primera hora...",
      assistance: false,
    },
    {
      id: 3,
      name: "Mishel Salma Espinoza Santander",
      code: "61729",
      observations: "Participación regular.",
      assistance: false,
    },
  ]);

  const handleCheckboxChange = (id: number, checked: boolean) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, assistance: checked } : student
    );
    setStudents(updatedStudents);
  };

  const handleObservationChange = (id: number, value: string) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, observations: value } : student
    );
    setStudents(updatedStudents);
  };

  const handleExportToExcel = () => {
    const worksheetData = students.map((student) => ({
      Nombre: student.name,
      Código: student.code,
      Observaciones: student.observations,
      Asistencia: student.assistance ? "Sí" : "No",
    }));

    const ws = XLSX.utils.json_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Asistentes");
    XLSX.writeFile(wb, "lista_asistentes_evento.xlsx");
  };

  return (
     <EventDetailsPage event={eventDetails}>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Código</TableCell>
              <TableCell>Observaciones</TableCell>
              <TableCell>Asistencia</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.code}</TableCell>
                <TableCell>
                  <TextField
                    value={student.observations}
                    onChange={(e) => handleObservationChange(student.id, e.target.value)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={student.assistance}
                    onChange={(e) => handleCheckboxChange(student.id, e.target.checked)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> 
      <Grid container justifyContent="center" sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleExportToExcel}  
          >
            Cerrar Registro
          </Button>
        </Grid> 
     </EventDetailsPage>
  );
};

export default ViewInternSupervisor;

