import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkUserSession } from "./store/user/user.action";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import Success from "./components/success-purchase/success-purchase";

import { GlobalStyle } from "./global.styles"
import { CssBaseline } from "@mui/material";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() =>{
    dispatch(checkUserSession());
}, [dispatch])


  return (
    <div>
      <CssBaseline />
      <GlobalStyle />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="shop/*" element={<Shop />} />
            <Route path="auth" element={<Authentication />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="checkout/success" element={<Success />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
