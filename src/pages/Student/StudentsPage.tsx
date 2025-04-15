import { DataGrid, GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Box,
} from "@mui/material";
import ContainerPage from "../../components/common/ContainerPage";
import { deleteStudent, getStudents } from "../../services/studentService";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getPermissionById } from "../../services/permissionsService";
import { HasPermission } from "../../helper/permissions";
import { Permission } from "../../models/permissionInterface";
import dataGridLocaleText from "../../locales/datagridLocaleEs";
import CreateStudentForm from "./CreateStudentForm";

const StudentPage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [addStudentPermission, setAddStudentPermission] = useState<Permission>();
  const [editStudentPermission, setEditStudentPermission] = useState<Permission>();
  const [deleteStudentPermission, setDeleteStudentPermission] = useState<Permission>();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [viewStudentReportPermission, setViewStudentReportPermission] =
    useState<Permission | null>();
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>({
    code: true,
    name: true,
    email: true,
    phone: true,
    actions: true,
  });

  useEffect(() => {
    const fetchPermissions = async () => {
      const response = await getPermissionById(13);
      setAddStudentPermission(response.data[0]);
      const deleteStudentResponse = await getPermissionById(14);
      setDeleteStudentPermission(deleteStudentResponse.data[0]);
      const editStudentResponse = await getPermissionById(15);
      setEditStudentPermission(editStudentResponse.data[0]);
      const viewStudentReportResponse = await getPermissionById(16);
      setViewStudentReportPermission(viewStudentReportResponse.data[0]);
    };
    fetchPermissions();
    fetchStudents();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Código",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
      maxWidth: 150,
      resizable: true,
    },
    {
      field: "name",
      headerName: "Nombre Completo",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 200,
      maxWidth: 300,
      resizable: true,
    },
    {
      field: "email",
      headerName: "Correo",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 200,
      maxWidth: 300,
      resizable: true,
    },
    {
      field: "phone",
      headerName: "Celular",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      resizable: true,
    },
    {
      field: "actions",
      headerName: "Acciones",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      renderCell: (params) => (
        <div>
          {HasPermission(viewStudentReportPermission?.name || "") && (
            <IconButton color="primary" aria-label="ver" onClick={() => handleView(params.row.id)}>
              <VisibilityIcon />
            </IconButton>
          )}
          {HasPermission(editStudentPermission?.name || "") && (
            <IconButton
              color="primary"
              aria-label="editar"
              onClick={() => handleEdit(params.row.id)}
            >
              <EditIcon />
            </IconButton>
          )}
          {HasPermission(deleteStudentPermission?.name || "") && (
            <IconButton
              color="secondary"
              aria-label="eliminar"
              onClick={() => handleClickOpen(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      ),
    },
  ];

  const handleCreateStudent = () => setOpenCreateModal(true);

  const handleStudentCreated = () => {
    setOpenCreateModal(false);
    fetchStudents();
  };

  const fetchStudents = async () => {
    const students = await getStudents();
    setStudents(students.data);
    console.log(students);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleView = (id: number) => {
    navigate(`/profile/${id}`);
    console.log(`Ver estudiante con id: ${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/edit-student/${id}`);
  };

  const handleClickOpen = (id: number) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleDelete = async () => {
    if (selectedId !== null) {
      try {
        await deleteStudent(selectedId);
        fetchStudents();
        console.log(`Eliminar estudiante con id: ${selectedId}`);
      } catch (error) {
        console.log(error);
      } finally {
        handleClose();
      }
    }
  };

  return (
    <ContainerPage
      title={"Estudiantes"}
      subtitle={"Lista de estudiantes"}
      actions={
        HasPermission(addStudentPermission?.name || "") && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCreateStudent}
            startIcon={<AddIcon />}
            disabled={!addStudentPermission}
            sx={{
              width: { xs: "120%", sm: "auto" },
              mb: { xs: 1, sm: 0 },
              mt: { xs: 5, sm: 0 },
            }}
          >
            Agregar Estudiante
          </Button>
        )
      }
      children={
        <Box sx={{ width: "100%", height: { xs: "auto" } }}>
          <DataGrid
            rows={students}
            columns={columns}
            localeText={dataGridLocaleText}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => {
              const updatedModel = {
                ...newModel,
                name: true,
              };
              const visibleColumns = Object.values(updatedModel).filter(Boolean).length;
              if (visibleColumns === 0) {
                return;
              }
              setColumnVisibilityModel(updatedModel);
            }}
            classes={{
              root: "bg-white dark:bg-gray-800",
              columnHeader: "bg-gray-200 dark:bg-gray-800",
              cell: "bg-white dark:bg-gray-800",
              row: "bg-white dark:bg-gray-800",
              columnHeaderTitle: "!font-bold text-center",
            }}
            slotProps={{
              columnsManagement: {
                autoFocusSearchField: false,
                searchInputProps: {
                  sx: {
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "secondary.main",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "secondary.main",
                      },
                    },
                    "& input": {
                      outline: "none !important",
                      boxShadow: "none !important",
                    },
                  },
                },
              },
            }}
            sx={{
              "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
                outline: "none !important",
                border: "none !important",
                boxShadow: "none !important",
              },
              "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
                outline: "none !important",
                border: "none !important",
                boxShadow: "none !important",
              },
              "& .MuiDataGrid-cell--editing": {
                boxShadow: "none !important",
              },
              "& .MuiDataGrid-cell.MuiDataGrid-cell--editing": {
                outline: "none !important",
              },
              "& .MuiDataGrid-cell": {
                borderColor: "transparent",
              },
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor: "inherit !important",
              },
            }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
          />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Confirmar eliminación"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ¿Estás seguro de que deseas eliminar este estudiante? Esta acción no se puede
                deshacer.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleDelete} color="secondary" autoFocus>
                Eliminar
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openCreateModal}
            onClose={() => setOpenCreateModal(false)}
            maxWidth="md"
            PaperProps={{
              sx: {
                borderRadius: 3,
                p: 0,
                maxHeight: "100vh",
              },
            }}
          >
            <DialogContent sx={{ p: 2, m: 0 }}>
              <CreateStudentForm onSuccess={handleStudentCreated} />
            </DialogContent>
          </Dialog>
        </Box>
      }
    ></ContainerPage>
  );
};

export default StudentPage;
