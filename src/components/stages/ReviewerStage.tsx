import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Paper,
  Tooltip,
  Typography,
  Alert,
  AlertTitle,
  Snackbar,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import WarningIcon from "@mui/icons-material/Warning";
import ConfirmModal from "../common/ConfirmModal";
import { steps } from "../../data/steps";
import { useProcessStore } from "../../store/store";
import { updateProcess } from "../../services/processServicer";
import { Mentor } from "../../models/mentorInterface";
import ProfessorAutocomplete from "../selects/ProfessorAutoComplete";
import DownloadButton from "../common/DownloadButton";
import { letters } from "../../constants/letters";
import { useCarrerStore } from "../../store/carrerStore";

const { TUTOR_APPROBAL, REVIEWER_ASSIGNMENT } = letters;

const validationSchema = Yup.object({
  reviewer: Yup.string().required("* El revisor es obligatorio"),
  reviewerDesignationLetterSubmitted: Yup.boolean(),
  reviewerApprovalLetterSubmitted: Yup.boolean(),
  date_reviewer_assignament: Yup.mixed().required("Debe seleccionar una fecha"),
});

interface ReviewerStageProps {
  onPrevious: () => void;
  onNext: () => void;
}

const program = "Ingeniería de Sistemas Computacionales";
const headOfDepartment = "Alexis Marechal Marin PhD";
const CURRENT_STAGE = 2;

const ReviewerStage: FC<ReviewerStageProps> = ({ onPrevious, onNext }) => {
  const process = useProcessStore((state) => state.process);
  const carrer = useCarrerStore((state) => state.carrer);
  const setProcess = useProcessStore((state) => state.setProcess);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showWarningSnackbar, setShowWarningSnackbar] = useState<boolean>(false);
  const [originalReviewerId, setOriginalReviewerId] = useState<number | undefined>(undefined);

  const isReadOnlyMode = () => {
    if (!process) {
      return true;
    }

    if (process.stage_id > CURRENT_STAGE && process.reviewer_approval) {
      return true;
    }

    return false;
  };

  const [editMode, setEditMode] = useState<boolean>(isReadOnlyMode());

  const wasReviewerApproved = () =>
    Boolean(process?.reviewer_approval && process?.stage_id > CURRENT_STAGE);

  const formik = useFormik({
    initialValues: {
      reviewerDesignationLetterSubmitted: process?.reviewer_letter || false,
      date_reviewer_assignament: process?.date_reviewer_assignament
        ? dayjs(process.date_reviewer_assignament)
        : dayjs(),
      reviewer: process?.reviewer_id?.toString() || "",
      reviewerApprovalLetterSubmitted: process?.reviewer_approval || false,
    },
    validationSchema,
    onSubmit: () => {
      if (wasReviewerApproved() && originalReviewerId !== Number(formik.values.reviewer)) {
        setShowWarningSnackbar(true);
        return;
      }
      setShowModal(true);
    },
  });

  useEffect(() => {
    if (process?.reviewer_id) {
      setOriginalReviewerId(process.reviewer_id);
    }
  }, [process?.reviewer_id]);

  useEffect(() => {
    if (process) {
      formik.setValues({
        reviewerDesignationLetterSubmitted: process.reviewer_letter || false,
        date_reviewer_assignament: process.date_reviewer_assignament
          ? dayjs(process.date_reviewer_assignament)
          : dayjs(),
        reviewer: process.reviewer_id?.toString() || "",
        reviewerApprovalLetterSubmitted: process.reviewer_approval || false,
      });
      setEditMode(isReadOnlyMode());
    }
  }, [process]);

  const canApproveStage = () =>
    Boolean(
      formik.values.reviewer &&
        formik.values.reviewerDesignationLetterSubmitted &&
        formik.values.reviewerApprovalLetterSubmitted &&
        formik.values.date_reviewer_assignament
    );

  const isApproveButton = canApproveStage();
  const hasReviewer = Boolean(formik.values.reviewer);

  const saveStage = async () => {
    if (!process) {
      return;
    }

    const { reviewer, reviewerDesignationLetterSubmitted, reviewerApprovalLetterSubmitted } =
      formik.values;

    const reviewerChanged = originalReviewerId !== Number(reviewer);
    const wasApproved = process.reviewer_approval;

    const updatedProcess = { ...process };

    if (reviewerChanged && wasApproved) {
      updatedProcess.reviewer_approval = false;
      updatedProcess.reviewer_approval_date = null;
      if (updatedProcess.stage_id > CURRENT_STAGE) {
        updatedProcess.stage_id = CURRENT_STAGE;
      }
    } else {
      updatedProcess.reviewer_approval = reviewerApprovalLetterSubmitted;
      if (reviewerApprovalLetterSubmitted && isApproveButton) {
        updatedProcess.reviewer_approval_date = dayjs();
      }
    }

    updatedProcess.reviewer_letter = reviewerDesignationLetterSubmitted;
    updatedProcess.reviewer_id = Number(reviewer);
    updatedProcess.date_reviewer_assignament = formik.values.date_reviewer_assignament;

    if (isApproveButton && !reviewerChanged) {
      updatedProcess.stage_id = 3;
    }

    try {
      setProcess(updatedProcess);

      await updateProcess(updatedProcess);

      if (isApproveButton && !reviewerChanged) {
        onNext();
      }
    } catch (error) {
      console.error("Error al actualizar el proceso:", error);
      setProcess(process);
    }
  };

  const handleModalAction = async () => {
    await saveStage();
    setShowModal(false);
  };

  const handleMentorChange = (_event: React.ChangeEvent<unknown>, value: Mentor | null) => {
    formik.setFieldValue("reviewer", value?.id?.toString() || "");
    if (process) {
      process.reviewer_fullname = value?.fullname || "";
      process.reviewer_degree = value?.degree || "";
    }
  };

  const handleDateChange = (value: Dayjs | null) => {
    formik.setFieldValue("date_reviewer_assignament", value);
  };

  const editForm = () => {
    if (wasReviewerApproved()) {
      setShowWarningSnackbar(true);
      return;
    }
    setEditMode(false);
  };

  const handleWarningSnackbarClose = () => {
    setShowWarningSnackbar(false);
  };

  return (
    <>
      <div className="txt1 pb-3">
        {"Etapa 3: Seleccionar Revisor "}
        <ModeEditIcon
          onClick={editForm}
          style={{
            cursor: wasReviewerApproved() ? "not-allowed" : "pointer",
            color: wasReviewerApproved() ? "#ccc" : "inherit",
          }}
        />
      </div>

      {wasReviewerApproved() && (
        <Alert severity="warning" sx={{ mb: 2 }} icon={<WarningIcon />}>
          <AlertTitle>{"Fase de Revisor Registrada"}</AlertTitle>
          {"Esta fase ya ha sido completada y aprobada. No se puede editar el revisor porque \r"}
          {"la fase ya ha sido registrada. Si necesita hacer cambios, contacte al administrador.\r"}
        </Alert>
      )}

      {!wasReviewerApproved() &&
        process?.reviewer_approval &&
        process?.stage_id > CURRENT_STAGE && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <AlertTitle>{"Edición de Revisor Aprobado"}</AlertTitle>
            {
              "El revisor actual ya fue aprobado. Cualquier cambio requerirá una nueva aprobación \r"
            }
            {"y el proceso regresará a la etapa de revisión.\r"}
          </Alert>
        )}

      <form onSubmit={formik.handleSubmit} className="mt-5 mx-16">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <ProfessorAutocomplete
              disabled={editMode}
              value={formik.values.reviewer}
              onChange={handleMentorChange}
              id="reviewer"
              label="Seleccionar Revisor"
            />
            {formik.touched.reviewer && formik.errors.reviewer ? (
              <div className="text-red-1 text-xs mt-1">{formik.errors.reviewer}</div>
            ) : null}
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled={editMode}
                label="Fecha de Asignación"
                value={formik.values.date_reviewer_assignament}
                onChange={handleDateChange}
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Paper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#e6f4ff",
            p: 2,
            borderRadius: 2,
            mt: 2,
          }}
        >
          <Checkbox
            name="reviewerDesignationLetterSubmitted"
            color="primary"
            checked={formik.values.reviewerDesignationLetterSubmitted}
            onChange={formik.handleChange}
            disabled={editMode}
          />
          <Typography variant="body2" sx={{ flexGrow: 1 }}>
            {"Carta de Designación de Revisor Presentada\r"}
          </Typography>
          <Tooltip
            title={!hasReviewer ? "Debe seleccionar un revisor para habilitar esta descarga" : ""}
          >
            <span>
              <DownloadButton
                disabled={!hasReviewer}
                url={REVIEWER_ASSIGNMENT.path}
                data={{
                  student: process?.student_fullname || "",
                  number: 1,
                  reviewer: process?.reviewer_fullname || "",
                  degree: process?.reviewer_degree || "",
                  jefe_carrera: headOfDepartment,
                  carrera: carrer?.fullName || "",
                  project_title: process?.project_name || "",
                  carrer_abre: carrer?.shortName || "",
                  day: dayjs().format("DD"),
                  month: dayjs().format("MMMM"),
                  year: dayjs().format("YYYY"),
                }}
                filename={`${REVIEWER_ASSIGNMENT.filename}_${
                  process?.reviewer_fullname || ""
                }.${REVIEWER_ASSIGNMENT.extention}`}
              />
            </span>
          </Tooltip>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#e6f4ff",
            p: 2,
            borderRadius: 2,
            mt: 2,
          }}
        >
          <Checkbox
            name="reviewerApprovalLetterSubmitted"
            color="primary"
            checked={formik.values.reviewerApprovalLetterSubmitted}
            onChange={formik.handleChange}
            disabled={editMode}
          />
          <Typography variant="body2" sx={{ flexGrow: 1 }}>
            {"Carta de Aprobación de Revisor Presentada\r"}
          </Typography>
          <Tooltip
            title={!hasReviewer ? "Debe seleccionar un revisor para habilitar esta descarga" : ""}
          >
            <span>
              <DownloadButton
                disabled={!hasReviewer}
                url={TUTOR_APPROBAL.path}
                data={{
                  student: process?.student_name || "",
                  tutor: process?.tutor_name || "",
                  jefe_carrera: headOfDepartment,
                  carrera: program,
                  dia: dayjs().format("DD"),
                  mes: dayjs().format("MMMM"),
                  ano: dayjs().format("YYYY"),
                  title_project: process?.project_name || "",
                  date: dayjs(formik.values.date_reviewer_assignament).format("DD/MM/YYYY"),
                }}
                filename={`${TUTOR_APPROBAL.filename}_${formik.values.reviewer}.${TUTOR_APPROBAL.extention}`}
              />
            </span>
          </Tooltip>
        </Paper>

        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button type="button" variant="contained" color="secondary" onClick={onPrevious}>
            {"Anterior\r"}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={
              editMode ||
              !formik.values.reviewerDesignationLetterSubmitted ||
              !formik.values.reviewerApprovalLetterSubmitted
            }
          >
            {isApproveButton ? "Aprobar Etapa" : "Guardar"}
          </Button>
        </Box>
      </form>

      {showModal && (
        <ConfirmModal
          step={steps[2]}
          nextStep={steps[3]}
          setShowModal={setShowModal}
          isApproveButton={isApproveButton}
          onNext={handleModalAction}
        />
      )}

      <Snackbar
        open={showWarningSnackbar}
        autoHideDuration={6000}
        onClose={handleWarningSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleWarningSnackbarClose} severity="warning" sx={{ width: "100%" }}>
          {"No se puede editar el revisor porque la fase ya ha sido registrada o aprobada.\r"}
          {"Cualquier cambio requerirá reiniciar el proceso de aprobación.\r"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReviewerStage;
