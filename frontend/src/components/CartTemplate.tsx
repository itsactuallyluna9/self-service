import { useState } from "react";
import { useCart } from "./CartContext";
import "./CartTemplate.css";
import { useNavigate } from "react-router";

interface CartProps {
  KEYCODE: number;
  TITLE: string;
  DEPARTMENT: string;
  COURSECODE: number;
}

const CartTemplate = () => {
  const { cartCourses, RemoveCourseFromCart } = useCart();
  const nav = useNavigate();
  const [removingIds, setRemovingIds] = useState<number[]>([]);

  const toCourseInfo = (KEYCODE: number) => {
    nav("/CourseInfo", { state: { code: KEYCODE } });
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
      <form>
        <h1>Cart</h1>
        <div className="courseBlock">
          <form>
            {cartCourses.length === 0 && <p>No courses in cart.</p>}

            {cartCourses.map(course => (
              
              <div key={course.KEYCODE}>
                <div
                  className={`courseDisplay ${
                    removingIds.includes(course.COURSECODE) ? "removing" : ""
                  }`}
                >
                  
                  <form>
                    <h2
                      onClick={() => toCourseInfo(course.COURSECODE)}
                      style={{ cursor: "pointer" }}
                    >
                      {course.DEPARTMENT}
                      {course.COURSECODE}: {course.TITLE}
                    </h2>
                    <div className="buttonRow">
                      <button
                        type="button"
                        onClick={() => handleRemove(course.COURSECODE)}
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
      </form>
    </div>
  );
};

export default CartTemplate;
