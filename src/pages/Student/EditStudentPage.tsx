import { useFormik } from "formik";
import * as Yup from "yup";
import { FormContainer } from "../CreateGraduation/components/FormContainer";
import { Button, Divider, Grid, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserById, updateStudent } from "../../services/studentService";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";


const PHONE_ERROR_MESSAGE = "Ingrese un número de teléfono válido.";
const validationSchema = Yup.object({
  name: Yup.string().required("El nombre completo es obligatorio"),
  lastname: Yup.string().required("El apellido es obligatorio"),
  mothername: Yup.string().required("El apellido materno es obligatorio"),
  email: Yup.string()
    .email("Ingrese un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  phone: Yup.string()
    .matches(/^[0-9]{8}$/, PHONE_ERROR_MESSAGE)
    .optional(),
  code: Yup.number().optional(),
});

const EditStudentPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  // @ts-ignore
  const [student, setStudent] = useState<any>();
  const { id } = useParams();

  const fetchStudent = async () => {
    try {
      const response = await getUserById(Number(id));

      const roleMapping: { [key: number]: string } = {
        1: "admin",
        2: "teacher",
        3: "student",
      };

      response.role = response.rolesAndPermissions
        ? Object.values(response.rolesAndPermissions)
            .map((rp) => (rp as { role_name: string }).role_name)
            .join(", ")
        : roleMapping[response.role_id] || "No role found";

      if (response.role.includes("student")) {
        formik.setValues(response);
      } else {
        setMessage("No tienes permiso para editar este usuario.");
        setSeverity("error");
        setOpen(true);
        setTimeout(() => navigate("/students"), 3000);
      }
    } catch (error) {
      setMessage("Error al cargar los datos del estudiante.");
      setSeverity("error");
      setOpen(true);
      setTimeout(() => navigate("/students"), 3000);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      code: "",
      mothername: "",
      role: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { role, ...dataToSend } = values;
        // @ts-ignore
        await updateStudent(dataToSend);
        setMessage("Estudiante actualizado con éxito");
        setSeverity("success");
        setOpen(true);
      } catch (error) {
        setMessage("Error al crear el estudiante");
        setSeverity("error");
        setOpen(true);
      }
    },
  });

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^[0-9]*$/.test(value)) {
      formik.setFieldValue("phone", value);
    }
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^[0-9]*$/.test(value)) {
      formik.setFieldValue("code", value);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <IconButton
        onClick={() => window.history.back()}
        aria-label="back"
        style={{
          position: "absolute",
          top: "-5px",
          left: "-20px",
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <FormContainer>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{ padding: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h4">Crear Nuevo Estudiante</Typography>
              <Typography variant="body2" sx={{ fontSize: 14, color: "gray" }}>
                Ingrese los datos del estudiante a continuación.
              </Typography>
              <Divider flexItem sx={{ mt: 2, mb: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2} sx={{ padding: 2 }}>
                <Grid item xs={3}>
                  <Typography variant="h6">Información del Estudiante</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="name"
                        name="name"
                        label="Nombres"
                        variant="outlined"
                        fullWidth
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="lastname"
                        name="lastname"
                        label="Apellido Paterno"
                        variant="outlined"
                        fullWidth
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                        helperText={formik.touched.lastname && formik.errors.lastname}
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="mothername"
                        name="mothername"
                        label="Apellido Materno"
                        variant="outlined"
                        fullWidth
                        value={formik.values.mothername}
                        onChange={formik.handleChange}
                        error={formik.touched.mothername && Boolean(formik.errors.mothername)}
                        helperText={formik.touched.mothername && formik.errors.mothername}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="code"
                        name="code"
                        label="Codigo de Estudiante"
                        variant="outlined"
                        fullWidth
                        value={formik.values.code}
                        onChange={handleCodeChange}
                        error={formik.touched.code && Boolean(formik.errors.code)}
                        helperText={formik.touched.code && formik.errors.code}
                        margin="normal"
                        inputProps={{ maxLength: 10 }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider flexItem sx={{ my: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2} sx={{ padding: 2 }}>
                <Grid item xs={3}>
                  <Typography variant="h6">Información Adicional</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    id="email"
                    name="email"
                    label="Correo Electrónico"
                    variant="outlined"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    margin="normal"
                    inputProps={{ maxLength: 50 }}
                  />
                  <TextField
                    id="phone"
                    name="phone"
                    label="Número de Teléfono"
                    variant="outlined"
                    fullWidth
                    value={formik.values.phone}
                    onChange={handlePhoneChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    margin="normal"
                    inputProps={{ maxLength: 8 }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    GUARDAR
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </FormContainer>
    </div>
  );
};

export default EditStudentPage;
