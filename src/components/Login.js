import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/add");
    }
  }, []);
  async function loginHandle() {
    console.log(email, password);
    let item = { email, password };
    let result = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    result = await result.json();
    console.log(result);
    if (result.email === email) {
      localStorage.setItem("user-info", JSON.stringify(result));
      navigate("/");
    } else {
      document.getElementById("error").innerHTML = result.errors;
    }
  }
  return (
    <div>
      <Header />
      <div className="col-sm-6 offset-sm-3">
        <br />

        <h1>User Login </h1>
        <span style={{ color: "red" }} id="error"></span>
        <br />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Password"
        />
        <br />
        <button onClick={loginHandle} className="btn btn-primary">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
