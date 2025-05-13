import { FC, useState } from "react";
import { Checkbox, Paper, Typography } from "@mui/material";
import DownloadButton from "../common/DownloadButton";
import { letters } from "../../constants/letters";
import { FormikProps } from "formik";
import { Seminar } from "../../models/studentProcess";
import dayjs from "dayjs";
import { MentorFormValues } from "../../hooks/useMentorFormik";
import { Carrer } from "../../store/carrerStore";

const { TUTOR_APPROBAL, TUTOR_ASSIGNMENT } = letters;

interface DocumentCheckboxProps {
  disabled: boolean;
  formik: FormikProps<MentorFormValues>;
  carrer: Carrer | null;
  process: Seminar | null;
}

const DocumentCheckbox: FC<DocumentCheckboxProps> = ({ disabled, formik, carrer, process }) => {
  const [, setDownloadBlocked] = useState(false);

  const handleBlockedDownload = () => {
    if (!formik.values.mentor) {
      setDownloadBlocked(true);
    } else {
      setDownloadBlocked(false);
    }
  };

  const isMentorSelected = !!formik.values.mentor;

  return (
    <>
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
          name="tutorDesignationLetterSubmitted"
          color="primary"
          checked={formik.values.tutorDesignationLetterSubmitted}
          onChange={formik.handleChange}
          disabled={disabled}
        />
        <Typography variant="body2" sx={{ flexGrow: 1 }}>
          Carta de Asignación de Tutor Presentada
        </Typography>
        <DownloadButton
          url={TUTOR_ASSIGNMENT.path}
          disabled={!isMentorSelected}
          onClick={handleBlockedDownload}
          data={{
            student: process?.student_fullname || "",
            tutor: process?.tutor_fullname || "",
            jefe_carrera: carrer?.headOfDepartment || "",
            carrera: carrer?.fullName || "",
            dia: dayjs().format("DD"),
            mes: dayjs().format("MMMM"),
            ano: dayjs().format("YYYY"),
          }}
          filename={`${TUTOR_ASSIGNMENT.filename}_${formik.values.mentorName}.${TUTOR_ASSIGNMENT.extention}`}
        />
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
          name="tutorApprovalLetterSubmitted"
          color="primary"
          checked={formik.values.tutorApprovalLetterSubmitted}
          onChange={formik.handleChange}
          disabled={disabled}
        />
        <Typography variant="body2" sx={{ flexGrow: 1 }}>
          Carta de Aprobación de Tutor Presentada
        </Typography>
        <DownloadButton
          url={TUTOR_APPROBAL.path}
          disabled={!isMentorSelected}
          onClick={handleBlockedDownload}
          data={{
            student: process?.student_fullname || "",
            tutor: process?.tutor_fullname || "",
            jefe_carrera: carrer?.headOfDepartment || "",
            degree: process?.tutor_degree || "",
            carrera: carrer?.fullName || "",
            dia: dayjs().format("DD"),
            mes: dayjs().format("MMMM"),
            ano: dayjs().format("YYYY"),
            title_project: process?.project_name || "",
            date: dayjs(formik.values.date_tutor_assignament).format("DD/MM/YYYY"),
          }}
          filename={`${TUTOR_APPROBAL.filename}_${formik.values.mentorName}.${TUTOR_APPROBAL.extention}`}
        />
      </Paper>
    </>
  );
};

export default DocumentCheckbox;
