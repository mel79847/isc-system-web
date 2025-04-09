import { ReactNode } from "react";
import { Container, Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

interface ContainerPageProps {
  title: string;
  subtitle: string;
  actions: ReactNode;
  children: ReactNode;
}

const ContainerPage: React.FC<ContainerPageProps> = ({ title, subtitle, actions, children }) => {
  return (
    <Container fixed>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography
                variant="h5"
                component="div"
                color={"primary"}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <PersonIcon color="primary" />
                {title}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" component="div">
                {subtitle}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" component="div" sx={{ textAlign: "right" }}>
                {actions}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContainerPage;
