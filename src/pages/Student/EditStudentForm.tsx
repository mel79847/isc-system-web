import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import { updateStudent,  } from "../../services/studentService";
import { getUserById,  } from "../../services/studentService";
import axios from "axios";
import SuccessDialog from "../../components/common/SucessDialog";
import ErrorDialog from "../../components/common/ErrorDialog";
import { getInternByUserIdService, getInternService, updateIntern } from "../../services/internService";
import { formatMeridiem } from "@mui/x-date-pickers/internals";

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
  code: Yup.string().optional(),
});

interface EditStudentFormProps {
  id: number;
  onSuccess: () => void;
  onClose: () => void;
}

const EditStudentForm = ({ id, onSuccess, onClose }: EditStudentFormProps) => {
  const [successDialog, setSuccessDialog] = React.useState(false);
  const [errorDialog, setErrorDialog] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [isIntern, setIsIntern] = React.useState(false);

  useEffect(()=>{
    console.log(formik.values)

  })

  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
      lastname: "",
      mothername: "",
      email: "",
      phone: "",
      code: "",
      role_id: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { role_id, ...dataToSend } = values;
        
        if (role_id === 4) { 

        const internData = {
        ...dataToSend,
        code: dataToSend.code ? Number(dataToSend.code) : undefined
        };
          await updateIntern(values.id, internData);
        setMessage("Interno actualizado con éxito");
        } else { // Estudiante
        await updateStudent({
            ...dataToSend,
            id: values.id
        });
        setMessage("Estudiante actualizado con éxito");
        }
        
        setSuccessDialog(true);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 2000);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const backendMessage = error?.response?.data?.error;
          setMessage(backendMessage || "Error al actualizar");
        } else {
          setMessage("Error inesperado. Por favor, inténtelo de nuevo.");
        }
        setErrorDialog(true);
      }
    },
  });

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        try {
          const studentResponse = await getUserById(id);
          if (studentResponse) {
            formik.setValues({
            ...studentResponse,
            role_id: 3 
            });
            setIsIntern(false);
            return;
          }
        } catch (e) {
          console.log("No es estudiante, probando como interno...");
        }
        try {
        let internResponse = await getInternService(id);
        console.log(internResponse)
          if (internResponse.error) {
          internResponse = await getInternByUserIdService(id);
        }

        if (internResponse && !internResponse.error) {
          formik.setValues({
            ...internResponse,
            role_id: 4 
          });
          setIsIntern(true);
          return;
        }
        } catch (e) {
          console.log("No es interno");
        }

        setMessage("Usuario no encontrado");
        setErrorDialog(true);
      } catch (error) {
        setMessage("Error al cargar los datos");
        setErrorDialog(true);
      }
    };

    fetchUser();
  }, [id]);

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
    <Container>
      <form onSubmit={formik.handleSubmit} style={{ marginLeft: -20 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h4">Editar {isIntern ? "Becario" : "Estudiante"}</Typography>
            <Typography variant="body2" sx={{ fontSize: 14, color: "gray" }}>
              Modifique los datos del {isIntern ? "becario" : "estudiante"} a continuación.
            </Typography>
            <Divider flexItem sx={{ mt: 2, mb: 2 }} />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="body2">Información del {isIntern ? "Becario" : "Estudiante"}</Typography>
              </Grid>
              <Grid item xs={9}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name="name"
                      label="Nombres"
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
                      name="lastname"
                      label="Apellido Paterno"
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
                      name="mothername"
                      label="Apellido Materno"
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
                      name="code"
                      label="Código"
                      fullWidth
                      value={formik.values.code}
                      onChange={handleCodeChange}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider flexItem sx={{ mt: 2, mb: 2 }} />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="body2">Información Adicional</Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  name="email"
                  label="Correo Electrónico"
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  margin="normal"
                />
                <TextField
                  name="phone"
                  label="Número de Teléfono"
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
                <Button variant="contained" onClick={onClose} sx={{ mr: 2 }}>
                  CANCELAR
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  GUARDAR
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>

      <SuccessDialog
        open={successDialog}
        onClose={() => setSuccessDialog(false)}
        title={`¡${isIntern ? 'Becario' : 'Estudiante'} Actualizado!`}
        subtitle={`El ${isIntern ? 'becario' : 'estudiante'} ha sido actualizado con éxito.`}
      />
      <ErrorDialog
        open={errorDialog}
        onClose={() => setErrorDialog(false)}
        title="¡Error!"
        subtitle={message}
      />
    </Container>
  );
};

export default EditStudentForm;