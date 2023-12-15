import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNotification } from "../../context/notification.context";
import { LoginValidate } from "../../helpers/validateForm";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/base.api";

type LoginType = {
  username: string;
  password: string;
};

export const LoginPage: React.FC<object> = () => {
  const navigate = useNavigate();
  const { getError } = useNotification();
  const [loginData, setLoginData] = React.useState<LoginType>({
    username: "",
    password: "",
  });

  const dataLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    LoginValidate.validate(loginData)
      .then(async () => {
        const response = await login(loginData.username, loginData.password);
        if (response.success === false) {
          getError("invalid credentials");
        }
        if (response.success === true) {
          localStorage.setItem("token", response.result.token);
          navigate("/");
        }
      })
      .catch((error) => {
        getError(error.message);
      });
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
            <Typography sx={{ mt: 1, mb: 1 }} variant="h4">
              Iniciar sesion
            </Typography>
            <Box component="form" onSubmit={handleLogin}>
              <TextField
                name="username"
                margin="normal"
                type="text"
                fullWidth
                label="Username"
                sx={{ mt: 2, mb: 1.5 }}
                onChange={dataLogin}
              />
              <TextField
                name="password"
                margin="normal"
                type="password"
                fullWidth
                label="Password"
                sx={{ mt: 1.5, mb: 1.5 }}
                onChange={dataLogin}
              />
              <Stack direction="row" spacing={2}>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  volver
                </Button>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ mt: 1.5, mb: 2 }}
                >
                  Iniciar sesion
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
