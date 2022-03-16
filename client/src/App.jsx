import { useState } from "react";
import "./scss/App.scss";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  const [user, setUser] = useState(null);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  return (
    <div className="App">
      <header>
        <h1>Members Only</h1>
      </header>
      <main>
        <aside className="sideBar">
          <button onClick={() => setShowSignInForm(true)}>Sign In</button>
          <button onClick={() => setShowSignUpForm(true)}>
            Create Account
          </button>
          {user ? <button>Sign Out</button> : null}
        </aside>

        <aside className="mainContent">
          <h2>{user ? `Hello ${user.name}` : "Please sign in"}</h2>

          <div className="messageContainer">Messages Go Here</div>
        </aside>
      </main>
      {/* Form Components */}
      {showSignInForm ? <SignIn /> : null}
      {showSignUpForm ? <SignUp /> : null}
    </div>
  );
}

export default App;
