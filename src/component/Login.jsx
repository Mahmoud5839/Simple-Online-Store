import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (data) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === data.email && user.password === data.password) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      setErrorMessage(
        "The email you entered is not registered. Please try again or register below."
      );
    }
  };

  return (
    <div className="login-page">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
        />
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
        />
        <button type="submit" style={{ width: "100%" }}>
          Login
        </button>
      </form>

      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
          <button
            onClick={() => navigate("/register")}
            style={{ width: "100%" }}
          >
            Go to Registration Page
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
