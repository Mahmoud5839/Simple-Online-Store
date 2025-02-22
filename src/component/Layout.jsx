import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

function Layout({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="layout">
      <nav className="mainNav">
        <Link to="/">Products</Link>

        {!isLoggedIn ? (
          <div style={{ display: "flex", gap: "2rem" }}>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        ) : (
          <div className="user-controls">
            <div className="username">
              <span>👤</span>
              <span>{user?.name || "User"}</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              <FiLogOut />
            </button>
          </div>
        )}
      </nav>
      {children}
    </div>
  );
}

export default Layout;
