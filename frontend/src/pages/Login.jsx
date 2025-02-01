import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendURL } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const [captchaToken, setCaptchaToken] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!captchaToken) {
        toast.error("Please complete the CAPTCHA to proceed.");
        return;
      }

      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendURL}/api/user/register`, {
          name,
          email,
          password,
          captchaToken,
          headers: { token },
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("email", email);
          localStorage.setItem("psw", password);

          toast.success("Welcome " + name + " !");
          toast.success("You are successfully registered!");
        } else {
          toast.error(response.data.message);
        }
      } else if (currentState === "Login") {
        const response = await axios.post(`${backendURL}/api/user/login`, {
          email,
          password,
          captchaToken,
          headers: { token },
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("email", email);
          localStorage.setItem("psw", password);

          toast.success("Welcome Back!");
        } else {
          toast.error(response.data.message);
        }
      } else if (currentState === "Forgot Password") {
        const response = await axios.get(
          `${backendURL}/api/user/forgot-password?email=${encodeURIComponent(
            email
          )}&captchaToken=${captchaToken}`
        );
        if (response.data.success) {
          toast.info("User was successfully identified.");
          toast.warn("But not SMTP servers are supported for free anymore.");
          toast.info("Can't reset password in this time");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Sign Up" && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      {currentState !== "Forgot Password" && (
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          required
        />
      )}
      <div className="w-full flex justify-between text-sm mt-2">
        {currentState === "Login" ? (
          <>
            <p
              onClick={() => setCurrentState("Forgot Password")}
              className="cursor-pointer"
            >
              Forgot your password?
            </p>
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer"
            >
              Create account
            </p>
          </>
        ) : currentState === "Sign Up" ? (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Back to Login
          </p>
        )}
      </div>
      <ReCAPTCHA
        sitekey={recaptchaSiteKey}
        onChange={(token) => setCaptchaToken(token)}
        onExpired={() => setCaptchaToken("")}
      />
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login"
          ? "Sign In"
          : currentState === "Sign Up"
          ? "Sign Up"
          : "Reset Password"}
      </button>
    </form>
  );
};

export default Login;
