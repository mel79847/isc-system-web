import { useState, useCallback, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { useFormik } from "formik";

import { Student } from "../../../models/studentInterface";
import { getStudents } from "../../../services/studentService";
import { getModes } from "../../../services/modesService";
import { Modes } from "../../../models/modeInterface";
import { createGraduationProcess } from "../../../services/processServicer";
import { useNavigate } from "react-router-dom";
import { useProcessStore } from "../../../store/store";

function ProcessForm() {
  const [, setError] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [modes, setModes] = useState<Modes[]>([]);
  const updateProcess = useProcessStore((state) => state.setProcess);
  const navigate = useNavigate();
  const actualDate = new Date();
  const numberPeriods = 3;

  const fetchData = useCallback(async () => {
    try {
      const responseStudents = await getStudents();
      const responseModes = await getModes();
      setModes(responseModes.data);
      setStudents(responseStudents.data);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
      setError("Failed to load data, please try again.");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const setPeriods = (option: number) => {
    let firstSemester = actualDate.getMonth() <= 5;
    let currentYear = actualDate.getFullYear()
    const listPeriods = [];
    for (let i = 0; i < option; i++) {
      let strPeriod = firstSemester ? "Primero" : "Segundo"
      listPeriods.push(strPeriod + currentYear)
      if (!firstSemester) currentYear++;
      firstSemester = !firstSemester
    }
    return listPeriods;
  }

  const formik = useFormik({
    initialValues: {
      studentId: "",
      studentCode: "",
      modeId: "",
      period: "",
      titleProject: "",
      stageId: 1,
    },
    onSubmit: async (values) => {
      const response = await createGraduationProcess(values);
      if (response.success) {
        updateProcess(response.data);
        navigate(`/studentProfile/${response.data.id}`);
      }
    },
  });

  const handleStudentChange = (
    _event: React.ChangeEvent<object | null>,
    value: Student | null,
  ) => {
    formik.setFieldValue("studentId", value ? value.id : "");
    formik.setFieldValue("studentCode", value ? value.code : "");
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h4">Crear Proceso de Graduación</Typography>
          <Typography variant="body2" sx={{ fontSize: 14, color: "gray" }}>
            Completa los siguientes campos para definir los criterios y
            requisitos del proceso de graduación.
          </Typography>
          <Divider flexItem sx={{ my: 2 }} />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography variant="body2">Informacion Estudiante</Typography>
            </Grid>
            <Grid item xs={9}>
              <Autocomplete
                fullWidth
                options={students}
                getOptionLabel={(student) => `${student.name}`}
                onChange={handleStudentChange}
                onBlur={formik.handleBlur}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Nombre Estudiante"
                    variant="outlined"
                    margin="normal"
                    error={
                      formik.touched.studentId &&
                      Boolean(formik.errors.studentId)
                    }
                    helperText={
                      formik.touched.studentId && formik.errors.studentId
                    }
                  />
                )}
              />
              <TextField
                fullWidth
                my-5
                name="studentCode"
                value={formik.values.studentCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.studentCode &&
                  Boolean(formik.errors.studentCode)
                }
                helperText={
                  formik.touched.studentCode && formik.errors.studentCode
                }
                label="Código Estudiante"
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>
          <Divider flexItem sx={{ my: 2 }} />
        </Grid>
        <Divider />
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography variant="body2">Informacion Modalidad</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                fullWidth
                select
                label="Seleccionar Modalidad"
                variant="outlined"
                margin="normal"
                name="modeId"
                value={formik.values.modeId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.modeId && Boolean(formik.errors.modeId)}
                helperText={formik.touched.modeId && formik.errors.modeId}
              >
                {modes.map((mode) => (
                  <MenuItem key={mode.id} value={mode.id}>
                    {mode.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                my-5
                label="Titulo de Proyecto"
                name="titleProject"
                value={formik.values.titleProject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.titleProject &&
                  Boolean(formik.errors.titleProject)
                }
                helperText={
                  formik.touched.titleProject && formik.errors.titleProject
                }
                inputProps={{ maxLength: 80 }}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                select
                label="Seleccionar Periodo"
                variant="outlined"
                margin="normal"
                name="period"
                value={formik.values.period}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.period && Boolean(formik.errors.period)}
                helperText={formik.touched.period && formik.errors.period}
              >
                {setPeriods(numberPeriods).map((value) => {
                  const desc = value.slice(0, value.length - 4) + "-" + value.slice(value.length-4)
                  return (
                    <MenuItem value={value}>{desc}</MenuItem>
                  );
                })}
              </TextField>
            </Grid>
          </Grid>
          <Divider flexItem sx={{ my: 2 }} />
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
  );
}

export default ProcessForm;
