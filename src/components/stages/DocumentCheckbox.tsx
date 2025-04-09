import { FC } from "react";
import { Box, FormControlLabel, Checkbox } from "@mui/material";
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
  return (
    <>
      <Box mt={3}>
        <FormControlLabel
          control={
            <Checkbox
              name="tutorDesignationLetterSubmitted"
              color="primary"
              checked={formik.values.tutorDesignationLetterSubmitted}
              onChange={formik.handleChange}
              disabled={disabled}
            />
          }
          label="Carta de Asignación de Tutor Presentada"
        />
        <DownloadButton
          url={TUTOR_ASSIGNMENT.path}
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
      </Box>
      <Box mt={3}>
        <FormControlLabel
          control={
            <Checkbox
              name="tutorApprovalLetterSubmitted"
              color="primary"
              checked={formik.values.tutorApprovalLetterSubmitted}
              onChange={formik.handleChange}
              disabled={disabled}
            />
          }
          label="Carta de Aprobación de Tutor Presentada"
        />
        <DownloadButton
          url={TUTOR_APPROBAL.path}
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
      </Box>
    </>
  );
};

export default DocumentCheckbox;
