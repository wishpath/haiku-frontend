// src/components/Navbar.js
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useLogin } from "../context/LoginContext";
import '../styles/Navbar.css';

export default function Navbar() {
  const { username, isLoggedIn } = useLogin(); // Use context to get username and login state

  return (
    <nav className="nav">
      <CustomLinkTitle className="site-title" to="/haiku">haiku-secret</CustomLinkTitle>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ul>
          {/* <CustomLink to="/upload">csv-uploader</CustomLink> */}
          <CustomLink to="/">about</CustomLink>
          <CustomLink to="/login">{isLoggedIn ? ("🔑 " + username) : "🔑 login"}</CustomLink>
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

function CustomLinkTitle({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <a className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </a>
  );
}
