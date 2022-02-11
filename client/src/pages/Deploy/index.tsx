import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeployForm from "./DeployForm"
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import DashboardPage from "../../components/DashboardPage";
import { Form, Formik } from "formik";




function Deploy() {
  return (
    <DashboardPage title="Continental Containers Platform">
      <Container>
        <Toolbar />
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Deploy a Docker Container
            </Typography>
            <Toolbar />
            <Typography variant="body2">
            <DeployForm />
            </Typography>
            <Toolbar />
          </CardContent>
          <CardActions>
            <Button size="large" variant="contained">
              Deploy
            </Button>
          </CardActions>
        </Card>
      </Container>
    </DashboardPage>
  );
}

export default Deploy;
