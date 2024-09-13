import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EventIcon from '@mui/icons-material/Event';

import { roles } from "./roles";
const { ADMIN, PROFESSOR, STUDENT } = roles;
export const menu = [
  {
    key: "users",
    path: "/users",
    text: "Usuarios",
    icon: <SwitchAccountIcon color="primary"/>,
    roles: [ADMIN],
  },
  {
    key: "students",
    path: "/students",
    text: "Estudiantes",
    icon: <SchoolOutlinedIcon color="primary" />,
    roles: [PROFESSOR],
  },
  {
    key: "professors",
    path: "/professors",
    text: "Docentes",
    icon: <SupervisorAccountIcon color="primary" />,
    roles: [PROFESSOR,STUDENT],
  },
  {
    key: "process",
    path: "/process",
    text: "Procesos",
    icon: <ChecklistOutlinedIcon color="primary" />,
    roles: [ADMIN, PROFESSOR,STUDENT],
  },
  {
    key: "events",
    path: "/events",
    text: "Eventos",
    icon: <EventIcon color="primary" />,
    roles: [ADMIN, STUDENT, PROFESSOR],
  },
  {
    key: "hours",
    path: "/scholarshipHours",
    text: "Horas",
    icon: <AccessTimeIcon color="primary" />,
  },
  {
    key: "programDirector",
    path: "/programDirector",
    text: "Jefe de carrera",
    icon: <EmojiPeopleIcon color="primary" />,
    roles: [PROFESSOR, ADMIN],
  },
  {
    key: "CompleteScholarship",
    path: "/CompleteScholarshipHour",
    text: "Finalizar",
    icon: <PendingActionsIcon color="primary" />,
    roles: [PROFESSOR, ADMIN],
  },
  {
    key: "administration",
    path: "/administration",
    text: "Administrador",
    icon: <ManageAccountsIcon color="primary" />,
    roles: [ADMIN],
  },
  {
    key: "dashboard",
    path: "/dashboard",
    text: "Dashboard",
    icon: <HomeIcon color="primary" />,
    roles: [ADMIN, PROFESSOR,STUDENT],
  }
];
