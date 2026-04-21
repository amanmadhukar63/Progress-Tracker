import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

export default function MainLayout() {
  return (
    <>
      <div className="main-layout">
        <div className="main-layout__sidebar">
          <Sidebar />
        </div>
        <div className="main-layout__content">
          <div className="main-layout__navbar">
            <Navbar />
          </div>
          <main className="main-layout__main">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}