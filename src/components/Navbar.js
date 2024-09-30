// src/components/Navbar.js
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useLogin } from "../context/LoginContext";
import Login from './Login';

export default function Navbar() {
  const { username, isLoggedIn } = useLogin(); // Use context to get username and login state

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        🕵️‍♂️ encrypt like a spy 📜 write like a poet.
      </Link>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ul>
          <CustomLink to="/haiku">haiku-secret</CustomLink>
          {/* <CustomLink to="/upload">csv-uploader</CustomLink> */}
          <CustomLink to="/">about</CustomLink>
          <CustomLink to="/login">{isLoggedIn ? ("👤 " + username) : "🔑 login"}</CustomLink>
        </ul>
      </div>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
