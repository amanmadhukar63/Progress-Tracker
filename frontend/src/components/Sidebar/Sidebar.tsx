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
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function Sidebar(){

  const navigate = useNavigate();
  const { clearLocalStorage } = useLocalStorage();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: DashboardIcon
    },

    {
      title: "Goals",
      path: "/goals",
      icon: GoalIcon
    },
    {
      title: "Tasks",
      path: "/tasks",
      icon: TaskIcon
    },
    {
      title: "Calender",
      path: "/calender",
      icon: CalendarIcon
    },
    {
      title: "Profile",
      path: "/profile",
      icon: ProfileIcon
    },
  ];

  const ctas = [
    {
      title: "Settings",
      path: "/settings",
      icon: SettingIcon
    },
  ];

  function moveToPage(path: string) {
    navigate(path);
  }

  function logoutHandler() {
    clearLocalStorage();
    navigate("/");
  }

  return (
    <div className="sidebar-container">
      <div className="sidebar-container__logo-container" onClick={() => moveToPage("/")}>
        <div className="logo">Momentum</div>
        <div className="description">Precision Workspace</div>
      </div>
      <div className="sidebar-container__menu-container">
        {
          menuItems.map((menuItem, ind) => (
            <MenuItem
              key={ind}
              title={menuItem.title}
              onClick={() => moveToPage(menuItem.path)}
              icon={menuItem.icon}
              active={window.location.pathname === menuItem.path}
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
          ctas.map((cta, ind) => (
            <MenuItem
              key={ind}
              title={cta.title}
              onClick={() => moveToPage(cta.path)}
              icon={cta.icon}
              active={window.location.pathname === cta.path}
            />
          ))
        }
        <MenuItem
          key={-1}
          title={"Logout"}
          onClick={logoutHandler}
          icon={LogoutIcon}
        />
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