import "./App.css";
import { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

const Home = lazy(() => import("./pages/Home"));
const ProductPage = lazy(() => import("./pages/ProductsPage"));
const Success = lazy(() => import("./pages/Success"));
const Cancel = lazy(() => import("./pages/Cancel"));
const App: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar openCart={() => setCartOpen(true)} />
      <Routes>
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <CartDrawer isOpen={cartOpen} setIsOpen={setCartOpen} />
    </Suspense>
  );
};

export default App;
