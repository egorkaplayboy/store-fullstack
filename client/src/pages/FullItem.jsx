import { Button, Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import CircularProgress from "@mui/material/CircularProgress";

const FullItem = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    axios.get(`/products/${id}`).then((response) => {
      setItemData(response.data);
    });
  }, [id]);

  return (
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
              <Button variant="contained" sx={{ fontWeight: "bold" }}>
                Добавить
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div style={{display: "flex", justifyContent: "center"}}>
          <CircularProgress />
        </div>
      )}
    </Container>
  );
};

export default FullItem;
