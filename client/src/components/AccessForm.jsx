import { useState } from "react";
import axios from "axios";

function AccessForm(props) {
  const [accessCode, setAccessCode] = useState({
    accessCode: "",
  });

  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/users/membership/${props._id}/put`, accessCode)
      .then((results) => {
        if (results.data.errors) {
          setErrors(results.data.errors);
        } else {
          window.location.reload();
        }
      });
  };
  return (
    <div className="formBackdrop">
      <form className="AccessForm" onSubmit={(e) => handleSubmit(e)}>
        <p
          onClick={() => props.setShowAccessForm(false)}
          className="close-icon"
        >
          X
        </p>
        <br />
        <label htmlFor="access">Enter Access Code</label>
        <input
          type="text"
          id="access"
          minLength="1"
          onChange={(e) => setAccessCode({ accessCode: e.target.value })}
          required
        />
        {errors.map((error, i) => {
          return (
            <p key={i} style={{ color: "red", fontSize: "14px" }}>
              {error.msg}
            </p>
          );
        })}

        <input className="btn" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default AccessForm;
