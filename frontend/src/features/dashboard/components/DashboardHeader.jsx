import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";

const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const name = user?.username || "User";
  const email = user?.email || "";
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="dashboard-header glass">
      <h2 className="logo">HireMind AI</h2>

      <div className="profile">
        {/* Avatar */}
        <div className="avatar" onClick={() => setOpen(!open)}>
          {initial}
        </div>

        {/* Dropdown */}
        {open && (
          <div className="dropdown glass">
            <p className="username">{email}</p>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
