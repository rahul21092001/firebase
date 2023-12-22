import "./signup.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { NavLink , useNavigate} from "react-router-dom";
import { auth , provider } from "../firebase";
import { createUserWithEmailAndPassword , signInWithPopup  } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

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

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(user);
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/login");   
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const googlehandler = async() => {
    try {
      const res = await signInWithPopup(auth, provider);
      localStorage.setItem("token", res.user.accessToken);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/");   
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="Login-form">
        <h3>Signup Here</h3>

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

        <button type="submit" className="login-button" onClick={handleSignup}>
          Signup
        </button>

        <br />
        <button className="google-button" onClick={googlehandler}>
          <FcGoogle />
          <span> Signup with Google</span>
        </button>

        <p className="link">
          Already have an account?
          <NavLink to={"/"} className="link" >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
