import { CardContent, Grid } from "@mui/material";
import React from "react";
import Item from "../components/Item";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/Slices/ProductsSlice";
import Skeleton from "../components/Item/Skeleton";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productsLoading = products.isLoading;

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Grid
      container
      spacing={4}
      sx={{
        backgroundColor: "#fff",
        borderRadius: 3,
        marginTop: 7,
        padding: 3,
      }}
    >
      {productsLoading
        ? [...Array(6)].map((index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <CardContent>
                <Skeleton />
              </CardContent>
            </Grid>
          ))
        : products.items.map((item) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={item._id}
            >
              <CardContent className="centered-grid-item">
                <Item
                  imageUrl={item.imageUrl}
                  title={item.name}
                  price={item.price}
                  id={item._id}
                />
              </CardContent>
            </Grid>
          ))}
    </Grid>
  );
};

export default Home;
