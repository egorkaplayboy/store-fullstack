import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import s from "./Login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Paper className={s.root}>
      <Typography className={s.title} variant="h5">
        Вход в аккаунт
      </Typography>
      <form>
        <TextField className={s.field} label="E-Mail" type="email" fullWidth />
        <TextField
          className={s.field}
          label="Пароль"
          fullWidth
          type="password"
        />
        <Button
          className={s.button}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Войти
        </Button>
        <Link to="/auth/register">
          <Button
            className={s.button}
            type="submit"
            size="small"
            variant="outlined"
            fullWidth
          >
            Нет аккаунта? Зарегистрируйстесь
          </Button>
        </Link>
      </form>
    </Paper>
  );
};

export default Login;
