import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "../../icons";
import { useBookmarks } from "../../context/BookmarksContext";
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
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">
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
          <button type="button" className="nav-auth-button" title="Demo login button">
            Log in
          </button>
          <button type="button" className="nav-auth-button nav-auth-signup" title="Demo signup button">
            Sign up
          </button>
          <button
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
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
      </nav>
    </header>
  );
}
