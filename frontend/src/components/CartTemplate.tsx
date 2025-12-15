//import "./Cart.css";
import { useCart } from "./CartContext"; // adjust path
import { useState } from "react";
// import UserID from "./LoginID" // if you still need this
import '../cssFiles/CartTemplate.css'
import {useNavigate} from 'react-router'
import register from './Register'

//replacing missing data with -1, will never happen because you cannot add courses with missing data in them

const CartTemplate = () => {
  const [error, setError] = useState('')
  const { cartCourses, RemoveCourseFromCart } = useCart();
  const nav = useNavigate();
  const [removingIds, setRemovingIds] = useState<number[]>([]);

  const toCourseInfo = (id: number) => {
    nav('/CourseInfo',{state:{code:id}});
  };
const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();   // stops reload
    if (await register(localStorage.getItem('UserID'), cartCourses.map(course => course.id))) {
      setError("Registration Successful!");
      localStorage.setItem('cart', '')
      nav('/RegisteredCourses')
    } else {
      setError("Registration Failed. Please try again.");
    }
};

  const handleRemove = (courseCode: number) => {
    // mark as "removing" so we can animate it
    setRemovingIds(prev => [...prev, courseCode]);

    // wait for CSS animation to finish, THEN actually remove from cart
    setTimeout(() => {
      RemoveCourseFromCart(courseCode);
      setRemovingIds(prev => prev.filter(code => code !== courseCode));
    }, 300); // this timeout must match your CSS animation duration
  };

  return (
    <div className="cartDisplay">
      <form onSubmit={handleRegister}>
        <h1>Cart</h1>
        <div className="courseBlock">
          <form>
            {cartCourses.length === 0 && <p>No courses in cart.</p>}

            {cartCourses.map(course => (
              
              <div key={course.id}>
                <div
                  className={`courseDisplay ${
                    removingIds.includes(course.coursecode ?? -1) ? "removing" : ""
                  }`}
                >
                  
                  <form>
                    <h2
                      onClick={() => toCourseInfo(course.coursecode ?? -1)}
                      style={{ cursor: "pointer" }}
                    >
                      {course.department}
                      {course.coursecode}: {course.title}
                    </h2>
                    <div className="buttonRow">
                      <button
                        type="button"
                        onClick={() => handleRemove(course.coursecode ?? -1)}
                      >
                        Remove
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ))}
          </form>
        </div>
        <div className="register-button">
          <button>Register</button>
        </div>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default CartTemplate;
