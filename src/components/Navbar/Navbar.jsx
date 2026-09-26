import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "../../icons";
import { useBookmarks } from "../../context/BookmarksContext";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";
import { IoBookmarksSharp } from "react-icons/io5";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/directory", label: "Find a market" },
  { to: "/produce-guide", label: "Produce guide" },
  { to: "/seasonal", label: "What's in season" },
  { to: "/about", label: "About us" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { bookmarks } = useBookmarks();
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)} aria-label="FreshFind home">
          <span className="brand-mark" aria-hidden="true">
            <Icon name="leaf" size={18} />
          </span>
          <span className="brand-text">FreshFind</span>
        </NavLink>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `nav-link ${isActive ? "is-active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          <NavLink to="/directory" className="btn btn-primary nav-cta">
            <Icon name="search" size={16} /> <span>Search markets</span>
          </NavLink>
          <NavLink title="bookmark" to="/bookmarks" className="btn btn-outline nav-cta">
            <IoBookmarksSharp /> {bookmarks.length > 0 && ` (${bookmarks.length})`}
          </NavLink>
          {isAuthenticated ? (
            <>
              <span className="nav-user" title={user.username}>
                <Icon name="user" size={18} />
                <span className="nav-user-name">{user.username}</span>
              </span>
              <button type="button" className="nav-auth-button nav-auth-logout" title="Log out" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-auth-button" title="Log in">
                Log in
              </NavLink>
              <NavLink to="/register" className="nav-auth-button nav-auth-signup" title="Sign up">
                Sign up
              </NavLink>
            </>
          )}
          <button
            type="button"
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={20} />
          </button>
        </div>
      </div>

      <nav
        className={`nav-drawer ${open ? "is-open" : ""}`}
        aria-label="Mobile"
      >
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
        <div className="nav-drawer-auth-row">
          {isAuthenticated ? (
            <button
              type="button"
              className="nav-drawer-auth"
              onClick={() => {
                logout();
                setOpen(false);
              }}
            >
              Log out
            </button>
          ) : (
            <>
              <NavLink to="/login" className="nav-drawer-auth" onClick={() => setOpen(false)}>
                Log in
              </NavLink>
              <NavLink to="/register" className="nav-drawer-auth" onClick={() => setOpen(false)}>
                Sign up
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
