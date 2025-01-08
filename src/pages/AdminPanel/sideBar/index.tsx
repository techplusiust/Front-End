import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { useTranslation } from "react-i18next";

const Sidebar: React.FC = () => {
  const { t } = useTranslation();

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
            {t("sidebar.courses")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {t("sidebar.users")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/reports"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {t("sidebar.reports")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/comments"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {t("sidebar.comments")}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
