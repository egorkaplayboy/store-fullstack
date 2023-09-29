import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import FullItem from "./pages/FullItem";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Header from "./components/Header";
import { Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchAuthMe } from "./Redux/Slices/AuthSlice";
import Admin from "./pages/Admin";
function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <div className="App">
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<FullItem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/register" element={<Registration />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
