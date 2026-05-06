import type React from "react";
import Button from "../Button/Button";
import "./SignupForm.scss";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { BACKEND_BASE_URL } from "../../vite-env.d";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { toast } from "sonner";

export default function SignupForm() {

  const { setUser } = useLocalStorage();
  const navigate = useNavigate();
  const { execute, loading, error } = useFetch(`${BACKEND_BASE_URL}/api/user/signup`, { skip: true });

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>){
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const payload = {
        name: formData.get("fullName") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        // terms: formData.get("terms") === "on",
      };
  
      const { data } = await execute({
        method: "POST",
        body: payload,
      });
  
      toast.success("Signed Up Successfully");
  
      setUser(data);
      navigate("/dashboard");
    } catch (err) {
      toast.error(error);
      console.error(err);
    }
  }

  return (
    <div className="signup-form-container">
      {loading && <LoadingPage />}
      <div className="signup-form-logo-container">
        <div className="signup-form-logo">Momentum</div>
        <div className="signup-form-logo-subtext">Precision Workplace</div>
      </div>
      <div className="signup-form-sub-container">
        <div className="signup-form-sub-container__title-container">
          <div className="signup-form-sub-container__title">Create an account</div>
          <p>Start your journey with The Digital Architect.</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form__field">
            <label htmlFor="fullName" className="form__label">Full Name</label>
            <input 
              id="fullName"
              name="fullName"
              placeholder="Aman Madhukar"
              className="form__input" 
              type="text"
              required
            />
            {false && <p className="form__error">Error</p>}
          </div>

          {/* Email */}
          <div className="form__field">
            <label htmlFor="email" className="form__label">Email</label>
            <input 
              id="email"
              name="email"
              placeholder="aman@example.com"
              className="form__input" 
              type="email"
              required
            />
            {false && <p className="form__error"></p>}
          </div>

          {/* Password */}
          <div className="form__field">
            <label htmlFor="email" className="form__label">Password</label>
            <input 
              id="password"
              name="password"
              placeholder="••••••••"
              className="form__input" 
              type="password"
              required
            />
            {false && <p className="form__error"></p>}
          </div>

          {/* Terms and Condition */}
          <div className="form__terms-field">
            <input id="terms" className="terms-input" type="checkbox" />
            <label htmlFor="terms" className="terms-label">I agree to the Terms of Service and Privacy Policy.</label>
          </div>

          {/* Submit */}
          <div className="form__field">
            <Button 
              title={"Create Workspace"}
              type="submit"
            />
          </div>
        </form>

        <div className="old-user-container">
          Already have an account? 
          <span>
            <Link to={"/login"}>
              Login
            </Link>
          </span>
        </div>

      </div>
    </div>
  );
}