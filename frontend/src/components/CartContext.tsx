import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import "../cssFiles/Cart.css"; // you probably don't need CSS in the context file, but it's harmless


export interface CartProps { // edit later to have full info
    id : number,
    title : string,
    department : string,
    coursecode : number,
    openseats : number,

}

interface CartContextType {
  cartCourses: CartProps[];
  AddCourseToCart: (course: CartProps) => boolean;
  RemoveCourseFromCart: (code: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  // initialize from localstorage ONCE
  const [cartCourses, setCartCourses] = useState<CartProps[]>(() => {
    const stored = localStorage.getItem("cart");
    if (!stored) return [];
    try {
      return JSON.parse(stored) as CartProps[];
    } catch {
      return [];
    }
  });

  // keep localstorage in sync whenever cartCourses changes
  // JR Waughon: this was the only way i could get the cart to persist
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartCourses));
  }, [cartCourses]);

  const AddCourseToCart = (course: CartProps): boolean => {
    const exists = cartCourses.some(c => c.coursecode === course.coursecode);

    if (exists) return false;

    setCartCourses(prev => [...prev, course]);
    return true;
  };


  const RemoveCourseFromCart = (code: number) => {
    setCartCourses(prev => prev.filter(c => c.coursecode !== code));
  };

  return (
    <CartContext.Provider value={{ cartCourses, AddCourseToCart, RemoveCourseFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside a CartContextProvider");
  }
  return ctx;
};
