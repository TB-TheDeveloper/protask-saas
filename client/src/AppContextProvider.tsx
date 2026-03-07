import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Product } from "./type";

interface AppContextType {
  addToCart: (product: Product) => void;
  cart: CartItem[];
  products: Product[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const AppContext = createContext<AppContextType>({
  addToCart: () => {},
  cart: [],
  products: [],
  setCart: () => {},
  setProducts: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [setProducts]);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);

      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const values = useMemo(
    () => ({
      addToCart,
      cart,
      products,
      setCart,
      setProducts,
    }),
    [addToCart, cart, products],
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
