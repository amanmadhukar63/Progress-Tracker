import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import SignupPage from "../pages/SignupPage/SignupPage";
import HomePage from "../pages/HomePage/HomePage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import GoalsPage from "../pages/GoalsPage/GoalsPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/goals" element={<GoalsPage />} />
        </Route>
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}