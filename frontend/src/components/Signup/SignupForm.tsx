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
            <label className="form__label">Full Name</label>
            <input 
              id="fullName"
              name="fullName"
              placeholder="Aman Madhukar"
              className="form__input" 
              type="text"
              required
            />
            <p className="form__error"></p>
          </div>
        </form>

      </div>
    </div>
  );
}