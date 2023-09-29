import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import axios from "../axios";
import { Navigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const AdminPanel = () => {
  const data = useSelector((state) => state.auth.data);
  const isAdmin = data ? data.role === "admin" : false;
  const [productData, setProductData] = React.useState({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
  });
  const [userId, setUserId] = React.useState("");
  const [showUpdateUser, setShowUpdateUser] = React.useState(false);
  const [showCreateItem, setShowCreateItem] = React.useState(false);
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  const handleProductSubmit = async () => {
    await axios.post("/products/new", productData);
    setProductData({
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
    });
    setShowCreateItem(true);
  };
  const handleAdminSubmit = async () => {
    await axios.post("/auth/make-admin", { userId: userId });
    setUserId("");
    setShowUpdateUser(true);
  };
  return (
    <Container maxWidth="lg">
      <div>
        <Typography sx={{ marginBottom: 5 }} variant="h4">
          Админ панель
        </Typography>
        <Typography variant="h5">Добавить товар</Typography>
        <div className="admin__item">
          <TextField
            label="Ссылка на изображение"
            value={productData.imageUrl}
            onChange={(e) =>
              setProductData({ ...productData, imageUrl: e.target.value })
            }
          />
          <TextField
            label="Название товара"
            value={productData.name}
            onChange={(e) =>
              setProductData({ ...productData, name: e.target.value })
            }
          />
          <TextField
            label="Описание"
            value={productData.description}
            onChange={(e) =>
              setProductData({ ...productData, description: e.target.value })
            }
          />
          <TextField
            label="Цена"
            value={productData.price}
            onChange={(e) =>
              setProductData({ ...productData, price: e.target.value })
            }
          />
          <Button
            sx={{marginLeft: 4}}
            variant="contained"
            color="primary"
            onClick={handleProductSubmit}
            size="large"
          >
            Добавить
          </Button>
        </div>
        {showCreateItem && (
          <Alert
            onClose={() => {
              setShowCreateItem(false);
            }}
            severity="success"
          >
            Продукт успешно добавлен
          </Alert>
        )}
        <Typography sx={{marginTop: 6}} variant="h5">Добавить админа</Typography>
        <div className="admin__item">
          <TextField
            value={userId}
            label="Идентификатор пользователя"
            onChange={(e) => setUserId(e.target.value)}
          />
          <Button
            sx={{marginLeft: 4}}
            variant="contained"
            color="primary"
            onClick={handleAdminSubmit}
            size="large"
          >
            Добавить
          </Button>
        </div>
        {showUpdateUser && (
          <Alert
            onClose={() => {
              setShowUpdateUser(false);
            }}
            severity="success"
          >
            Пользователь успешно обновлен
          </Alert>
        )}
      </div>
    </Container>
  );
};

export default AdminPanel;
