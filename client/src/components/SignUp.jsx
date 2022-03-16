import axios from "axios";
import { useState } from "react";

function SignUp(props) {
  // Backend provides default value of false for membership
  const [newAccount, setNewAccount] = useState({
    username: "",
    password: "",
    fullName: "",
  });
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/users/sign-up", newAccount).then((results) => {
      // If errors are returned, print them.
      if (results.data.errors) {
        setErrors(results.data.errors);
      } else {
        window.location.reload();
      }
    });
  };

  return (
    <div className="formBackdrop">
      <form className="SignUp" onSubmit={(e) => handleSubmit(e)}>
        <p
          className="close-icon"
          onClick={() => props.setShowSignUpForm(false)}
        >
          X
        </p>
        <p>Create New Account</p>
        <br />

        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          placeholder="Enter Full Name"
          onChange={(e) =>
            setNewAccount({ ...newAccount, [e.target.id]: e.target.value })
          }
          minLength="5"
          maxLength="100"
          required
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter Username"
          onChange={(e) =>
            setNewAccount({ ...newAccount, [e.target.id]: e.target.value })
          }
          minLength="5"
          maxLength="100"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) =>
            setNewAccount({ ...newAccount, [e.target.id]: e.target.value })
          }
          minLength="5"
          maxLength="100"
          required
        />
        {/* Display any returned errors from out API */}
        {errors.map((error, i) => {
          return (
            <p key={i} style={{ color: "red", fontSize: "14px" }}>
              {error.msg}
            </p>
          );
        })}

        <br />
        <input className="btn" type="submit" value="Create Account" />
      </form>
    </div>
  );
}

export default SignUp;
