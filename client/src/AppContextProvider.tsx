import React, { createContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./type";

interface AppContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const AppContext = createContext<AppContextType>({
  products: [],
  setProducts: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const values = useMemo(
    () => ({
      products,
      setProducts,
    }),
    [products],
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
