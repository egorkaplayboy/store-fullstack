import React from "react";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import s from "./Header.module.css";
import { IconButton, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Header = () => {
  const isAuth = false;
  return (
    <div className={s.root}>
      <Container maxWidth="lg">
        <div className={s.inner}>
          <Link className={s.logo} to="/">
            <div>React store</div>
          </Link>
          <div className={s.nav}>
            {isAuth ? (
              <>
                <Typography className={s.nav_item}>username</Typography>
                <Link to="/cart">
                  <IconButton className={s.nav_item}>
                    <ShoppingCartOutlinedIcon />
                  </IconButton>
                </Link>
                <Button
                  className={s.nav_item}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <Link to="/auth/login">
                <Button variant="contained">Войти</Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
