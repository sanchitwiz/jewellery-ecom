import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

// Define product and context types
type Product = {
  _id: string;
  name: string;
  price: number;
  quantity?: number; // Optional because it might not exist initially
};

type StateContextType = {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
  totalPrice: number;
  totalQty: number;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: Product, quantity: number) => void;
  toggleCartItemQuantity: (id: string, value: 'inc' | 'dec') => void;
  onRemove: (product: Product) => void;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  setTotalQty: React.Dispatch<React.SetStateAction<number>>;
};

// Create context
const Context = createContext<StateContextType | undefined>(undefined);

// Define the provider component
export const StateContext: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [qty, setQty] = useState(1);

  const onAdd = (product: Product, quantity: number) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQty((prevTotalQty) => prevTotalQty + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) =>
        cartProduct._id === product._id
          ? { ...cartProduct, quantity: (cartProduct.quantity || 0) + quantity }
          : cartProduct
      );

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${quantity} ${product.name} added to the cart.`);
  };

  const onRemove = (product: Product) => {
    const foundProduct = cartItems.find((item) => item._id === product._id);
    if (!foundProduct) return;

    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * (foundProduct.quantity || 0));
    setTotalQty((prevTotalQty) => prevTotalQty - (foundProduct.quantity || 0));
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id: string, value: 'inc' | 'dec') => {
    const foundProduct = cartItems.find((item) => item._id === id);
    if (!foundProduct) return;

    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: (foundProduct.quantity || 0) + 1 }]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQty((prevTotalQty) => prevTotalQty + 1);
    } else if (value === 'dec' && (foundProduct.quantity || 0) > 1) {
      setCartItems([...newCartItems, { ...foundProduct, quantity: (foundProduct.quantity || 0) - 1 }]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
      setTotalQty((prevTotalQty) => prevTotalQty - 1);
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        totalQty,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setTotalPrice,
        setTotalQty,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = (): StateContextType => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useStateContext must be used within a StateContext Provider');
  }
  return context;
};
