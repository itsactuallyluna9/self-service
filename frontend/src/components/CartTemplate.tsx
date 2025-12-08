//import "./Cart.css";
import { useCart } from "./CartContext"; // adjust path
import { useState } from "react";
// import UserID from "./LoginID" // if you still need this
import './CartTemplate.css'
import {useNavigate} from 'react-router'
import register from './Register'
import LoginID from "./LoginID";

interface CartProps { // edit later to have full info
    KEYCODE : string,
    TITLE : string,
    DEPARTMENT : string,
    COURSECODE : number,
}



const CartTemplate = () => {
  const [error, setError] = useState('')

  const { cartCourses, RemoveCourseFromCart, AddCourseToCart } = useCart();
  const nav = useNavigate()
  const toCourseInfo = (KEYCODE: number) => {
    nav('/CourseInfo',{state:{code:KEYCODE}});
  };

const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();   // stops reload
    if (await register(LoginID.id, cartCourses.map(course => course.KEYCODE))) {
      setError("Registration Successful!");
    } else {
      setError("Registration Failed. Please try again.");
    }
};

  

  return (
    <div className="cartDisplay">
      <form onSubmit={handleRegister}>
      <h1>Cart</h1>
      <div className="courseBlock">
        <form>

      {cartCourses.length === 0 && <p>No courses in cart.</p>}

      {cartCourses.map(course => (
        <div key={course.KEYCODE}>
          <div className= 'courseDisplay'>
            <form>
              <h2 onClick= { 
                () => toCourseInfo(course.COURSECODE)} 
                style={{ cursor: "pointer"}}>
                  {course.DEPARTMENT}
                  {course.COURSECODE}: {course.TITLE}
                  </h2>
              <div className="buttonRow">
                <button onClick={() => RemoveCourseFromCart(course.COURSECODE)}>Remove</button>
              </div>
            </form>
            </div>
          </div>
      ))}
      </form>
      </div>
        <button className="register-buttton">Register</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default CartTemplate;



/*return (
        <div className="cartDisplay">
            {setcoursesInCart(localStorage.getItem(""))}
            <h1>Cart</h1>
            {coursesInCart.length === 0 && <p>No courses in cart.</p>}
            <button onClick={() => addExampleCourse()}>
              Remove
            </button>
            {coursesInCart.map(course => (
          <div key={course.COURSECODE}>
            <p>{course.TITLE}</p>
            <p>{course.PROFESSOR}</p>
            <button onClick={() => removeCourseFromCart(course.COURSECODE)}>
              Remove
            </button>
            <hr />
          </div>
        ))}
        </div>
    );*/