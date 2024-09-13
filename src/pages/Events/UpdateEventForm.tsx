import React, { useState, useEffect } from "react";
import { Typography, Grid, Button, TextField, Divider, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { events } from "../../data/events";
import { EventDetails } from "../../models/eventInterface";
import { FormContainer } from "../CreateGraduation/components/FormContainer";
import ErrorDialog from "../../components/common/ErrorDialog";
import SuccessDialog from "../../components/common/SucessDialog";
import LoadingOverlay from "../../components/common/Loading";

const validationSchema = Yup.object({
    title: Yup.string().required("El nombre del evento es obligatorio"),
    description: Yup.string().required("La descripción es obligatoria"),
    location: Yup.string().required("La ubicacion es obligatorio"),
    date: Yup.date().required("La fecha es obligatoria"),
    endDate: Yup.date().required("La fecha de finalización es obligatoria"),
    duration: Yup.number()
      .required("La duración es obligatoria")
      .min(1, "La duracion minima es de 1 hora"),
    scholarshipHours: Yup.string().required("Las horas becarias son obligatorias"),
    maxParticipants: Yup.number()
      .required("El número de becarios es obligatorio")
      .min(1, "Debe haber al menos un becario"),
    minParticipants: Yup.number()
      .required("La cantidad mínima de becarios es obligatoria")
      .min(1, "Debe haber al menos 1 becario"),
    
    responsiblePerson: Yup.string().required("El nombre del responsable es obligatorio"),
  });

const UpdateEventForm: React.FC = () => {
  
    
    const { id_event } = useParams<{ id_event: string }>();
    const [eventData, setEventData] = useState<any>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [successDialog, setSuccessDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);

    const handleCancel = () => {
        formik.resetForm();
        navigate("/programDirector"); 
    };
    
    const handleBackNavigate = () => {
      navigate("/programDirector")
    };

    const sucessDialogClose = () => {
        setSuccessDialog(false);
        formik.resetForm();
    };

    const errorDialogClose = () => {
        setErrorDialog(false);
    };
    useEffect(() => {
      const event = events.find(e => e.id_event === parseInt(id_event!, 10));
      if (event) {
          setEventData({
              ...event,
              startDate: dayjs(event.startDate),
              endDate: dayjs(event.startDate),
          });
      }
  }, [id_event]);
  

    const formik = useFormik<EventDetails>({
        initialValues: {
        title: eventData?.name || "",
        date: eventData?.startDate ? dayjs(eventData.startDate) : dayjs(),
        endDate: eventData?.endDate ? dayjs(eventData.endDate) : dayjs(),
        duration: eventData?.duration || 0,
        scholarshipHours: eventData?.validatedHours || "",
        location:  eventData?.place || "",
        description: eventData?.description || "",
        maxParticipants: eventData?.maxInterns || 0,
        minParticipants: eventData?.minInterns || 0,
        responsiblePerson: eventData?.responsiblePerson || 0,
        status: "PENDIENTE",
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                // TODO: Actualizar evento
                formik.resetForm();
                setMessage("Evento actualizado con éxito");
                setSuccessDialog(true);
                navigate("/programDirector");
            } catch (error) {
                setMessage("Error al actualizar el evento");
                setErrorDialog(true);
            } finally {
                setLoading(false);
            }
        },
    });



  return (
    <Grid container spacing={0} alignItems="center">
      <Grid container spacing={4} sx={{ padding: 2, position: 'relative' }}>
        <IconButton onClick={handleBackNavigate} aria-label="back" sx={{ position: "absolute", left: 21, top: 60 }}>
          <ArrowBackIcon />
        </IconButton>
    </Grid>
    <FormContainer>
      {loading && <LoadingOverlay message="Actualizar Evento..." />}
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h4">Actualizar Evento</Typography>
            <Typography 
            margin="normal"
            variant="body2" sx={{ fontSize: 14, color: "gray" }}>
              Ingrese los datos del evento a continuación.
            </Typography>
            <Divider flexItem sx={{ mt: 2, mb: 2 }} />
          </Grid>


          <Grid item xs={12} >
            <Grid container spacing={2} sx={{padding: 2}}>
              <Grid item xs={3}>
                <Typography variant="h6" >Información del Evento</Typography>
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
                      error={formik.touched.title && Boolean(formik.errors.title)}
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
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
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
                    error={formik.touched.location && Boolean(formik.errors.location)}
                    helperText={formik.touched.location && formik.errors.location}
                    margin="normal"
                  />
                </Grid>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      id="date"
                      name="date"
                      label="Fecha de inicio"
                      type="date"
                      margin = "normal"
                      variant="outlined"
                      fullWidth
                      value={formik.values.date.format("YYYY-MM-DD")}
                      onChange={formik.handleChange}
                      error={formik.touched.date && Boolean(formik.errors.date)}
                      helperText={formik.touched.date && formik.errors.date}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="endDate"
                      name="endDate"
                      label="Fecha de finalización"
                      type="date"
                      variant="outlined"
                      fullWidth
                      margin = "normal"
                      value={formik.values.endDate.format("YYYY-MM-DD")}
                      onChange={formik.handleChange}
                      error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                      helperText={formik.touched.endDate && formik.errors.endDate}
                    />
                  </Grid>

                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="duration"
                    name="duration"
                    label="Duración (horas)"
                    variant="outlined"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={formik.values.duration}
                    onChange={formik.handleChange}
                    error={formik.touched.duration && Boolean(formik.errors.duration)}
                    helperText={formik.touched.duration && formik.errors.duration}
                  />
                </Grid>
              </Grid>

            </Grid>
            <Divider flexItem sx={{ mt: 2, mb: 2 }} />
          </Grid>
        
          <Grid item xs={12} >
            <Grid container spacing={2} sx={{padding: 2}}>
              <Grid item xs={3}>
                <Typography variant="h6" >Becarios</Typography>
              </Grid>
              <Grid item xs={9}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                      id="scholarshipHours"
                      name="scholarshipHours"
                      label="Horas Becarias"
                      type="number"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      value={formik.values.scholarshipHours}
                      onChange={formik.handleChange}
                      error={formik.touched.scholarshipHours && Boolean(formik.errors.scholarshipHours)}
                      helperText={formik.touched.scholarshipHours && formik.errors.scholarshipHours}
                    />
                  </Grid>
                  
                  <Grid item xs={3}>
                    <TextField
                      id="minParticipants"
                      name="minParticipants"
                      label="N° Mínimo de Becarios"
                      type="number"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      value={formik.values.minParticipants}
                      onChange={formik.handleChange}
                      error={formik.touched.minParticipants && Boolean(formik.errors.minParticipants)}
                      helperText={formik.touched.minParticipants && formik.errors.minParticipants}
                    />  
                  </Grid>

                  <Grid item xs={3}>
                    <TextField
                      id="maxParticipants"
                      name="maxParticipants"
                      label="N° Máximo de Becarios"
                      type="number"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      value={formik.values.maxParticipants}
                      onChange={formik.handleChange}
                      error={formik.touched.maxParticipants && Boolean(formik.errors.maxParticipants)}
                      helperText={formik.touched.maxParticipants && formik.errors.maxParticipants}
                    />  
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider flexItem sx={{ mt: 2, mb: 2 }} />
          </Grid>
          
          <Grid item xs={12} >
            <Grid container spacing={2} sx={{padding: 2}}>
              <Grid item xs={3}>
                <Typography variant="h6" >Encargado</Typography>
              </Grid>
              <Grid item xs={9}>
              <TextField
                id="responsiblePerson"
                name="responsiblePerson"
                label="Encargado"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formik.values.responsiblePerson}
                onChange={formik.handleChange}
                error={formik.touched.responsiblePerson && Boolean(formik.errors.responsiblePerson)}
                helperText={formik.touched.responsiblePerson && formik.errors.responsiblePerson}
              />
              </Grid>

            </Grid>
          </Grid>    
        </Grid>



        
        <Grid container spacing={2} justifyContent="flex-end" style={{ marginTop: "20px" }}>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Actualizar
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
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

export default UpdateEventForm;
