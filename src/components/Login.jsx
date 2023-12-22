import "./Login.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { NavLink , useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword , GoogleAuthProvider  } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const getUserData = (e) => {
    const { id, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(user);
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((res) => {
        localStorage.setItem("token", res.user.accessToken);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  return (
    <div>
      <div className="Login-form">
        <h3>Login Here</h3>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          required
          value={user.email}
          onChange={getUserData}
        />

        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          id="password"
          required
          value={user.password}
          onChange={getUserData}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="login-eye"
        >
          {showPassword ? (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          )}
        </span>

        <button type="submit" className="login-button" onClick={handleLogin}>
          Log In
        </button>
        <br />
        <br />
        <p>
          not have an account?  
          <NavLink to={"/signup"} className="link">
           Signup
          </NavLink>
        </p>
 
      </div>
      
    </div>
  );
};

export default Login;

