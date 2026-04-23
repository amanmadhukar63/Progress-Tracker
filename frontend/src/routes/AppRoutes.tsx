import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import SignupPage from "../pages/SignupPage/SignupPage";
import HomePage from "../pages/HomePage/HomePage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import GoalsPage from "../pages/GoalsPage/GoalsPage";
import CalenderPage from "../pages/CalenderPage/CalenderPage";
import TasksPage from "../pages/TasksPage/TasksPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SettingsPage from "../pages/SettingsPage/SettingsPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/calender" element={<CalenderPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}