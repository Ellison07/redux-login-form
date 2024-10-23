import { loginUser } from "../../slices/loginSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginType } from "../../types/LoginType";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState<LoginType>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { status, error } = useAppSelector((state) => state.login);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const action = await dispatch(loginUser(formState));
    if (loginUser.fulfilled.match(action)) navigate("/");
    else navigate("/");
  };
  return (
    <div className="h-[500px] w-[500px] p-16 rounded-[30px] shadow-lg bg-white my-12 mx-auto">
      <form onSubmit={handleSubmit}>
        <input
          className="w-full mb-2 p-2 rounded-md border border-gray-300"
          type="text"
          placeholder="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
        <input
          className="w-full my-2 border rounded-md p-2 mb-2"
          type={showPassword ? "text" : "password"}
          placeholder="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
        />
        <button className="w-full my-2 border rounded-lg p-2 mb-2">
          {status === "loading" ? "logging in.." : "Login"}
        </button>
        <label className="my-2">
          <input
            type="checkbox"
            onChange={() => setShowPassword((prev) => !prev)}
          />
          show password
        </label>
      </form>
      {status === "failed" && <p>{error}</p>}
    </div>
  );
};

export default Login;
