import { CardContent, Grid, Typography } from "@mui/material";

import React from "react";
import Item from "../components/Item";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/Slices/ProductsSlice";
import Skeleton from "../components/Item/Skeleton";
import s from "../styles/Home.module.css";

const Home = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productsLoading = products.isLoading;

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products.items.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <div className={s.container}>
        <input
          className={s.search}
          type="text"
          placeholder="Поиск"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={s.search__svg}
        >
          <path
            d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
            stroke="gray"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
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
        {productsLoading ? (
          [...Array(6)].map((_, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <CardContent>
                <Skeleton />
              </CardContent>
            </Grid>
          ))
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <CardContent className="centered-grid-item">
                <Item
                  imageUrl={item.imageUrl}
                  title={item.name}
                  price={item.price}
                  id={item._id}
                />
              </CardContent>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              Товар не найден
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Home;
