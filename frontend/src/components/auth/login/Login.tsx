import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import LoginModel from "../../../models/user/Login";
import auth from "../../../services/auth";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login(): JSX.Element {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginModel>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function submit(formData: LoginModel) {
    try {
      await auth.login(formData, dispatch);
      navigate("/home");
    } catch (err: any) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="login-form">
      <h2>Login</h2>

      <div className="form-group">
        <label>Email:</label>
        <input type="email" {...register("email", { required: true })} />
        {errors.email && <span className="error">Email is required.</span>}
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input type="password" {...register("password", { required: true, minLength: 4 })} />
        {errors.password && <span className="error">Password must be at least 4 characters.</span>}
      </div>

      <button type="submit">Login</button>

      <p>
        Don't have an account? <a href="/signup">Sign up here</a>
      </p>
    </form>

  );
}
