import MenuItem from "../MenuItem/MenuItem";
import "./Sidebar.scss";
import DashboardIcon from "../../assets/dashboard-icon.svg";

const menuItems = [
  {
    title: "Dashboard",
    onClick: () => {
      console.log("Clicked...");
    },
    icon: DashboardIcon
  },
];

export default function Sidebar(){
  return (
    <div className="sidebar-container">
      <div className="sidebar-container__logo-container">
        <div className="logo">Momentum</div>
        <div className="description">Precision Workspace</div>
      </div>
      <div className="sidebar-container__menu-container">
        {
          menuItems.map((menuItem, ind) => (
            <MenuItem
              key={ind}
              title={menuItem.title}
              onClick={menuItem.onClick}
              icon={menuItem.icon}
            />
          ))
        }
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