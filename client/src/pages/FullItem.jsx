import { Alert, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/Slices/CartSlice";

const FullItem = () => {
  const { id } = useParams();
  const [itemData, setItemData] = React.useState(null);
  const [showIsAdded, setShowIsAdded] = React.useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = () => {
    const selectedItem = { ...itemData, quantity: 1 };
    const itemInCart = cartItems.find((item) => item._id === selectedItem._id);

    if (itemInCart) {
      dispatch(addToCart({ ...itemInCart, quantity: itemInCart.quantity + 1 }));
    } else {
      dispatch(addToCart(selectedItem));
    }

    setShowIsAdded(true);
  };

  React.useEffect(() => {
    axios.get(`/products/${id}`).then((response) => {
      setItemData(response.data);
    });
  }, [id]);

  return (
    <>
      {showIsAdded && (
        <Alert onClose={() => setShowIsAdded(false)} severity="success">
          Товар успешно добавлен в корзину
        </Alert>
      )}
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          backgroundColor: "#fff",
          borderRadius: 3,
          marginTop: 7,
          padding: 10,
        }}
      >
        {itemData ? (
          <>
            <div className="fullItem__img">
              <img src={itemData.imageUrl} alt={itemData.name} />
            </div>
            <div>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                {itemData.name}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                {itemData.description}
              </Typography>
              <div style={{ display: "flex" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                    flexGrow: 1,
                  }}
                >
                  Цена: {itemData.price} ₽
                </Typography>
                <Button
                  onClick={handleAddToCart}
                  variant="contained"
                  sx={{ fontWeight: "bold" }}
                >
                  Добавить
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        )}
      </Container>
    </>
  );
};

export default FullItem;
