import { ChangeEvent, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Student } from "../../models/studentInterface";
import { getPermissionById } from "../../services/permissionsService";
import { Permission } from "../../models/permissionInterface";
import { HasPermission } from "../../helper/permissions";
import { Box, IconButton, Paper } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const tableHeaders: GridColDef[] = [
  {
    field: "studentName",
    headerName: "Estudiante",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "tutorName",
    headerName: "Tutor",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "reviewerName",
    headerName: "Revisor",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  // TODO Falta definir las acciones que se realizarán y sus respectivos handlers
  {
    field: "actions",
    headerName: "Acciones",
    headerAlign: "center",
    align: "center",
    flex: 1,
    renderCell: (params) => (
      <div>
        {(
          <IconButton
            color="primary"
            aria-label="ver"
          >
            <VisibilityIcon />
          </IconButton>)}
        {(
          <IconButton
            color="primary"
            aria-label="editar"
          >
            <EditIcon />
          </IconButton>
        )}
        {(
          <IconButton
            color="secondary"
            aria-label="eliminar"
          >
            <DeleteIcon />
          </IconButton>
        )}
      </div>
    ),
  }
];

interface GraduationData {
  id: number
  studentName: string;
  period: string;
  tutorName: string;
  reviewerName: string;
  actions: string;
}

function insertRow(
  id: number,
  studentName: string,
  period: string,
  tutorName: string,
  reviewerName: string,
  actions: string
): GraduationData {
  return {
    id, studentName, period, tutorName, reviewerName, actions
  };
}

//TODO Estos son datos para la prueba de la vista, usar los correctos desde la carga de datos
const datosTemporales: GraduationData[] = [
  insertRow(1, 'Jose Juan', 'Primero-2025', 'Mario Hugo', 'Tulio Triviño', 'No data'),
  insertRow(2, 'Juan José', 'Segundo-2024', 'Paco Perez', 'Tulio Triviño', 'No data'),
  insertRow(3, 'Mickey Mouse', 'Primero-2025', 'Mario Hugo', 'Tulio Triviño', 'No data'),
  insertRow(4, 'Carlos.', 'Primero-2025', 'Mario.', 'Tulio.', 'No data'),
  insertRow(5, 'Pablo Miranda', 'Primero-2024', 'Jose Chaves', 'Santiago Vasquez', 'No data'),
  insertRow(6, 'Alan Turing', 'Primero-1938', 'Alonzo Church', 'Alonzo Church', 'No data'),
  insertRow(7, 'Test1', 'Primero-2025', 'Hugo Mario', 'Miguel Lopez', 'No data'),
  insertRow(8, 'Test2', 'Primero-2023', 'Jose Luis', 'Andres Monje', 'No data'),
  insertRow(9, 'Test3', 'Primero-2026', 'Jorge Luis', 'Fernando Alvarez', 'No data'),
  insertRow(10, 'Test4', 'Primero-2022', 'Mariano', 'Tulio Triviñodos', 'No data'),
  insertRow(11, 'Ana García', 'Segundo-2024', 'Laura Pérez', 'Carlos Ruiz', 'No data'),
  insertRow(12, 'Luis Fernández', 'Segundo-2023', 'María López', 'Santiago Torres', 'No data'),
  insertRow(13, 'Clara Martínez', 'Primero-2025', 'José Gómez', 'Fernando Díaz', 'No data'),
  insertRow(14, 'Pedro Sánchez', 'Segundo-2022', 'Ana Torres', 'Miguel Ángel', 'No data'),
  insertRow(15, 'Sofía Ramírez', 'Primero-2026', 'Hugo Martínez', 'Andrés Monje', 'No data'),
  insertRow(16, 'Diego Morales', 'Segundo-2025', 'Patricia López', 'Tulio Triviño', 'No data'),
  insertRow(17, 'Valentina Castro', 'Segundo-2024', 'Mario Hugo', 'Fernando Álvarez', 'No data'),
  insertRow(18, 'Gabriel Ortega', 'Segundo-2023', 'Alberto Pérez', 'Santiago Vasquez', 'No data'),
  insertRow(19, 'Isabella Torres', 'Primero-2025', 'José Chaves', 'Tulio Triviño', 'No data'),
  insertRow(20, 'Mateo Jiménez', 'Segundo-2026', 'Mariano', 'Tulio Triviñodos', 'No data')
]

const GraduationProcessPage = () => {
  const [filteredData, setFilteredData] = useState<Student[] | []>([]);
  const [search, setSearch] = useState("");
  const studentsResponse = useLoaderData() as {
    data: Student[];
    message: string;
  };
  const { data: students } = studentsResponse;
  const navigate = useNavigate();
  const [createProcess, setCreateProcess] = useState<Permission>();

  useEffect(() => {
    const fetchCreateProcess = async () => {
      const response = await getPermissionById(3);
      setCreateProcess(response.data[0]);
    };
    fetchCreateProcess();
  }, []);

  useEffect(() => {
    const results = students.filter((item: Student) =>
      item.student_name.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredData(results);
  }, [search, students]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const goToCreateProcessPage = () => {
    navigate("/createProcess");
  };

  return (
    <>
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between m-5 mb-8 overflow-hidden">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
            <FaSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            id="table-search"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar por nombre de estudiante"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        {HasPermission(createProcess?.name || "") && (<button className="btn z-50 relative" onClick={goToCreateProcessPage}>
          {" "}
          Crear Proceso de Graduación
        </button>)}
      </div>

      {/* Tabla de Datos */}
      <Box sx={{ width: '95%', mb: 2}}>
        <Paper>
          <DataGrid
            // TODO cambiar los datos temporales por los cargados
            rows={datosTemporales}
            columns={tableHeaders}
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
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
          />
        </Paper>
      </Box>
    </>
  );
};

export default GraduationProcessPage;
