import "./Sidebar.scss";

export default function Sidebar(){
  return (
    <div className="sidebar-container">
      <div className="sidebar-container__logo-container">
        <div className="logo">Momentum</div>
        <div className="description">Precision Workspace</div>
      </div>
      <div className="sidebar-container__menu-container">
        Menu
      </div>
      <div className="sidebar-container__button-container">
        Button
      </div>
      <div className="sidebar-container__cta-container">
        action
      </div>
      <div className="sidebar-container__user-container">
        User
      </div>
    </div>
  );
}