import { FC, useState } from "react";
import { Modal as MuiModal, Box, TextField, Button, Typography, IconButton } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import { AddTextModalProps } from "../../models/addTextModalPropsInterface";

import './ModalStyle.css';

const AddTextModal: FC<AddTextModalProps> = ({ isVisible, setIsVisible, onCreate, existingRoles }) => {
const [name, setName] = useState('');
const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    var rolWithTheSameName = false;
    existingRoles.forEach(role=>{
      if(name && role.name.toLowerCase() === name.toLowerCase()){
        rolWithTheSameName = true;
      }
    })
    if(!name.trim()){
      setError("El nombre del rol no puede estar vacío");
    } else if (rolWithTheSameName) {
      setError("Rol existente")
    }else{
      onCreate(name);
      setIsVisible(false);
      setName('');
      setError(null);
    }
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
    setName('');
    setError(null);
  };

  return (
    <MuiModal
      open={isVisible}
      onClose={toggleModal}
      aria-labelledby="create-modal-title"
      aria-describedby="create-modal-description"
    >
      <Box
        className = 'modal-box'
      >
        <IconButton 
        sx={{position: 'absolute', top: 6, left: 450}}
          onClick={toggleModal} 
        >
          <CancelIcon color = "primary"/>
        </IconButton>
        <Typography id="create-modal-title" variant = 'h5'>Crear nuevo rol</Typography>
        <TextField
          fullWidth
          value={name}
          onChange={(e) => {setName(e.target.value);
                            if (error) setError(null);}}
          label="Ingresa el nombre del nuevo rol"
          variant="outlined"
          inputProps={{ maxLength: 25 }}
          sx={{ marginTop: '20px' }}
          error={!!error}
          helperText={error}
        />
        <Box display="flex" justifyContent="flex-end" mt={2}  sx={{ marginTop: '20px' }}>
          <Button variant="outlined" color="secondary" onClick={toggleModal} sx={{ marginRight: '10px' }}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Crear
          </Button>
        </Box>
      </Box>
    </MuiModal>
  );
};

export default AddTextModal;
