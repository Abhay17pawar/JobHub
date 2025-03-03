import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "../../redux/EmailSlice";
import "./NewsLetter.css";

const Example = () => {
  const dispatch = useDispatch();
  const storedEmail = useSelector((state) => state.email?.value); 

  console.log("Redux Email:", storedEmail);  // Debugging Redux state

  const [inputEmail, setInputEmail] = useState(storedEmail || "");  // Ensure no undefined values

  useEffect(() => {
    console.log("Stored Email Updated:", storedEmail);
    if (storedEmail) {
      setInputEmail(storedEmail);
    }
  }, [storedEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setEmail(inputEmail));
    console.log("Stored Email in Redux after Submit:", inputEmail);
  };

  return (
    <div>
      <div className="card">
        <span className="card__title">Newsletter</span>
        <p className="card__content">
          Get existential crisis delivered straight to your inbox every week.
        </p>
        <form className="card__form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            required
          />
          <button className="card__button" type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
};


export default Example;
