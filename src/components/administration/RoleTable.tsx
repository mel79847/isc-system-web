import { IconButton, InputAdornment, OutlinedInput, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SearchIcon from '@mui/icons-material/Search';

import RoleComponent from "./RoleComponent";
import { RoleTableProps } from "../../models/roleTablePropsInterface";
import { ChangeEvent, useEffect, useState } from "react";
import { Role } from "../../models/roleInterface";


const RoleTable: React.FC<RoleTableProps> = ({ roles, onRoleSelect, setIsModalVisible}) => { // TODO: Corregir la función para recibir un parámetro

  const [selectedRole, setSelectedRole] = useState("Jefe de Carrera");
  const [search, setSearch] = useState("")
  const [filteredRoles, setFilteredRoles] = useState(roles);

  const handleRoleClick = (roleName:  string) => {
    setSelectedRole(roleName);
    onRoleSelect(roleName);
  };

  const handleRoleDelete = (roleName: string) =>{
    //TODO: Lógica para borrar el componente
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    filterRoles(search);
  };

  const filterRoles = (searchValue: string) => {
    if (searchValue.trim() === "") {
      setFilteredRoles(roles);
    } else {
      const filtered = roles.filter((role: Role) =>
        role.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredRoles(filtered);
    }
  }

  useEffect(() => {
    filterRoles(search);
  }, [search, roles]);

  return (
    <Table className="border-table">
      <TableHead className="orange-header large-header">
        <TableRow>
          <TableCell className="flex justify-center items-center w-full">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">Roles</Typography>
              <IconButton aria-label="add" onClick={() => setIsModalVisible(true)}>
                <PersonAddAlt1Icon fontSize="medium" style={{ color:"white" }} />
              </IconButton>
            </div>
          </TableCell>
        </TableRow>
        <OutlinedInput type="text" id="roles-search" placeholder="Buscar rol" onChange={handleSearch} fullWidth sx={{mt: 2, mb: 2}} endAdornment={<InputAdornment position = "end"><SearchIcon/></InputAdornment>}/>
      </TableHead>
      <TableBody sx={{ display: 'block', maxHeight: 300, overflowY: 'auto' }}>
        {filteredRoles && filteredRoles.map((role, index) => (
          <TableRow key={index}>
              <RoleComponent role={role} selectedRole={selectedRole} onRoleClick={handleRoleClick} onDelete={handleRoleDelete}/>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default RoleTable;