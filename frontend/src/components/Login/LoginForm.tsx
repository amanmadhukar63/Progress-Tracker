import type React from "react";
import Button from "../Button/Button";
import "./LoginForm.scss";
import { Link } from "react-router-dom";

export default function LoginForm() {

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      terms: formData.get("terms") === "on",
    };

    console.log(data);
  }

  return (
    <div className="login-form-container">
      <div className="login-form-logo-container">
        <div className="login-form-logo">Momentum</div>
        <div className="login-form-logo-subtext">Precision Workplace</div>
      </div>
      <div className="login-form-sub-container">
        <div className="login-form-sub-container__title-container">
          <div className="login-form-sub-container__title">Welcome back</div>
          <p>Continue your journey with The Digital Architect.</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {/* Full Name */}
          {/* <div className="form__field">
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
          </div> */}

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

        <div className="new-user-container">
          Don't have an account? 
          <span>
            <Link to={"/signup"}>
              SignUp
            </Link>
          </span>
        </div>

      </div>
    </div>
  );
}