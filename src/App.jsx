import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import { ProtectedRoute } from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
import Signup from "./pages/Signup";
import AppRoot from "./ui/AppRoot";

import UserAppLayout from "./ui/UserAppLayout";
import Spinner from "./ui/Spinner";
import { useRole } from "./context/RoleContext";
import Home from "./pages/Home";
import GiveRating from "./features/ratings/GiveRating";

function App() {
  const { role } = useRole();
  return (
    <DarkModeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes basename="/tothepoint_login">
          <Route
            element={
              <ProtectedRoute>
                <AppRoot />
              </ProtectedRoute>
            }
            path="/"
          >
            <Route index element={<Navigate replace to={role} />} />
            {role === "admin" && (
              <Route element={<AppLayout />} path="admin">
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="bookings/:bookingId" element={<Booking />} />
                <Route path="checkin/:bookingId" element={<Checkin />} />
                <Route path="cabins" element={<Cabins />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
                <Route path="account" element={<Account />} />
              </Route>
            )}
            {role == "user" && (
              <Route element={<UserAppLayout />} path="user">
                <Route index element={<Navigate replace to="home" />} />
                <Route path="home" element={<Home />} />
                <Route path="cabins" element={<Cabins role={role} />} />
                <Route path="bookings" element={<Bookings role={role} />} />
                <Route path="rating" element={<GiveRating />} />
                <Route path="account" element={<Account />} />
                <Route path="bookings/:bookingId" element={<Booking />} />
              </Route>
            )}
            <Route path="*" element={role ? <PageNotFound /> : <Spinner />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </DarkModeProvider>
  );
}

export default App;
