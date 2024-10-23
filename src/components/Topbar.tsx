import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const Navigate = useNavigate();

  return (
    <nav className="flex justify-between px-2 h-12 shadow-lg font-roboto ">
      <div className="my-3">top bar</div>
      <div className="flex justify-between mx-2 gap-2">
        <button
          className="my-2 rounded-lg px-2 bg-slate-200"
          onClick={() => {
            Navigate("/login");
          }}
        >
          login
        </button>
        <button
          className=" my-2 rounded-lg px-2 bg-slate-200"
          onClick={() => Navigate("/register")}
        >
          Register
        </button>
      </div>
    </nav>
  );
};
export default Topbar;
