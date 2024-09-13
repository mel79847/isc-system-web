import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { FormContainer } from "../../pages/CreateGraduation/components/FormContainer.tsx";
import LoadingOverlay from "../../components/common/Loading.tsx";
import ErrorDialog from "../../components/common/ErrorDialog.tsx";
import SuccessDialog from "../../components/common/SucessDialog.tsx";
import { Event } from "../../models/eventInterface.ts";
import { createEventService } from "../../services/eventsService.ts";

const validationSchema = Yup.object({
  title: Yup.string().required("El nombre del evento es obligatorio"),
  description: Yup.string().required("La descripción es obligatoria"),
  location: Yup.string().required("La ubicacion es obligatorio"),
  start_date: Yup.date().required("La fecha es obligatoria"),
  end_date: Yup.date().required("La fecha de finalización es obligatoria"),
  registration_deadline: Yup.date().required(
    "La fecha límite de inscripción obligatoria"
  ),
  duration_hours: Yup.number()
    .required("La duración es obligatoria")
    .min(1, "La duracion minima es de 1 hora"),
  assigned_hours: Yup.string().required("Las horas becarias son obligatorias"),
  max_interns: Yup.number()
    .required("El número de becarios es obligatorio")
    .min(1, "Debe haber al menos un becario"),
  min_interns: Yup.number()
    .required("La cantidad mínima de becarios es obligatoria")
    .min(1, "Debe haber al menos 1 becario"),

  responsible_intern_id: Yup.number().notRequired(),
});

const CreateForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successDialog, setSuccessDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const sucessDialogClose = () => {
    setSuccessDialog(false);
    formik.resetForm();
  };

  const errorDialogClose = () => {
    setErrorDialog(false);
  };

  const handleCancel = () => {
    formik.resetForm();
    navigate("/programDirector");
  };

  const handleBackNavigate = () => {
    navigate("/programDirector");
  };

  const formik = useFormik<Event>({
    initialValues: {
      title: "",
      description: "",
      assigned_hours: 0,
      start_date: "",
      end_date: "",
      duration_hours: 0,
      location: "",
      max_interns: 0,
      min_interns: 0,
      registration_deadline: "",
      start_cancellation_date: "",
      end_cancellation_date: "",
      responsible_intern_id: 0
    },
    validationSchema,
    onSubmit: async () => {
      setLoading(true);
      try {
        const formatWithTimezone = (date: string) =>
          dayjs(date).tz("America/Caracas").format();

        const valuesWithTimezone = {
          ...formik.values,
          start_date: formatWithTimezone(formik.values.start_date),
          end_date: formatWithTimezone(formik.values.end_date),
          start_cancellation_date: formatWithTimezone(
            formik.values.start_cancellation_date!
          ),
          end_cancellation_date: formatWithTimezone(
            formik.values.end_cancellation_date!
          ),
          registration_deadline: formatWithTimezone(
            formik.values.registration_deadline
          ),
        };
        const res = await createEventService(valuesWithTimezone);
        formik.resetForm();
        navigate("/programDirector");
        setMessage("Evento creado con éxito");
        setSuccessDialog(true);
      } catch (error) {
        setMessage("Error al crear el evento");
        setErrorDialog(true);
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <Grid container spacing={0} alignItems="center">
      <Grid container spacing={4} sx={{ padding: 2, position: "relative" }}>
        <IconButton
          onClick={handleBackNavigate}
          aria-label="back"
          sx={{ position: "absolute", left: 21, top: 60 }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Grid>
      <FormContainer>
        {loading && <LoadingOverlay message="Creando Evento..." />}
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{ padding: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h4">Crear Nuevo Evento</Typography>
              <Typography
                margin="normal"
                variant="body2"
                sx={{ fontSize: 14, color: "gray" }}
              >
                Ingrese los datos del evento a continuación.
              </Typography>
              <Divider flexItem sx={{ mt: 2, mb: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} sx={{ padding: 2 }}>
                <Grid item xs={3}>
                  <Typography variant="h6">Información del Evento</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Grid item xs={9}>
                    <TextField
                      id="title"
                      name="title"
                      label="Nombre del evento"
                      variant="outlined"
                      fullWidth
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.title && Boolean(formik.errors.title)
                      }
                      helperText={formik.touched.title && formik.errors.title}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="description"
                      name="description"
                      label="Descripción del evento"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="location"
                      name="location"
                      label="Ubicación"
                      variant="outlined"
                      fullWidth
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.location &&
                        Boolean(formik.errors.location)
                      }
                      helperText={
                        formik.touched.location && formik.errors.location
                      }
                      margin="normal"
                    />
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="start_date"
                        name="start_date"
                        label="Fecha de inicio"
                        type="date"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        value={formik.values.start_date}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.start_date &&
                          Boolean(formik.errors.start_date)
                        }
                        helperText={
                          formik!.touched.start_date &&
                          formik!.errors.start_date
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="end_date"
                        name="end_date"
                        label="Fecha de finalización"
                        type="date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formik.values.end_date}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.end_date &&
                          Boolean(formik.errors.end_date)
                        }
                        helperText={
                          formik.touched.end_date && formik.errors.end_date
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="start_cancellation_date"
                        name="start_cancellation_date"
                        label="Fecha inicio de bajas"
                        type="date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formik.values.start_cancellation_date}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.start_cancellation_date &&
                          Boolean(formik.errors.start_cancellation_date)
                        }
                        helperText={
                          formik.touched.start_cancellation_date &&
                          formik.errors.start_cancellation_date
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="end_cancellation_date"
                        name="end_cancellation_date"
                        label="Fecha fin de bajas"
                        type="date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formik.values.end_cancellation_date}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.end_cancellation_date &&
                          Boolean(formik.errors.end_cancellation_date)
                        }
                        helperText={
                          formik.touched.end_cancellation_date &&
                          formik.errors.end_cancellation_date
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="registration_deadline"
                        name="registration_deadline"
                        label="Fecha límite de inscripción"
                        type="date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formik.values.registration_deadline}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.registration_deadline &&
                          Boolean(formik.errors.registration_deadline)
                        }
                        helperText={
                          formik.touched.registration_deadline &&
                          formik.errors.registration_deadline
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="duration_hours"
                        name="duration_hours"
                        label="Duración (horas)"
                        variant="outlined"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={formik.values.duration_hours}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.duration_hours &&
                          Boolean(formik.errors.duration_hours)
                        }
                        helperText={
                          formik.touched.duration_hours &&
                          formik.errors.duration_hours
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider flexItem sx={{ mt: 2, mb: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} sx={{ padding: 2 }}>
                <Grid item xs={3}>
                  <Typography variant="h6">Becarios</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <TextField
                        id="assigned_hours"
                        name="assigned_hours"
                        label="Horas Becarias"
                        type="number"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        value={formik.values.assigned_hours}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.assigned_hours &&
                          Boolean(formik.errors.assigned_hours)
                        }
                        helperText={
                          formik.touched.assigned_hours &&
                          formik.errors.assigned_hours
                        }
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        id="min_interns"
                        name="min_interns"
                        label="N° Mínimo de Becarios"
                        type="number"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        value={formik.values.min_interns}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.min_interns &&
                          Boolean(formik.errors.min_interns)
                        }
                        helperText={
                          formik.touched.min_interns &&
                          formik.errors.min_interns
                        }
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        id="max_interns"
                        name="max_interns"
                        label="N° Máximo de Becarios"
                        type="number"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        value={formik.values.max_interns}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.max_interns &&
                          Boolean(formik.errors.max_interns)
                        }
                        helperText={
                          formik.touched.max_interns &&
                          formik.errors.max_interns
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} >
            <Grid container spacing={2} sx={{padding: 2}}>
              <Grid item xs={3}>
                <Typography variant="h6" >Encargado</Typography>
              </Grid>
              <Grid item xs={9}>
              <TextField
                id="responsible_intern_id"
                name="responsible_intern_id"
                label="Encargado"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                value={formik.values.responsible_intern_id}
                onChange={formik.handleChange}
                error={formik.touched.responsible_intern_id && Boolean(formik.errors.responsible_intern_id)}
                helperText={formik.touched.responsible_intern_id && formik.errors.responsible_intern_id}
              />
              </Grid>

            </Grid>
          </Grid>    
          
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent="flex-end"
            style={{ marginTop: "20px" }}
          >
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Crear
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </form>
        <SuccessDialog
          open={successDialog}
          onClose={sucessDialogClose}
          title={"Evento Creado!"}
          subtitle={"El evento ha sido creado con éxito."}
        />
        <ErrorDialog
          open={errorDialog}
          onClose={errorDialogClose}
          title={"¡Vaya!"}
          subtitle={message}
        />
      </FormContainer>
    </Grid>
  );
};

export default CreateForm;
