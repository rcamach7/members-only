import axios from "axios";
import { useState } from "react";

function SignIn(props) {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

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
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) =>
            setAccount({ ...account, [e.target.id]: e.target.value })
          }
          required
        />

        <input type="submit" className="btn" style={{ marginTop: "auto" }} />
      </form>
    </div>
  );
}

export default SignIn;
