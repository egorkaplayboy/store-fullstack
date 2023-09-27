import { Grid } from "@mui/material";
import React from "react";
import Item from "../components/Item";
import Skeleton from "../components/Item/Skeleton"

const Home = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Item />
      </Grid>
      <Grid item xs={4}>
        <Skeleton />
      </Grid>
      <Grid item xs={4}>
        <Item />
      </Grid>
      <Grid item xs={4}>
        <Item />
      </Grid>
    </Grid>
  );
};

export default Home;
