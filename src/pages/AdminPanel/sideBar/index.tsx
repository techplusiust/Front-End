import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar bg-primary-50">
      <ul>
        <li>
          <NavLink
            to="/admin/courses"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            لیست درس‌ها
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            لیست کاربران
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/reports"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            گزارش‌ها
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/comments"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            نظرات
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
