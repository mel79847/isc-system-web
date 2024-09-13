import { useState } from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const EventByInterns = () => {
  const [editHoursOpen, setEditHoursOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Alexia Diana Marín Mamani",
      code: "608555",
      semester: "6",
      events: [
        { name: "Seminario de Innovación Tecnológica", status: "Participante" },
        { name: "Curso de Gestión de Proyectos", status: "Supervisor" }
      ]
    },
    {
      id: 2,
      name: "Rodrigo Gustavo Reyes Monzón",
      code: "679523",
      semester: "8",
      events: [
        { name: "Curso de Gestión de Proyectos", status: "Participante" }
      ]
    }
  ]);

  const handleEditHoursOpen = (id: number) => {
    setSelectedId(id);
    setEditHoursOpen(true);
  };
  
  const handleEditHoursClose = () => {
    setEditHoursOpen(false);
    setSelectedId(null);
  };

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Código",
      headerAlign: "center",
      align: "center",
      flex: 1,
      headerClassName: 'headerStyle',
      cellClassName: 'cellStyle',
    },
    {
      field: "name",
      headerName: "Nombre",
      headerAlign: "center",
      align: "center",
      flex: 1,
      headerClassName: 'headerStyle',
      cellClassName: 'cellStyle',
    },
    {
      field: "semester",
      headerName: "Semestre",
      headerAlign: "center",
      align: "center",
      flex: 1,
      headerClassName: 'headerStyle',
      cellClassName: 'cellStyle',
    },
    {
      field: "eventsCount",
      headerName: "Eventos",
      headerAlign: "center",
      align: "center",
      flex: 1,
      headerClassName: 'headerStyle',
      renderCell: (params) => (
        <Button onClick={() => handleEditHoursOpen(params.row.id)}>
          {params.row.events.length}
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: '100vh', padding: '20px' }}>
      <Typography variant="h4" color="primary" style={{ marginBottom: '10px' }}>
        Becarios
      </Typography>
      <Typography variant="subtitle2" color="textSecondary" style={{ marginBottom: '20px' }}>
        Lista de becarios
      </Typography>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={students}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          getRowId={(row) => row.id}
          sx={{
            "& .MuiDataGrid-columnHeaders": { backgroundColor: "#d3d3d3" }, 
            "& .MuiDataGrid-columnHeaderTitle": {
              color: "#000", 
              fontWeight: "bold", 
            },
            "& .MuiDataGrid-cell": {
              color: "#000", 
              fontWeight: "normal", 
            },
          }}
        />
      </div>

      <Dialog
        open={editHoursOpen}
        onClose={handleEditHoursClose}
        aria-labelledby="edit-hours-dialog-title"
        sx={{ '& .MuiDialog-paper': { width: '500px', maxWidth: '80%' } }}
      >
        <DialogTitle id="edit-hours-dialog-title">
          <Typography variant="h5" align="center" color="primary" style={{ fontWeight: 'bold' }}>
            {students.find((student) => student.id === selectedId)?.name} - {students.find((student) => student.id === selectedId)?.semester}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedId && (
            <div>
              <table style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px', backgroundColor: '#f0f0f0', border: '1px solid #ddd' }}>Evento</th>
                    <th style={{ textAlign: 'left', padding: '8px', backgroundColor: '#f0f0f0', border: '1px solid #ddd' }}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {students.find((student) => student.id === selectedId)?.events.map((event, index) => (
                    <tr key={index}>
                      <td style={{ padding: '8px', border: '1px solid #ddd' }}>{event.name}</td>
                      <td style={{ padding: '8px', border: '1px solid #ddd', color: event.status === "Supervisor" ? 'orange' : 'blue' }}>
                        {event.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventByInterns;
