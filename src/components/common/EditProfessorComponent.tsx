import { useFormik } from "formik";
import * as Yup from "yup";
import { FormContainer } from "../../pages/CreateGraduation/components/FormContainer";
import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  Snackbar,
  Alert,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getUserById } from "../../services/studentService";
import LoadingOverlay from "../../components/common/Loading";
import { updateProfessor } from "../../services/mentorsService";
import {
  CODE_ERROR_MESSAGE,
  CODE_DIGITS,
  CODE_MIN_DIGITS,
  CODE_REGEX,
} from "../../constants/validation";

const validationSchema = Yup.object({
  name: Yup.string().required("El nombre completo es obligatorio"),
  lastname: Yup.string().required("El apellido es obligatorio"),
  mothername: Yup.string().required("El apellido materno es obligatorio"),
  email: Yup.string()
    .email("Ingrese un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  phone: Yup.string()
    .matches(/^[0-9]{8}$/, "Ingrese un número de teléfono válido")
    .optional(),
  code: Yup.string()
    .test('code-validation', CODE_ERROR_MESSAGE, function(value) {
      console.log('=== VALIDACIÓN SCHEMA YUP ===');
      console.log('Schema validación - valor recibido:', value);
      console.log('Tipo de valor:', typeof value);
      
      if (!value || value.trim() === '') {
        console.log('✅ Valor vacío, permitiendo...');
        return true; // Allow empty values
      }
      
      const isValidRegex = CODE_REGEX.test(value);
      const isValidLength = value.length >= CODE_MIN_DIGITS && value.length <= CODE_DIGITS;
      
      console.log('Validaciones:');
      console.log('- CODE_REGEX.test(value):', isValidRegex);
      console.log('- Longitud valor:', value.length);
      console.log('- CODE_MIN_DIGITS:', CODE_MIN_DIGITS);
      console.log('- CODE_DIGITS:', CODE_DIGITS);
      console.log('- Longitud válida:', isValidLength);
      console.log('- Resultado final:', isValidRegex && isValidLength);
      console.log('============================');
      
      return isValidRegex && isValidLength;
    }),
});

const EditProfessorComponent: React.FC<{ id: number; onClose: () => void }> = ({ id, onClose }) => {
  console.log(' COMPONENTE EditProfessorComponent CARGADO - ID:', id);
  
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [loading] = useState(false);
  const [, setProfessor] = useState<any>();
  const fetchProfessor = async () => {
    try {
      const response = await getUserById(Number(id));
      formik.setValues({
        ...formik.initialValues,
        ...response,
        roles: response.roles || [3],
        role_id: response.role_id || 3,
        isStudent: false,
        is_scholarship: false,
        degree: response.degree || "",
      });
      setProfessor(response);
    } catch (error) {
      console.error("Error al obtener docente:", error);
    }
  };
  useEffect(() => {
    fetchProfessor();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      code: "",
      mothername: "",
      degree: "",
      roles: [3],
      role_id: 3,
      isStudent: false,
      is_scholarship: false,
    },
    validationSchema,
    onSubmit: async (values) => {
     
      const errors = await formik.validateForm();
      console.log('Errores de validación:', errors);
      
  
      console.log('Validando código:', values.code);
      if (values.code && values.code.trim() !== '') {
        if (!CODE_REGEX.test(values.code)) {
          console.log('Código inválido:', values.code, 'Regex:', CODE_REGEX);
          formik.setFieldError('code', CODE_ERROR_MESSAGE);
          formik.setFieldTouched('code', true);
          setMessage("El código debe tener entre 5 y 8 dígitos");
          setSeverity("error");
          setOpen(true);
          return;
        }
        if (values.code.length < CODE_MIN_DIGITS || values.code.length > CODE_DIGITS) {
          console.log('Longitud inválida:', values.code.length);
          formik.setFieldError('code', CODE_ERROR_MESSAGE);
          formik.setFieldTouched('code', true);
          setMessage("El código debe tener entre 5 y 8 dígitos");
          setSeverity("error");
          setOpen(true);
          return;
        }
      }

      if (Object.keys(errors).length > 0) {
        console.log('Formulario tiene errores, no enviando:', errors);
        setMessage("Por favor corrija los errores antes de continuar");
        setSeverity("error");
        setOpen(true);
        return;
      }
      
      try {
        await updateProfessor(values);
        setMessage("Docente actualizado con éxito");
        setSeverity("success");
        setTimeout(() => {
          onClose();
        }, 4000);
      } catch (error) {
        setMessage("Error al actualizar");
        setSeverity("error");
      } finally {
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
    console.log('=== HANDLE CODE CHANGE ===');
    console.log('Valor ingresado:', value);
    console.log('Test numérico /^[0-9]*$/:', /^[0-9]*$/.test(value));
    
    if (/^[0-9]*$/.test(value)) {
      console.log('Valor es numérico, actualizando formik...');
      formik.setFieldValue("code", value);
      formik.setFieldTouched("code", true); 
      
      console.log('Validando inmediatamente...');
      console.log('Valor trim:', value.trim());
      console.log('Valor trim !== "":', value.trim() !== '');
      
     
      if (value.trim() !== '' && !CODE_REGEX.test(value)) {
        console.log('❌ CÓDIGO INVÁLIDO - Estableciendo error');
        console.log('CODE_REGEX.test(value):', CODE_REGEX.test(value));
        formik.setFieldError("code", CODE_ERROR_MESSAGE);
      } else if (value.trim() === '' || CODE_REGEX.test(value)) {
        console.log('✅ CÓDIGO VÁLIDO - Limpiando error');
        formik.setFieldError("code", undefined);
      }
      
      console.log('Estado formik después del cambio:');
      console.log('- formik.values.code:', formik.values.code);
      console.log('- formik.errors.code:', formik.errors.code);
      console.log('- formik.touched.code:', formik.touched.code);
    } else {
      console.log('❌ Valor no es numérico, ignorando cambio');
    }
    console.log('========================');
  };

  return (
    <FormContainer>
      {loading && <LoadingOverlay message="Actializando Docente..." />}
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h4">Editar Docente</Typography>
            <Typography variant="body2" sx={{ fontSize: 14, color: "gray" }}>
              Ingrese los datos del docente a continuación.
            </Typography>
            <Divider flexItem sx={{ mt: 2, mb: 2 }} />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} sx={{ padding: 2 }}>
              <Grid item xs={3}>
                <Typography variant="h6">Información del Docente</Typography>
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
                      label="Codigo de Docente"
                      variant="outlined"
                      fullWidth
                      value={formik.values.code}
                      onChange={handleCodeChange}
                      error={formik.touched.code && Boolean(formik.errors.code)}
                      helperText={formik.touched.code && formik.errors.code}
                      margin="normal"
                      inputProps={{ 
                        maxLength: CODE_DIGITS,
                        minLength: CODE_MIN_DIGITS
                      }}
                    />
                  </Grid>
                </Grid>
                <TextField
                  id="degree"
                  name="degree"
                  label="Título Académico"
                  variant="outlined"
                  fullWidth
                  select
                  value={formik.values.degree}
                  onChange={formik.handleChange}
                  error={formik.touched.degree && Boolean(formik.errors.degree)}
                  helperText={formik.touched.degree && formik.errors.degree}
                  margin="normal"
                >
                  <MenuItem value="">Seleccione un título</MenuItem>
                  <MenuItem value="Ing.">Ing.</MenuItem>
                  <MenuItem value="Msc">Msc.</MenuItem>
                  <MenuItem value="PhD">PhD.</MenuItem>
                </TextField>
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
                  inputProps={{ maxLength: 20 }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <Button 
                  variant="contained" 
                  color="primary" 
                  type="submit"
                  disabled={!formik.isValid || Object.keys(formik.errors).length > 0}
                >
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
  );
};

export default EditProfessorComponent;
