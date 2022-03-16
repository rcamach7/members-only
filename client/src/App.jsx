import { useState, useEffect } from "react";
import "./scss/App.scss";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AccessForm from "./components/AccessForm";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showAccessForm, setShowAccessForm] = useState(false);

  // On boot up - retrieve user if he's signed in.
  useEffect(() => {
    axios.get("/users/").then((results) => {
      if (results.data.user !== undefined) {
        setUser(results.data.user);
      }
    });
  }, []);

  const handleSignOut = () => {
    axios.get("/users/log-out").then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="App">
      <header>
        <h1>Members Only</h1>
      </header>
      <main>
        <aside className="sideBar">
          {user ? null : (
            <button onClick={() => setShowSignInForm(true)}>Sign In</button>
          )}
          {user ? null : (
            <button onClick={() => setShowSignUpForm(true)}>
              Create Account
            </button>
          )}
          {user ? (
            <button onClick={() => handleSignOut()}>Sign Out</button>
          ) : null}

          {user && !user.membership ? (
            <button onClick={() => setShowAccessForm(true)}>
              Enter Access Code
            </button>
          ) : null}
        </aside>

        <aside className="mainContent">
          <h2>{user ? `Hello ${user.fullName}` : "Please sign in"}</h2>

          <div className="messageContainer">Messages Go Here</div>
        </aside>
      </main>
      {/* Form Components */}
      {showSignInForm ? <SignIn setShowSignInForm={setShowSignInForm} /> : null}
      {showSignUpForm ? <SignUp setShowSignUpForm={setShowSignUpForm} /> : null}
      {showAccessForm ? (
        <AccessForm _id={user._id} setShowAccessForm={setShowAccessForm} />
      ) : null}
    </div>
  );
}

export default App;
