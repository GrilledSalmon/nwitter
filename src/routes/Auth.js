import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [errorMsg, setErrorMsg] = useState();
  const auth = authService.getAuth();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // 새로고침 되는 거 막아줌
    try {
      let data;
      if (newAccount) {
        // create account
        console.log(email, password);
        data = await authService.createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        // log in
        data = await authService.signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }
      console.log(data);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new authService.GoogleAuthProvider();
    } else {
      console.log("What is it..?");
    }
    const data = await authService.signInWithPopup(auth, provider);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
        />
        <input
          onChange={onChange}
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Log In"}
        />
      </form>
      {errorMsg}
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <button name="google" onClick={onSocialClick}>
        {" "}
        Continue with Google{" "}
      </button>
    </div>
  );
};
export default Auth;
