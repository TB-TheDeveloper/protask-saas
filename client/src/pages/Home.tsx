import React, { useContext, useEffect } from "react";
import ProductGrid from "../components/ProductGrid";
import { AppContext } from "../AppContextProvider";
import Hero from "../components/Hero";

const Home: React.FC = () => {
  const { products, setProducts } = useContext(AppContext);

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [setProducts]);

  return (
    <>
      <Hero />
      <ProductGrid products={products} />
    </>
  );
};

export default Home;
