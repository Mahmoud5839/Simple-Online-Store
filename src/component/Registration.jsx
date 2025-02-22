import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const cities = [
  "Select City",
  "Cairo",
  "Alexandria",
  "Giza",
  "Sharm El Sheikh",
  "Luxor",
  "Kafr El Dawwar",
  "Aswan",
  "New Nubaria City ",
  "Burg Elarab",
  "Elsadat City",
];

export default function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    navigate("/login");
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name", { required: true })}
        placeholder="Full Name"
        style={{ border: errors.name ? "solid 1px red" : "" }}
      />

      <input
        type="email"
        {...register("email", { required: true })}
        placeholder="Email"
        style={{ border: errors.email ? "solid 1px red" : "" }}
      />

      <select
        {...register("city")}
        style={{ border: errors.city ? "solid 1px red" : "" }}
      >
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <input type="password" {...register("password")} placeholder="Password" />

      <button type="submit" style={{ width: "100%" }}>
        Register
      </button>
    </form>
  );
}
