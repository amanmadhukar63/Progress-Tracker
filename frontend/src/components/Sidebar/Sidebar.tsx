import MenuItem from "../MenuItem/MenuItem";
import "./Sidebar.scss";
import DashboardIcon from "../../assets/dashboard-icon.svg";
import GoalIcon from "../../assets/goal-icon.svg";
import TaskIcon from "../../assets/task-icon.svg";
import CalendarIcon from "../../assets/calendar-icon.svg";
import ProfileIcon from "../../assets/profile-icon.svg";
import SettingIcon from "../../assets/setting-icon.svg";
import LogoutIcon from "../../assets/logout-icon.svg";
import Button from "../Button/Button";

const menuItems = [
  {
    title: "Dashboard",
    onClick: () => {
      console.log("Clicked...");
    },
    icon: DashboardIcon
  },

  {
    title: "Goals",
    onClick: () => {
      console.log("Clicked...");
    },
    icon: GoalIcon
  },
  {
    title: "Tasks",
    onClick: () => {
      console.log("Clicked...");
    },
    icon: TaskIcon
  },
  {
    title: "Calender",
    onClick: () => {
      console.log("Clicked...");
    },
    icon: CalendarIcon
  },
  {
    title: "Profile",
    onClick: () => {
      console.log("Clicked...");
    },
    icon: ProfileIcon
  },
];

const ctas = [
  {
    title: "Settings",
    onClick: () => {
      console.log("Clicked...");
    },
    icon: SettingIcon
  },

  {
    title: "Logout",
    onClick: () => {
      console.log("Clicked...");
    },
    icon: LogoutIcon
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
        <Button
          title={"New Goal"}
          type="button"
          style={{
            padding: "10px",
            borderRadius: "12px",
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: "700",
            flex: "1",
          }}
        />
      </div>
      <div className="sidebar-container__cta-container">
        {
          ctas.map((menuItem, ind) => (
            <MenuItem
              key={ind}
              title={menuItem.title}
              onClick={menuItem.onClick}
              icon={menuItem.icon}
            />
          ))
        }
      </div>
      <div className="sidebar-container__user-container">
        <div className="profile-picture">A</div>
        <div className="profile-info">
          <div className="profile-name">Aman Madhukar</div>
          <div className="plan-name">Pro Plan</div>
        </div>
      </div>
    </div>
  );
}