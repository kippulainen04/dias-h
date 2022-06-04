import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkUserSession } from "./store/user/user.action";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

import { GlobalStyle } from "./global.styles"
import Success from "./components/success-purchase/success-purchase";
import { CssBaseline } from "@mui/material";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(checkUserSession());
}, [dispatch])


  return (
    <div>
    <CssBaseline />
    <GlobalStyle />
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="checkout/success" element={<Success />} />
      </Route>
    </Routes>
    </div>
  );
};

export default App;
