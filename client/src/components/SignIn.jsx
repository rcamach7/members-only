import axios from "axios";
import { useState } from "react";

function SignIn(props) {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  const [badCredentials, setBadCredentials] = useState(null);

  // Intercept 401 - bad login credentials
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      setBadCredentials(true);
      return Promise.reject(error);
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/users/log-in", account).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="formBackdrop">
      <form className="SignIn" onSubmit={(e) => handleSubmit(e)}>
        <p
          className="close-icon"
          onClick={() => props.setShowSignInForm(false)}
        >
          X
        </p>
        <p>Log In</p>
        <br />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          onChange={(e) =>
            setAccount({ ...account, [e.target.id]: e.target.value })
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
            setAccount({ ...account, [e.target.id]: e.target.value })
          }
          minLength="5"
          maxLength="100"
          required
        />
        {/* Show any errors returned by the API */}
        {badCredentials ? (
          <p style={{ color: "red", fontSize: "13px" }}>No user found</p>
        ) : null}

        <input type="submit" className="btn" style={{ marginTop: "auto" }} />
      </form>
    </div>
  );
}

export default SignIn;
