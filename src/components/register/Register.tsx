import { useState } from "react";
import { RegisterType } from "../../types/RegisterType";
import { registerUser } from "../../slices/registerSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

export const Register = () => {
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState<RegisterType>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { status, error } = useAppSelector((state) => state.register);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });

    console.log(formState);
  };
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState.password !== formState.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const action = await dispatch(registerUser(formState));
    if (registerUser.fulfilled.match(action)) {
      alert("User registered successfully!");
    } else {
      alert("Failed to register user.");
    }
  };
  return (
    <div className="h-[500px] w-[500px] p-16 rounded-[30px] shadow-lg bg-white my-12 mx-auto">
      <form onSubmit={handleSubmit}>
        <input
          className="w-full mb-2 rounded-md p-2 border border-gray-300"
          type="email"
          placeholder="Email"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
        <input
          className="w-full my-2 rounded-md p-2 border"
          type="password"
          placeholder="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
        />
        <input
          className="w-full my-2 border p-2 rounded-md"
          type="password"
          placeholder="confirm password"
          name="confirmPassword"
          value={formState.confirmPassword}
          onChange={handleChange}
        />
        <button
          className="w-full my-2 border p-2 rounded-md bg-slate-200"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Registering..." : "Register"}
        </button>
        <label>{status === "failed" && <p>{error}</p>}</label>
      </form>
    </div>
  );
};
export default Register;
