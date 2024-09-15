import { useEffect, useState } from "react";
import { Box, Button, Switch, Table, TableBody, TableCell, TableHead, TableRow, Typography, IconButton, Collapse} from "@mui/material";
import { getPermissions } from "../../services/permissionsService";
import { Section } from "../../models/sectionInterface";
import { Permission } from "../../models/permissionInterface";
import SavePermissionsModal from "../common/SavePermissionsModal";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { PermissionsCategory } from "../../models/permissionsCategoryInterface";
import { PermissionTableProps } from "../../models/permissionTablePropsInterface";


const PermissionTable: React.FC<PermissionTableProps> = ({ currentPermissions}) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [listOfChanges, setListOfChanges] = useState<Permission[]>([]);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [openSections, setOpenSections] = useState<boolean[]>([]);

  const fetchPermissions = async () => {
    const response = await getPermissions();
    const permissionsCategory: PermissionsCategory = response.data;
    const sections: Section[] = [];
    Object.keys(permissionsCategory).forEach((secitionName:string) => {
      const section = permissionsCategory[secitionName];
      sections.push({name:secitionName, permissions: section.flat()});
    });
    setSections(sections);
    setOpenSections(new Array(response.length).fill(true)); // Inicializa todas las secciones como abiertas
  }
  useEffect(() => {
    fetchPermissions();
  }, []);

  const handleSwitchChange = (sectionIndex: number, permissionIndex: number) => () => {
    const newSections = [...sections];
    if (!listOfChanges.includes(newSections[sectionIndex].permissions[permissionIndex])) {
      setListOfChanges([...listOfChanges, newSections[sectionIndex].permissions[permissionIndex]]);
    } else {
      setListOfChanges(listOfChanges.filter(permission => permission !== newSections[sectionIndex].permissions[permissionIndex]));
    }
  };

  const toggleSection = (index: number) => {
    const newOpenSections = [...openSections];
    newOpenSections[index] = !newOpenSections[index];
    setOpenSections(newOpenSections);
  };

  useEffect(() => {
    if (listOfChanges.length > 0) {
      setButtonVisible(true);
    } else {
      setButtonVisible(false);
    }
  }, [listOfChanges])

  const cancelChanges = () => {
    setListOfChanges([]);
  }
  return (
    <>
      <Box sx={{ overflow: "auto", height: "400px" }}>
        <Table className="border-table" sx={{ marginBottom: "10px" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#191D88",
                  color: "white",
                  fontWeight: "bold",
                  width: "70%",
                }}
              >
                Acción
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#191D88",
                  color: "white",
                  fontWeight: "bold",
                  width: "30%",
                }}
              >
                Permisos
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
  
        {sections.length > 0 ? (
          sections.map((section, sectionIndex) => (
            <Box key={sectionIndex} sx={{ marginBottom: "20px" }}>
              <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#e0e0e0", padding: "10px" }}>
                <IconButton onClick={() => toggleSection(sectionIndex)}>
                  {openSections[sectionIndex] ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
                <Typography variant="subtitle1" sx={{ marginLeft: "8px", color: "primary" }}>
                  {section.name}
                </Typography>
              </Box>
  
              <Collapse in={openSections[sectionIndex]} timeout="auto" unmountOnExit>
                <Table className="border-table" sx={{ marginTop: "10px" }}>
                  <TableBody>
                    {section.permissions.map((permission: Permission, permissionIndex: number) => (
                      <TableRow key={permissionIndex}>
                        <TableCell>{permission.name}</TableCell>
                        <TableCell>
                          <Switch
                            checked={(currentPermissions.includes(permission.name) || listOfChanges.includes(permission))&&!(currentPermissions.includes(permission.name) && listOfChanges.includes(permission))}
                            onChange={handleSwitchChange(sectionIndex, permissionIndex)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Collapse>
            </Box>
          ))
        ) : (
          <Typography>No data available</Typography>
        )}
      </Box>
  
      {buttonVisible && (
        <Box display="flex" justifyContent="flex-end" sx={{ marginTop: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginRight: "20px", borderRadius: "16px" }}
            onClick={() => {
              setShowModal(true);
            }}
          >
            Guardar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ borderRadius: "16px" }}
            onClick={cancelChanges}
          >
            Cancelar
          </Button>
        </Box>
      )}

      {showModal && (
        <SavePermissionsModal isVisible={showModal} setIsVisible={setShowModal} onSave={() => {}} />
      )}
    </>
  );
};

export default PermissionTable;
