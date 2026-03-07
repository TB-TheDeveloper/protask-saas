import React, { useContext } from "react";
import ProductGrid from "../components/ProductGrid";
import { AppContext } from "../AppContextProvider";
import Hero from "../components/Hero";

const Home: React.FC = () => {
  const { products } = useContext(AppContext);
  const previewProducts = products.slice(0, 8);

  return (
    <>
      <Hero />
      <ProductGrid products={previewProducts} />
    </>
  );
};

export default Home;
