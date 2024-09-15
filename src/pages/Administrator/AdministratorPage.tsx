import { useEffect, useState } from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import "../../components/administration/AdministratorPageComponents.css";
import RoleTable from "../../components/administration/RoleTable";
import PermissionTable from "../../components/administration/PermissionTable";
import AddTextModal from "../../components/common/AddTextModal";
import { getRoles, addRole } from "../../services/roleService";
import { Role } from "../../models/roleInterface";
import { RolePermissions } from "../../models/rolePermissionInterface";


const AdministratorPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [title, setTitle] = useState("");
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [currentPermissions, setCurrentPermissions] = useState<string[]>([])

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await getRoles();
        const rolesPermissions: RolePermissions = rolesData.data;
        const rolesFetched: Role[] = []
        Object.keys(rolesPermissions).forEach((roleName:string) => {
          const rolePermissions = rolesPermissions[roleName];
          rolesFetched.push({
            id: rolePermissions.id,
            name: roleName,
            disabled: rolePermissions.disabled,
            permissions: rolePermissions.permissions
          })
        })
        setRoles(rolesFetched);
        setTitle(rolesFetched[0].name);
        setCurrentPermissions(rolesFetched[0].permissions);
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
    roles.forEach((role: Role) => {
      if (role.name === roleName){
        setCurrentPermissions(role.permissions);
      }
    })
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
        <RoleTable roles={roles} onRoleSelect={handleRoleSelect} selectedRole={""} setIsModalVisible = {setIsModalVisible}/>
      </Grid>
      <Grid item xs={8}>
        {!isSmallScreen && <PermissionTable currentPermissions={currentPermissions}/>}
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
