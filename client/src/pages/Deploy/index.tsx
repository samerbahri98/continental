import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeployForm from "./DeployForm";
import Toolbar from "@mui/material/Toolbar";
import React, { useState } from "react";
import DashboardPage from "../../components/DashboardPage";
import { Form, Formik } from "formik";
import IDockerContainerRequest from "../../interfaces/IDockerContainerRequest";
import { useLoggedUser } from "../../contexts/UserContexts";
import { v4 as uuidv4 } from "uuid";
import { useAddDockerContainer } from "../../contexts/ContainersContexts";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import * as Yup from "yup";
import { deployFormSchema } from "./deployFormSchema";

function Deploy() {
  const user = useLoggedUser();
  const [alerMessage, setAlertMessage] = useState<string>("");
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("error");

  const initialValues: IDockerContainerRequest = {
    user: user ? user.id : "",
    image: {
      registry: "",
      repository: "",
      tag: "",
    },
    isRunning: true,
    id: uuidv4(),
    name: "",
  };
  const createContainer = useAddDockerContainer();
  const submitCreateContainer = async (values: IDockerContainerRequest) => {
    try {
      const result = await createContainer(values);
      setAlertMessage(result);
      setAlertSeverity("success");
    } catch (err) {
      setAlertMessage("an error had occured");
      setAlertSeverity("error");
    }
    setAlertOpen(true);
  };

  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };
  return (
    <DashboardPage title="Continental Containers Platform">
      <Container>
        <Toolbar />
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape(deployFormSchema)}
          isInitialValid={false}
          onSubmit={async (
            values,
            { resetForm, setFieldValue, validateForm }
          ) => {
            submitCreateContainer(values);
            resetForm();
            setFieldValue("id", uuidv4());
          }}
        >
          {(props) => (
            <Form>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Deploy a Docker Container
                  </Typography>
                  <Toolbar />
                  <Typography variant="body2">
                    <DeployForm props={props} />
                  </Typography>
                  <Toolbar />
                </CardContent>
                <CardActions>
                  <Button
                    size="large"
                    variant="contained"
                    onClick={() => props.handleSubmit()}
                    disabled={!props.isValid}
                  >
                    Deploy
                  </Button>
                  <Button size="large" type="reset">
                    Reset
                  </Button>
                </CardActions>
              </Card>
            </Form>
          )}
        </Formik>
      </Container>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert severity={alertSeverity} variant="filled">
          {alerMessage}
        </Alert>
      </Snackbar>
    </DashboardPage>
  );
}

export default Deploy;
