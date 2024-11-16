// src/components/Navbar.js

import { 
  Link, // navigation component for different routes without refresh.
  useMatch, // checks if the user-entered URL matches a route pattern specified by developers in the project.
  useResolvedPath // resolves a relative path to a full path (excluding the domain).
} from "react-router-dom"; //React Router directs user requests to specific views without refreshing.
import { useLoginContext } from "../../context/LoginContext";
import './tool/Navbar.css';
import { useEffect } from "react";

export default function Navbar() {
  const { userObject, isLoggedIn } = useLoginContext(); // Use context to get username and login state

  return (
    <nav className="nav">
      <CustomLinkTitle className="site-title" to="/haiku">haiku-secret</CustomLinkTitle>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ul>
          {/* <CustomLink to="/upload" id="uniqueUploadId">csv-uploader</CustomLink> */}
          <CustomLink to="/">about</CustomLink>
          <CustomLink to="/login">
            {isLoggedIn ? <UserPictureAndName userObject={userObject}/> : "🔑 login"}
          </CustomLink>
        </ul>
      </div>
    </nav>
  );
}

// applies to each CustomLink element when a new URL is triggered.
function CustomLink({ 
  to, //triggered relatve path
  children, // visual content of the CustomLink, e.g., "csv-uploader" for to="/upload".
  ...props }) { //atributes of CustomLink, e.g. id="uniqueUploadId"
  
  const resolvedPath = useResolvedPath(to); //only the path component of the URL, not with the domain or protocol.
  const isActive = useMatch({ path: resolvedPath.pathname, end: true }); // checks if the user-entered or trigered (by link) url matches the resolved path.

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
  const isActive = useMatch({ // curly braces {} indicate that an object is being created. Inside this object - key-value pairs
    path: resolvedPath.pathname, 
    end: true //an exact match is required
  }); 
  const isActiveClass = {className: isActive ? "active" : ""}; //just example of creating an object with a key/property

  return (
    <a className={isActiveClass.className}> {/* accessing  key/property in object */}
      <Link to={to} {...props}>
        {children}
      </Link>
    </a>
  );
}

function UserPictureAndName({userObject}){
  return (
    <>
      <img id="user-picture" src={userObject.picture}/>
      {userObject.given_name}
    </>
  );
}