import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Divider, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { ProfessorInterface } from "../../services/models/Professor";
import { createProfessor } from "../../services/mentorsService";
import { FormContainer } from "../CreateGraduation/components/FormContainer";
import ErrorDialog from "../../components/common/ErrorDialog";
import SuccessDialog from "../../components/common/SucessDialog";
import LoadingOverlay from "../../components/common/Loading";

const onlyLettersRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(onlyLettersRegex, "El nombre solo debe contener letras")
    .required("El nombre completo es obligatorio"),
  lastname: Yup.string()
    .matches(onlyLettersRegex, "El apellido paterno solo debe contener letras")
    .required("El apellido es obligatorio"),
  mothername: Yup.string()
    .matches(onlyLettersRegex, "El apellido materno solo debe contener letras")
    .required("El apellido materno es obligatorio"),
  email: Yup.string()
    .email("Ingrese un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  countryCode: Yup.string().required("Seleccione un código de país"),
  phoneNumber: Yup.string()
    .matches(/^\d{7,15}$/, "Número inválido, solo dígitos entre 7 y 15")
    .required("El número de teléfono es obligatorio"),
  degree: Yup.string().required("El título académico es obligatorio"),
  code: Yup.number()
    .typeError("El código debe ser numérico")
    .required("El código de docente es obligatorio"),
});

const CreateProfessorPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successDialog, setSuccessDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);

  const sucessDialogClose = () => {
    setSuccessDialog(false);
    formik.resetForm();
  };

  const errorDialogClose = () => {
    setErrorDialog(false);
  };

  const formik = useFormik<ProfessorInterface>({
    initialValues: {
      name: "",
      lastname: "",
      mothername: "",
      email: "",
      phone: "",
      degree: "",
      code: "",
      countryCode: "+591",
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const payload = {
          ...values,
          phone: `${values.countryCode} ${values.phoneNumber}`, // Formatea el teléfono
        };
        await createProfessor(payload);
        setMessage("Profesor creado con éxito");
        setSuccessDialog(true);
      } catch (error) {
        setMessage("Error al crear el docente");
        setErrorDialog(true);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^[0-9]*$/.test(value)) {
      formik.setFieldValue("code", value);
    }
  };

  return (
    <FormContainer>
      {loading && <LoadingOverlay message="Creando Docente..." />}
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h4">Crear Nuevo Docente</Typography>
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
                      inputProps={{ maxLength: 10 }}
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
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      select
                      id="countryCode"
                      name="countryCode"
                      label="Código País"
                      variant="outlined"
                      fullWidth
                      value={formik.values.countryCode}
                      onChange={formik.handleChange}
                      error={formik.touched.countryCode && Boolean(formik.errors.countryCode)}
                      helperText={formik.touched.countryCode && formik.errors.countryCode}
                      margin="normal"
                    >
                      {[
                        { code: "+591", name: "Bolivia", flag: "🇧🇴" },
                        { code: "+54", name: "Argentina", flag: "🇦🇷" },
                        { code: "+55", name: "Brasil", flag: "🇧🇷" },
                        { code: "+506", name: "Costa Rica", flag: "🇨🇷" },
                        { code: "+53", name: "Cuba", flag: "🇨🇺" },
                        { code: "+503", name: "El Salvador", flag: "🇸🇻" },
                        { code: "+593", name: "Ecuador", flag: "🇪🇨" },
                        { code: "+1", name: "EE.UU.", flag: "🇺🇸" },
                        { code: "+34", name: "España", flag: "🇪🇸" },
                        { code: "+502", name: "Guatemala", flag: "🇬🇹" },
                        { code: "+504", name: "Honduras", flag: "🇭🇳" },
                        { code: "+52", name: "México", flag: "🇲🇽" },
                        { code: "+505", name: "Nicaragua", flag: "🇳🇮" },
                        { code: "+507", name: "Panamá", flag: "🇵🇦" },
                        { code: "+51", name: "Perú", flag: "🇵🇪" },
                        { code: "+56", name: "Chile", flag: "🇨🇱" },
                        { code: "+57", name: "Colombia", flag: "🇨🇴" },
                        { code: "+58", name: "Venezuela", flag: "🇻🇪" },
                      ].map((c) => (
                        <MenuItem key={c.code} value={c.code}>
                          {c.flag} {c.code} ({c.name})
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      id="phoneNumber"
                      name="phoneNumber"
                      label="Número de Teléfono"
                      variant="outlined"
                      fullWidth
                      value={formik.values.phoneNumber}
                      onChange={(e) => {
                        const cleaned = e.target.value.replace(/\D/g, "");
                        formik.setFieldValue("phoneNumber", cleaned);
                      }}
                      error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                      helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                      margin="normal"
                      inputProps={{ maxLength: 15 }}
                    />
                  </Grid>
                </Grid>
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
      <SuccessDialog
        open={successDialog}
        onClose={sucessDialogClose}
        title={"Docente Creado!"}
        subtitle={"El docente ha sido creado con éxito."}
      />
      <ErrorDialog
        open={errorDialog}
        onClose={errorDialogClose}
        title={"¡Vaya!"}
        subtitle={message}
      />
    </FormContainer>
  );
};

export default CreateProfessorPage;
