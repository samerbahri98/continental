import {
  Card,
  CardContent,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import DashboardPage from "../components/DashboardPage";
import { useLoggedUser } from "../contexts/UserContexts";

function Dashboard() {
  const user = useLoggedUser()
  return (
    <DashboardPage title="Continental Containers Platform">
      <Container>
        <Toolbar />
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Welcome {user?.username}
            </Typography>
            <Toolbar />
            <Typography variant="body2">
              This is Continental Containers Platform. Used to deploy docker containers
            </Typography>
            <Toolbar />
          </CardContent>
        </Card>
      </Container>
    </DashboardPage>
  );
}

export default Dashboard;
