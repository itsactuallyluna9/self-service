//import "./Cart.css";
import { useCart } from "./CartContext"; // adjust path
// import UserID from "./LoginID" // if you still need this
import './CartTemplate.css'

interface CartProps { // edit later to have full info
    KEYCODE : string,
    TITLE : string,
    DEPARTMENT : string,
    COURSECODE : number,
}

const CartTemplate = () => {
  const { cartCourses, RemoveCourseFromCart, AddCourseToCart } = useCart();

  

  return (
    <div className="cartDisplay">
      <form>
      <h1>Cart</h1>

      {cartCourses.length === 0 && <p>No courses in cart.</p>}

      {cartCourses.map(course => (
        <div key={course.KEYCODE}>
          <div className= 'courseDisplay'>
            <h2>{course.DEPARTMENT}
            {course.COURSECODE}: 
            {course.TITLE}</h2>
            <button onClick={() => RemoveCourseFromCart(course.COURSECODE)}>Remove</button>
            </div>
          </div>
      ))}
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