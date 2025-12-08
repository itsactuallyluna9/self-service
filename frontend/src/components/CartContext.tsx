import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import "./Cart.css"; // you probably don't need CSS in the context file, but it's harmless

export interface CourseProps {
    ACADEMICYEAR: number,
    BLOCKNUM: string,
    COURSECODE: string,
    COURSETYPES: null | string,
    CREDITS: number,
    DEPARTMENT: string,
    DESCR: null | string,
    FEE: null | number,
    PROFESSOR: any,
    KEYCODE: number,
    PREREQS: null | string,
    SEATS: number,
    TITLE: string
}

interface CartContextType {
  cartCourses: CourseProps[];
  AddCourseToCart: (course: CourseProps) => boolean;
  RemoveCourseFromCart: (code: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  // initialize from localstorage ONCE
  const [cartCourses, setCartCourses] = useState<CourseProps[]>(() => {
    const stored = localStorage.getItem("cart");
    if (!stored) return [];
    try {
      return JSON.parse(stored) as CourseProps[];
    } catch {
      return [];
    }
  });

  // keep localstorage in sync whenever cartCourses changes
  // JR Waughon: this was the only way i could get the cart to persist
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartCourses));
  }, [cartCourses]);

  const AddCourseToCart = (course: CourseProps): boolean => {
    const exists = cartCourses.some(c => c.COURSECODE === course.COURSECODE);

    if (exists) return false;

    setCartCourses(prev => [...prev, course]);
    return true;
  };


  const RemoveCourseFromCart = (code: string) => {
    setCartCourses(prev => prev.filter(c => c.COURSECODE !== code));
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
