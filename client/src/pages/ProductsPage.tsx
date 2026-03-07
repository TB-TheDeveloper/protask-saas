import React, { useContext } from "react";
import { AppContext } from "../AppContextProvider";

import ProductGrid from "../components/ProductGrid";

const ProductsPage: React.FC = () => {
  const { products } = useContext(AppContext);
  return (
    <div>
      <ProductGrid products={products} />
    </div>
  );
};

export default ProductsPage;
