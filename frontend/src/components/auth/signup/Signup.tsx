// src/components/auth/signup/Signup.tsx
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import auth from "../../../services/auth";
import "./Signup.css";

interface SignupForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function Signup(): JSX.Element {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function submit(data: SignupForm) {
    try {
      await auth.signup(data, dispatch);
      navigate("/home");
    } catch (err: any) {
      alert("Signup failed: " + (err.response?.data?.message || err.message));
    }
  }

  return (
    <div className="Signup">
      <form onSubmit={handleSubmit(submit)}>
        <h2>Sign Up</h2>

        <label>First Name:</label>
        <input {...register("firstName", { required: true })} />
        {errors.firstName && <span>First name is required.</span>}

        <label>Last Name:</label>
        <input {...register("lastName", { required: true })} />
        {errors.lastName && <span>Last name is required.</span>}

        <label>Email:</label>
        <input type="email" {...register("email", { required: true })} />
        {errors.email && <span>Email is required.</span>}

        <label>Password:</label>
        <input type="password" {...register("password", { required: true, minLength: 4 })} />
        {errors.password && <span>Password must be at least 4 characters.</span>}

        <button>Sign Up</button>
        <p>
          Already have an account? <a href="/login">Log in here</a>
        </p>
      </form>
    </div>
  );
}
