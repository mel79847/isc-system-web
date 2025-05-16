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
  useMediaQuery,
  Container,
  Modal,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
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
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down("sm"));
  const [,setIsSidebarVisible] = useState(true);
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
    if (isSmallScreen) {
      setIsSidebarVisible(false);
    } else {
      setIsSidebarVisible(true);
    }
  }, [isSmallScreen]);

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
      description: "Código",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
      maxWidth: 150,
      resizable: true,
      sortable: false,
      filterable: false,
    },
    {
      field: "name",
      headerName: "Nombre Completo",
      description: "Nombre Completo",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 200,
      maxWidth: 300,
      resizable: true,
      sortable: false,
      filterable: false,
    },
    {
      field: "email",
      headerName: "Correo",
      description: "Correo",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 200,
      maxWidth: 300,
      resizable: true,
      sortable: false,
      filterable: false,
    },
    {
      field: "phone",
      headerName: "Celular",
      description: "Celular",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      resizable: true,
      sortable: false,
      filterable: false,
    },
    {
      field: "actions",
      headerName: "Acciones",
      description: "Acciones",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      sortable: false,
      filterable: false,
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
  const handleCloseCreateStudent = () => setOpenCreateModal(false);

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
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        px: { xs: 0, sm: 2, md: 4, lg: 8, xl: 16 },
        py: { xs: 0, sm: 2, md: 3, lg: 4 },
        width: "100%",
        maxWidth: { xs: "100vw", sm: 1200, md: 1700, lg: 2100, xl: 2400 },
        minHeight: "100vh",
        backgroundColor: "background.default",
        marginLeft: "auto",
        marginRight: "auto",
        overflowX: "hidden",
      }}
    >
      <ContainerPage
        title={
          <span
            style={{
              fontSize: window.innerWidth >= 1920
                ? "2.8rem"
                : window.innerWidth >= 1536
                ? "2.2rem"
                : "1.8rem",
              fontWeight: 400,
              lineHeight: 1.2,
              display: "block"
            }}
          >
            Estudiantes
          </span>
        }
        subtitle={
          <span
            style={{
              fontSize: window.innerWidth >= 1920
                ? "2rem"
                : window.innerWidth >= 1536
                ? "1.5rem"
                : "1.1rem",
              fontWeight: 400,
              lineHeight: 1.2,
              display: "block"
            }}
          >
            Lista de estudiantes
          </span>
        }
      actions={
        HasPermission(addStudentPermission?.name || "") && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCreateStudent}
            startIcon={<AddIcon />}
            disabled={!addStudentPermission}
            sx={{
              width: { xs: "100%", sm: "auto" },
              mb: { xs: 1, sm: 0 },
              mt: { xs: 2, sm: 0 },
              fontSize: {
                  xs: "1.1rem",
                  sm: "1.2rem",
                  md: "1.3rem",
                  lg: window.innerWidth === 1920 ? "1.7rem" : "1.5rem"
                },
                padding: {
                  xs: "8px 12px",
                  sm: "10px 18px",
                  md: "14px 28px",
                  lg: window.innerWidth === 1920 ? "22px 44px" : "18px 36px"
                },
                marginLeft: 0,
            }}
          >
            Agregar Estudiante
          </Button>
        )
      }
      children={
          <Box
            sx={{
              width: "100%",
              height: { xs: "calc(100vh - 200px)", sm: "calc(100vh - 220px)", lg: "calc(100vh - 250px)" },
              minHeight: 350,
              maxWidth: { xs: "100vw", sm: 1200, md: 1700, lg: 2100, xl: 2400 },
              mx: "auto",
              px: { xs: 0, sm: 1, md: 2 },
              overflowX: "auto",
            }}
          >
          <DataGrid
            rows={students}
            columns={columns.map(col => ({
                ...col,
                minWidth: col.field === "name" ? 180 : 120, // aumentado
                maxWidth: col.field === "actions" ? 260 : col.maxWidth, // aumentado
                flex: 1,
                headerAlign: "center",
                align: "center",
              }))}
            localeText={dataGridLocaleText}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 8 },
              },
            }}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => {
              const updatedModel = {
                ...newModel,
                code: true,
              };
              const visibleColumns = Object.values(updatedModel).filter(Boolean).length;
              if (visibleColumns === 0) {
                return;
              }
              setColumnVisibilityModel(updatedModel);
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
              "& .MuiDataGrid-cell": {
                borderColor: "transparent",
                fontSize: {
                  xs: "1.2rem",
                  sm: "1.3rem",
                  md: "1.4rem",
                  lg: "1.7rem"
                }, // aumentado
                 py: { xs: 1, sm: 1.5, md: 2, lg: 1 },
               },
               "& .MuiDataGrid-columnHeaders": {
                  fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem", lg: "1.5rem" },
                  py: { xs: 1, sm: 1.5, md: 2, lg: 2.5 },
                },
                "& .MuiDataGrid-row": {
                  minHeight: { xs: 40, sm: 48, md: 56, lg: 64 },
                  maxHeight: { xs: 40, sm: 48, md: 56, lg: 64 },
                },
                "& .MuiIconButton-root": {
                  fontSize: {
                    xs: "1.2rem",
                    sm: "1.4rem",
                    md: "1.7rem",
                    lg: window.innerWidth === 1920 ? "2.3rem" : "2rem"
                  },
                  p: {
                    xs: 0.5,
                    sm: 1,
                    md: 1.5,
                    lg: window.innerWidth === 1920 ? 2.5 : 2
                  },
                },
                width: "100%",
                maxWidth: {
                  xs: "100vw",
                  sm: 1200,
                  md: 1700,
                  lg: window.innerWidth === 1920 ? 2000 : 2100,
                  xl: window.innerWidth === 1920 ? 2200 : 2400
                },
                minWidth: 320,
              }}
              pageSizeOptions={[8, 16, 32]}
            disableRowSelectionOnClick
              autoHeight={false}
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
          <Modal open={openCreateModal} onClose={handleCloseCreateStudent}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "98vw", sm: 700, md: 1200, lg: 1600, xl: 2000 },
                maxWidth: { xs: "98vw", sm: 900, md: 1500, lg: 2000, xl: 2200 },
                maxHeight: { xs: "95vh", sm: "85vh", md: "80vh" },
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 24,
                overflowY: "auto",
                p: { xs: 2, sm: 4, md: 5 }
              }}
            >
              <CreateStudentForm onSuccess={handleStudentCreated} />
            </Box>
          </Modal>
        </Box>
      }
    ></ContainerPage>
    </Container>
  );
};

export default StudentPage;
