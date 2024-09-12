import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EventIcon from "@mui/icons-material/Event";
import ViewListIcon from "@mui/icons-material/ViewList";

import { roles } from "./roles";
const { ADMIN, PROFESSOR, STUDENT } = roles;
export const menu = [
  // TODO: Diferencias entre los roles del menú temporal y el menú original:

  // 1. Item "students":
  //    - Menú temporal: roles: [ADMIN, PROFESSOR]
  //    - Menú original: roles: [PROFESSOR]

  // 2. Item "events":
  //    - Menú temporal: roles: [ADMIN, STUDENT]
  //    - Menú original: roles: [STUDENT]

  // 3. Item "hours":
  //    - Menú temporal: roles: [ADMIN]
  //    - Menú original: Sin roles 

  // 4. Item "programDirector":
  //    - Menú temporal: roles: [ADMIN, PROFESSOR]
  //    - Menú original: roles: [PROFESSOR]

  // 5. Item "CompleteScholarship":
  //    - Menú temporal: roles: [ADMIN]
  //    - Menú original: Sin roles 

  {
    key: "dashboard",
    path: "/dashboard",
    text: "Dashboard",
    icon: <HomeIcon color="primary" />,
    roles: [ADMIN, PROFESSOR,STUDENT],
  },
  {
    key: "process",
    path: "/process",
    text: "Procesos",
    icon: <ChecklistOutlinedIcon color="primary" />,
    roles: [ADMIN, PROFESSOR,STUDENT],
  },
  {
    key: "professors",
    path: "/professors",
    text: "Docentes",
    icon: <SupervisorAccountIcon color="primary" />,
    roles: [PROFESSOR,STUDENT],
  },
  {
    key: "students",
    path: "/students",
    text: "Estudiantes",
    icon: <SchoolOutlinedIcon color="primary" />,
    roles: [ADMIN, PROFESSOR],
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
    roles: [ADMIN],
  },
  {
    key: "programDirector",
    path: "/programDirector",
    text: "Jefe de carrera",
    icon: <EmojiPeopleIcon color="primary" />,
    roles: [ADMIN, PROFESSOR],
  },
  {
    key: "supervisor",
    path: "/supervisor",
    text: "Supervisor",
    icon: <SupervisedUserCircleIcon color="primary" />,
    roles: [ADMIN, STUDENT]
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
    key: "users",
    path: "/users",
    text: "Usuarios",
    icon: <SwitchAccountIcon color="primary"/>,
    roles: [ADMIN],
  },
  {
    key: "viewInterns", 
    path: "/eventsByInterns", 
    text: "Inscritos",
    icon: <ViewListIcon color="primary" />, 
    roles: [ADMIN, PROFESSOR],
  },
];
