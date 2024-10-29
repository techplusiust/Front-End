import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <header className="mainNavigation">
      <nav>
        <ul>
          <li>
            <NavLink to={"/login"}>{<>ورود / ثبت نام</>}</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
