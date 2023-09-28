import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import s from "./Login.module.css";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, selectIsAuth } from "../../Redux/Slices/AuthSlice";
import { useForm } from "react-hook-form";

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "notadmin@mail.ru",
      password: "11111",
    },
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert("Неправильный логин или пароль");
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
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите почту" })}
          fullWidth
          className={s.field}
          label="E-Mail"
          type="email"
        />
        <TextField
          className={s.field}
          label="Пароль"
          fullWidth
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", {
            required: "Укажите пароль",
            minLength: {
              value: 5,
              message: "Пароль должен содержать минимум 5 символов",
            },
          })}
        />
        <Button
          className={s.button}
          type="submit"
          size="large"
          variant="contained"
          disabled={!isValid}
          fullWidth
        >
          Войти
        </Button>
        <Link to="/auth/register">
          <Button
            className={s.button}
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
