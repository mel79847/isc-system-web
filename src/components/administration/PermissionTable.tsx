import React, { useEffect, useState } from "react";
import { Box, Button, Switch, Table, TableBody, TableCell, TableHead, TableRow, Typography, IconButton, Collapse} from "@mui/material";
import getPermissions from "../../services/permissionsService";
import { Section } from "../../models/sectionInterface";
import { Permission } from "../../models/permissionInterface";
import SavePermissionsModal from "../common/SavePermissionsModal";
import { ExpandLess, ExpandMore } from "@mui/icons-material";


const PermissionTable = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [listOfChanges, setListOfChanges] = useState<Permission[]>([]);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [openSections, setOpenSections] = useState<boolean[]>([]);

  const fetchPermissions = async () => {
    const response = await getPermissions();
    setSections(response);
    setOpenSections(new Array(response.length).fill(true)); // Inicializa todas las secciones como abiertas
  }
  useEffect(() => {
    fetchPermissions();
  }, []);

  const handleSwitchChange = (sectionIndex: number, permissionIndex: number) => (event: any) => {
    const newSections = [...sections];
    newSections[sectionIndex].permissions[permissionIndex].state = event.target.checked;
    setSections(newSections);
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
    const newSections = sections;
    newSections.forEach((section) => {
      section.permissions.forEach((permission) => {
        if (listOfChanges.includes(permission)) {
          permission.state = !permission.state;
        }
      })
    })
    setSections(newSections);
    setListOfChanges([]);
  }

  return (
    <>
      <Box sx={{ overflow: 'auto', height: '400px' }}>
        <Table className="border-table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#3f51b5",
                  color: "white",
                  fontWeight: "bold",
                  width: "70%",
                }}
              >
                Acción
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#3f51b5",
                  color: "white",
                  fontWeight: "bold",
                  width: "30%",
                }}
              >
                Permisos
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sections.length > 0 ? (
              sections.map((section, sectionIndex) => (
                <React.Fragment key={sectionIndex}>
                  <TableRow sx={{ backgroundColor: "#e0e0e0" }}> {/* Color para la categoría */}
                    <TableCell
                      colSpan={2}
                      sx={{
                        padding: "0px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%", 
                        borderBottom: '1px solid #d0d0d0',
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                        <IconButton onClick={() => toggleSection(sectionIndex)}>
                          {openSections[sectionIndex] ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>{section.subtitle}</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <Collapse in={openSections[sectionIndex]} timeout="auto" unmountOnExit>
                    {section.permissions.map((permission: any, permissionIndex: number) => (
                      <TableRow key={permissionIndex}>
                        <TableCell sx={{ width: "70%" }}>{permission.action}</TableCell>
                        <TableCell sx={{ width: "30%" }}>
                          <Switch
                            checked={permission.state}
                            onChange={handleSwitchChange(sectionIndex, permissionIndex)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </Collapse>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      {buttonVisible && (
        <Box display="flex" justifyContent="flex-end" sx={{ marginTop: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginRight: '20px', borderRadius: '16px' }}
            onClick={() => { setShowModal(true) }}
          >
            Guardar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ borderRadius: '16px' }}
            onClick={cancelChanges}
          >
            Cancelar
          </Button>
        </Box>
      )}
      {showModal && (<SavePermissionsModal isVisible={showModal} setIsVisible={setShowModal} onSave={() => { }} />)}
    </>
  );
};


export default PermissionTable