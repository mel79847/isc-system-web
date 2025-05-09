import { useFormik } from "formik";
import { FC, useState, useEffect } from "react";
import * as Yup from "yup";
import ConfirmModal from "../common/ConfirmModal";
import { steps } from "../../data/steps";
import { Box, Button, Grid } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useProcessStore } from "../../store/store";
import ProfessorAutocomplete from "../selects/ProfessorAutoComplete";
import { Mentor } from "../../models/mentorInterface";
import { postDefenseDetail } from "../../services/defenseDetail";
import { updateProcess } from "../../services/processServicer";
import { useDefenseExternalDetail } from "../../hooks/useDefenseExternalDetail";

const DEFENSE_EXTERNAL = "external";

interface ExternalValues {
  president: string;
  firstJuror: string;
  secondJuror: string;
  date: Dayjs;
}

const validationSchema = Yup.object({
  president: Yup.string().required("* Debe agregar un presidente"),
  firstJuror: Yup.string().required("* Debe agregar un primer jurado"),
  secondJuror: Yup.string().required("* Debe agregar un segundo jurado"),
  date: Yup.string().required("* Debe seleccionar una fecha"),
});

interface ExternalDefenseStageProps {
  onPrevious: () => void;
}

export const ExternalDefenseStage: FC<ExternalDefenseStageProps> = ({ onPrevious }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const process = useProcessStore((state) => state.process);
  const [editMode] = useState<boolean>(false);

  const setProcess = useProcessStore((state) => state.setProcess);
  const defenseDetail = useDefenseExternalDetail(process?.id || 0);

  const [uniqueJurors, setUniqueJurors] = useState<boolean>(true);

  const formik = useFormik({
    initialValues: {
      president: defenseDetail?.president?.toString() || "",
      firstJuror: defenseDetail?.first_juror?.toString() || "",
      secondJuror: defenseDetail?.second_juror?.toString() || "",
      date: defenseDetail?.date ? dayjs(defenseDetail.date) : dayjs(),
    },
    validationSchema,
    onSubmit: () => {
      setShowModal(true);
    },
  });

  useEffect(() => {
    if (defenseDetail) {
      formik.setValues({
        president: defenseDetail.president?.toString() || "",
        firstJuror: defenseDetail.first_juror?.toString() || "",
        secondJuror: defenseDetail.second_juror?.toString() || "",
        date: defenseDetail.date ? dayjs(defenseDetail.date) : dayjs(),
      });
    }
  }, [defenseDetail]);

  const saveStage = async (values: ExternalValues) => {
    if (process) {
      const defenseDetail = {
        graduation_process_id: process.id,
        president: Number(values.president),
        first_juror: Number(values.firstJuror),
        second_juror: Number(values.secondJuror),
      };
      await postDefenseDetail(process.id, {
        ...defenseDetail,
        type: DEFENSE_EXTERNAL,
      });
      setProcess(process);
      await updateProcess(process);
    }
  };

  const handleModalAction = async () => {
    if (formik.values) {
      await saveStage(formik.values);
      setShowModal(false);
    }
  };

  const handlePresidentChange = (_event: React.ChangeEvent<unknown>, value: Mentor | null) => {
    formik.setFieldValue("president", value?.id || "");
  };

  const handleFirstJurorChange = (_event: React.ChangeEvent<unknown>, value: Mentor | null) => {
    formik.setFieldValue("firstJuror", value?.id || "");
  };

  const handleSecondJurorChange = (_event: React.ChangeEvent<unknown>, value: Mentor | null) => {
    formik.setFieldValue("secondJuror", value?.id || "");
  };

  const handleDateChange = (value: Dayjs | null) => {
    formik.setFieldValue("date", value);
  };

  const currentDate = dayjs();

  useEffect(() => {
    const firstJuror = formik.values.firstJuror;
    const secondJuror = formik.values.secondJuror;
    if (firstJuror == "" || secondJuror == "") {
      setUniqueJurors(true);
    } else {
      setUniqueJurors(new Set([firstJuror, secondJuror]).size === 2);
    }
  }, [formik.values]);

  return (
    <>
      <div className="txt1">Etapa Final: Defensa Externa</div>

      <form onSubmit={formik.handleSubmit} className="mx-16 ">
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6} marginTop={5}>
              <ProfessorAutocomplete
                disabled={editMode}
                value={String(formik.values.president)}
                onChange={handlePresidentChange}
                id="president"
                label={"Seleccionar Presidente"}
              />
              {formik.touched.president && formik.errors.president ? (
                <div className="text-red-1 text-xs mt-1">{String(formik.errors.president)}</div>
              ) : null}
            </Grid>

            <Grid item xs={6} marginTop={5}>
              <ProfessorAutocomplete
                disabled={editMode}
                value={String(formik.values.firstJuror)}
                onChange={handleFirstJurorChange}
                id="firstJuror"
                label={"Seleccionar Primer Jurado"}
              />
              {formik.touched.firstJuror && formik.errors.firstJuror ? (
                <div className="text-red-1 text-xs mt-1">{String(formik.errors.firstJuror)}</div>
              ) : null}
            </Grid>

            <Grid item xs={6} marginTop={5}>
              <ProfessorAutocomplete
                disabled={editMode}
                value={String(formik.values.secondJuror)}
                onChange={handleSecondJurorChange}
                id="secondJuror"
                label={"Seleccionar Segundo Jurado"}
              />
              {formik.touched.secondJuror && formik.errors.secondJuror ? (
                <div className="text-red-1 text-xs mt-1">{String(formik.errors.secondJuror)}</div>
              ) : null}
              {!uniqueJurors && (
                <div className="text-red-1 text-xs mt-1">Los jurados deben ser distintos</div>
              )}
            </Grid>

            <Grid item xs={12} sm={6} marginTop={5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de Defensa"
                  value={formik.values.date}
                  onChange={handleDateChange}
                  format="DD/MM/YYYY"
                  minDate={currentDate}
                  maxDate={currentDate.add(1, "year")}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" justifyContent="space-between" pt={5}>
          <Button type="button" onClick={onPrevious} variant="contained" color="secondary">
            Anterior
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={!uniqueJurors}>
            Finalizar
          </Button>
        </Box>
      </form>
      {showModal && (
        <ConfirmModal
          step={steps[4]}
          nextStep={steps[4]}
          setShowModal={setShowModal}
          isApproveButton={true}
          onNext={handleModalAction}
        />
      )}
    </>
  );
};
