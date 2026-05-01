import "./Navbar.scss";
import NotificationIcon from "../../assets/notification-icon.svg";
import NotificationUnreadIcon from "../../assets/notification-unread-icon.svg";
import SearchIcon from "../../assets/search-icon.svg";
import Hamburger from "../../assets/hamburger.svg";
import { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        sidebarRef.current &&
        !(sidebarRef.current as any).contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  function hanldeHamburgerClick() {
    setIsOpen(true);
  }

  return (
    <>
    <div className={`overlay ${isOpen ? "show" : ""}`} />
    <div
      ref={sidebarRef}
      className={`sbar ${isOpen ? "open" : ""}`}
    >
      <Sidebar />
    </div>
    <div className="navbar-container">
      <div className="navbar-container__left">
        <div className="hamburger" onClick={hanldeHamburgerClick}>
          <img src={Hamburger} alt="hamburger" />
        </div>
        <div className="navbar-container__search-bar" tabIndex={0}>
          <img src={SearchIcon} alt="search-icon" />
          <div className="placeholder-text">Search tasks, goals, or metrics...</div>
        </div>
      </div>
      <div className="navbar-container__notification">
        <img src={NotificationIcon} alt="notification" />
        <img className="notification-unread" src={NotificationUnreadIcon} alt="notification-unread" />
      </div>
    </div>
    </>
  );
}