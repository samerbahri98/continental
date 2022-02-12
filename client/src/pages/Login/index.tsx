import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useLogin } from "../../contexts/UserContexts";
import ILoginRequest from "../../interfaces/ILoginRequest";
import * as Yup from "yup";
import { loginFormSchema } from "./loginFormSchema";
import "./login.css"

function Login() {

  const [alerMessage, setAlertMessage] = useState<string>("");
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("error");
  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const login = useLogin();
  const handleLogin = async (values: ILoginRequest) => {
    try {
      await login(values);
    } catch (e) {
      setAlertMessage("incorrect email and/or password");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object().shape(loginFormSchema)}
      isInitialValid={false}
      onSubmit={async (values) => {
        await handleLogin(values);
      }}
    >
      {(props) => (
        <Form>
          <Container>
            <Toolbar />
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Continental Containers Platform
                </Typography>
                <Toolbar />
                <Typography variant="body2">
                  <Stack spacing={1} sx={{ width: 500 }}>
                    <TextField
                      label="Email"
                      variant="standard"
                      name="email"
                      value={props.values.email}
                      id="email"
                      type="email"
                      onChange={(e) =>
                        props.setFieldValue("email", e.target.value)
                      }
                      required
                    />
                    <TextField
                      label="Password"
                      variant="standard"
                      name="password"
                      id="password"
                      value={props.values.password}
                      type="password"
                      onChange={(e) =>
                        props.setFieldValue("password", e.target.value)
                      }
                      required
                    />
                  </Stack>
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
                  Login
                </Button>
                <Button size="large" type="reset">
                  Reset
                </Button>
              </CardActions>
            </Card>
            <Snackbar
              open={alertOpen}
              autoHideDuration={6000}
              onClose={handleAlertClose}
            >
              <Alert severity={alertSeverity} variant="filled">
                {alerMessage}
              </Alert>
            </Snackbar>
          </Container>
        </Form>
      )}
    </Formik>
  );
}

export default Login;
