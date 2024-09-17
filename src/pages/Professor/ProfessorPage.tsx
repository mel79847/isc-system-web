import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import ContainerPage from "../../components/common/ContainerPage";
import { useEffect, useState } from "react";
import { getMentors } from "../../services/mentorsService";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Permission } from "../../models/permissionInterface";
import { getPermissionById } from "../../services/permissionsService";
import { useHasPermission } from "../../helper/permissions";

const ProfessorPage = () => {
  const navigate = useNavigate();
  const [professors, setProfessors] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [addProfessorPermission, setAddProfessorPermission] = useState<Permission>();
  const [viewProfessorReportPermission, setViewProfessorReportPermission] = useState<Permission>();
  const [deleteProfessorPermission, setDeleteProfessorPermission] = useState<Permission>();
  const [editProfessorPermission, setEditProfessorPermission] = useState<Permission>();
  const hasPermission = useHasPermission();

  useEffect(() => {
    const fetchPermissions = async () => {
      const addProfessorResponse = await getPermissionById(7);
      setAddProfessorPermission(addProfessorResponse.data);
      const viewProfessorReportResponse = await getPermissionById(8);
      setViewProfessorReportPermission(viewProfessorReportResponse.data);
      const deleteProfessorResponse = await getPermissionById(10);
      setDeleteProfessorPermission(deleteProfessorResponse.data);
      const editProfessorResponse = await getPermissionById(11);
      setEditProfessorPermission(editProfessorResponse.data);
    };
  
    fetchPermissions();
    fetchProfessors();
  }, []);
  
  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Código",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "degree",
      headerName: "Título",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Nombre",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Apellido",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Celular",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "tutoring_count",
      headerName: "Tutorias",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "review_count",
      headerName: "Revisiones",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Acciones",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => (
        <div>
          {hasPermission(viewProfessorReportPermission?.name || "") &&
          (<IconButton
            color="primary"
            aria-label="ver"
            onClick={() => handleView(params.row.id)}
          >
            <VisibilityIcon />
          </IconButton>)
          }
          {hasPermission(editProfessorPermission?.name || "") && (
          <IconButton
            color="primary"
            aria-label="editar"
            onClick={() => handleEdit(params.row.id)}
          >
            <EditIcon />
          </IconButton>
           )}
          {hasPermission(deleteProfessorPermission?.name || "") && (
          <IconButton
            color="secondary"
            aria-label="eliminar"
            onClick={() => handleClickOpen(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>)}
        </div>
      ),
    },
  ];

  const handleCreateTeacher = () => {
    navigate("/create-professor");
  };

  const fetchProfessors = async () => {
    const professors = await getMentors();
    setProfessors(professors.data);
    console.log(professors);
  };

  useEffect(() => {
    fetchProfessors();
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
        console.log(`Eliminar docente con id: ${selectedId}`);
      } catch (error) {
        console.log(error);
      } finally {
        handleClose();
      }
    }
  };

  return (
    <ContainerPage
      title={"Docentes"}
      subtitle={"Lista de docentes"}
      actions={
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCreateTeacher}
          startIcon={<AddIcon />}
          style={{ display: hasPermission(addProfessorPermission?.name || "") ? "inline-flex" : "none" }}
        >
          Agregar docente
        </Button>
      }
      children={
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={professors}
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
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirmar eliminación"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ¿Estás seguro de que deseas eliminar este docente? Esta acción
                no se puede deshacer.
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
        </div>
      }
    ></ContainerPage>
  );
};

export default ProfessorPage;
