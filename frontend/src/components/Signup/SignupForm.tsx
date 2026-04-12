import "./SignupForm.scss";

export default function SignupForm() {

  return (
    <div className="signup-form-container">
      <div className="signup-form-logo-container">
        <div className="signup-form-logo">Momentum</div>
        <div className="signup-form-logo-subtext">Precision Workplace</div>
      </div>
      <div className="signup-form-sub-container">
        <div className="signup-form-sub-container__title-container">
          <div className="signup-form-sub-container__title">Create an account</div>
          <p>Start your journey with The Digital Architect.</p>
        </div>

        <form className="form">
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
        </form>

      </div>
    </div>
  );
}