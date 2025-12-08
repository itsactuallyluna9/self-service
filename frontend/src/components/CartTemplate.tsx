import "./Cart.css";
import { useCart } from "./CartContext"; // adjust path
// import UserID from "./LoginID" // if you still need this


interface CartProps { // edit later to have full info
    COURSECODE : string,
    TITLE : string,
    PROFESSOR : string,

}

const CartTemplate = () => {
  const { cartCourses, RemoveCourseFromCart, AddCourseToCart } = useCart();

  

  return (
    <div className="cartDisplay">
      <h1>Cart</h1>

      

      {cartCourses.length === 0 && <p>No courses in cart.</p>}

      {cartCourses.map(course => (
        <div key={course.KEYCODE} className = 'course-card'>
            <h2>{course.DEPARTMENT}{course.COURSECODE}: {course.TITLE}</h2>
            <p>Professor: {course.PROFESSOR}</p>
            <p>Academic Year: {course.ACADEMICYEAR}</p>
            <p>Block: {course.BLOCKNUM}</p>
            <p>Seats Available: {course.SEATS}</p>
            <p>Credits: {course.CREDITS}</p>
            {course.FEE !== null && (
                    <p>Fees: ${course.FEE}</p>
                )}
                {course.FEE == null && (
                    <p>No Fees</p>
                )}
            <button onClick={() => RemoveCourseFromCart(course.COURSECODE)}>
            Remove
          </button>
          </div>
      ))}
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