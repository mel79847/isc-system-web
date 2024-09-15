import { useEffect, useState } from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import "../../components/administration/AdministratorPageComponents.css";
import RoleTable from "../../components/administration/RoleTable";
import PermissionTable from "../../components/administration/PermissionTable";
import AddTextModal from "../../components/common/AddTextModal";
import { getRoles, addRole } from "../../services/roleService";
import { Role } from "../../models/roleInterface";


const AdministratorPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [title, setTitle] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await getRoles();
        setRoles(rolesData.data);
        if (rolesData.data.length > 0) {
          setTitle(rolesData.data[0].name);
          setSelectedRole(rolesData.data[0]);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const handleCreate = async (roleName: string) => {
    try {
      await addRole({ name:roleName });
      const updateRoles = await getRoles();
      setRoles(updateRoles);
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  const handleRoleSelect = (roleName : string) => {
    setTitle(roleName);
    if (roles && roles.length > 0) {
      const role = roles.find((r) => r.name === roleName);
      setSelectedRole(role || null);
    } else {
      console.error("Roles array is empty or not defined");
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" align="left" sx={{ marginBottom: 2 }}>
        <ManageAccountsIcon color="primary" fontSize="large" sx={{ marginRight: 2 }}/>
          Permisos de {title}
        </Typography>
      </Grid>
      <Grid item xs={!isSmallScreen ? 3 : 12}>
        <RoleTable roles={roles} onRoleSelect={handleRoleSelect} selectedRole={selectedRole?.name || ""} setIsModalVisible = {setIsModalVisible}/>
      </Grid>
      <Grid item xs={8}>
      {!isSmallScreen && selectedRole && <PermissionTable role={selectedRole} />}
      </Grid>
        <AddTextModal
          isVisible={isModalVisible}
          setIsVisible={setIsModalVisible}
          onCreate={handleCreate}
        />
    </Grid>
  );
}

export default AdministratorPage;
