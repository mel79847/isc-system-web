import { Button, Typography, Avatar, Paper, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { User } from "../../../models/userInterface";

interface UserProfileCardProps {
  user: User;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  return (
    <Paper
      elevation={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        backgroundColor: "white",
        borderRadius: 5,
        width: "100%",
        maxWidth: 400,
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ position: "relative", mb: 2 }}>
        <Avatar
          alt="Profile picture"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYuwSeW_wPuwldJSnYf2ibAvVG2zmARUwSBw&s" // Reemplaza con la URL de la imagen
          sx={{ width: { xs: 80, sm: 100 }, height: { xs: 80, sm: 100 } }}
        />
        <Button
          variant="text"
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            minWidth: 0,
            padding: 0.5,
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
            borderRadius: "50%",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <EditIcon fontSize="small" />
        </Button>
      </Box>
      <Typography variant="h5" component="h1" sx={{ textAlign: "center" }}>
        {user.name} {user.lastname} {user.mothername}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 2, textAlign: "center" }}>
        {user.roles.join(", ")}
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 3 }}>
        Agendar una reunión
      </Button>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          padding: 2,
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          borderColor: "#f6f6f6",
          borderWidth: 1,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          Email
        </Typography>
        <Typography variant="body1">{user.email}</Typography>
      </Paper>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          padding: 2,
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          borderColor: "#f6f6f6",
          borderWidth: 1,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          Código
        </Typography>
        <Typography variant="body1">{user.code}</Typography>
      </Paper>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          padding: 2,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          borderColor: "#f6f6f6",
          borderWidth: 1,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          Número de teléfono
        </Typography>
        <Typography variant="body1">{user.phone}</Typography>
      </Paper>
    </Paper>
  );
};

export default UserProfileCard;