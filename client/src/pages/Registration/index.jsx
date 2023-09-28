import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import s from "./Registration.module.css";
import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <Paper className={s.root}>
      <Typography className={s.title} variant="h5">
        Создание аккаунта
      </Typography>
      <form>
        <TextField className={s.field} label="Полное имя" fullWidth />
        <TextField type="email" className={s.field} label="E-Mail" fullWidth />
        <TextField
          type="password"
          className={s.field}
          label="Пароль"
          fullWidth
        />
        <Button
          className={s.button}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Зарегистрироваться
        </Button>
        <Link to="/login">
          <Button
            className={s.button}
            type="submit"
            size="small"
            variant="outlined"
            fullWidth
          >
            Уже есть аккаунт? Авторизируйтесь
          </Button>
        </Link>
      </form>
    </Paper>
  );
};

export default Registration;
