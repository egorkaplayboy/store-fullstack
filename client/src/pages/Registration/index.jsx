import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import s from "./Registration.module.css";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, selectIsAuth } from "../../Redux/Slices/AuthSlice";
import { Alert } from "@mui/material";

const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const [showErrorReg, setShowErrorReg] = React.useState(false);

  const onSumbit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      setShowErrorReg(true);
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper className={s.root}>
      <Typography className={s.title} variant="h5">
        Создание аккаунта
      </Typography>
      <form onSubmit={handleSubmit(onSumbit)}>
        <TextField
          className={s.field}
          label="Полное имя"
          fullWidth
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("username", {
            required: "Укажите полное имя",
            minLength: {
              value: 4,
              message: "Имя должно содержать минимум 4 символа",
            },
          })}
        />
        <TextField
          type="email"
          className={s.field}
          label="E-Mail"
          fullWidth
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите почту" })}
        />
        <TextField
          type="password"
          className={s.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", {
            required: "Укажите пароль",
            minLength: {
              value: 5,
              message: "Пароль должен содержать минимум 5 символов",
            },
          })}
          fullWidth
        />
        <Button
          className={s.button}
          disabled={!isValid}
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
            size="small"
            variant="outlined"
            fullWidth
          >
            Уже есть аккаунт? Авторизируйтесь
          </Button>
        </Link>
      </form>
      {showErrorReg && (
        <Alert severity="error" onClose={() => setShowErrorReg(false)}>
          Не удалось зарегистрироваться
        </Alert>
      )}
    </Paper>
  );
};

export default Registration;
