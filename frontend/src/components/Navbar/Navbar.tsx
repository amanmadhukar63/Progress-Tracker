import "./Navbar.scss";
import NotificationIcon from "../../assets/notification-icon.svg";
import NotificationUnreadIcon from "../../assets/notification-unread-icon.svg";
import SearchIcon from "../../assets/search-icon.svg";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-container__search-bar">
        <img src={SearchIcon} alt="search-icon" />
        <div className="placeholder-text">Search tasks, goals, or metrics...</div>
      </div>
      <div className="navbar-container__notification">
        <img src={NotificationIcon} alt="notification" />
        <img className="notification-unread" src={NotificationUnreadIcon} alt="notification-unread" />
      </div>
    </div>
  );
}