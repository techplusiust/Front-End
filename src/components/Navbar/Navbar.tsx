
import * as React from "react";
import { NavLink } from "react-router-dom";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button ,Dropdown ,DropdownTrigger ,Avatar , DropdownMenu ,NavbarMenuToggle} from "@nextui-org/react";
import { AcmeLogo } from "../Navbar/AcmeLogo";
import img1 from "../../assets/fonts/iranyekan/Images/article7.webp";  // Ensure the import is correct
import { useUser } from "../../contexts/UserContext";
interface PageRoutes {
  [key: string]: string;
}

const pages = ["Profile", "Courses", "ExamSchedule", "Professors"];

const pageRoutes: PageRoutes = {
  Profile: "/profile",
  Courses: "/courses",
  ExamSchedule: "/exam",
  Professors: "/professors",
};

const Navbars: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);
  const { user, isLoggedIn, logout } = useUser();

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <Navbar isBordered style={{ direction: "ltr", width: "100%", maxWidth: "100vw" ,backgroundColor: "#328bf1", position:'fixed'}}>
      <NavbarBrand style={{ marginLeft: "5px"}}>
        <AcmeLogo />
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-5"  style={{ marginLeft: "-35px" }}>
        {pages.map((page) => (
          <NavLink key={page} to={pageRoutes[page]}>
            {page}
          </NavLink>
        ))}
      </NavbarContent>

      <NavbarContent style={{ flex: 1, justifyContent: "flex-end",  alignItems: "center"}}>
      {!isLoggedIn && (
        <>
            <NavLink to="/login">
              <Button color="success">
                Login
              </Button>
            </NavLink>
            <NavLink to="/signup">
              <Button color= "danger">
                Signup
              </Button>
            </NavLink>
        </>
        )}
        {isLoggedIn && (
          <>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar color="primary" src={img1} size="md" />
          </DropdownTrigger>
          <DropdownMenu aria-label="User menu actions">
            <NavLink key="profile" to="/profile">
              Profile
            </NavLink>
            <NavLink key="courses" to="/courses">
              Courses
            </NavLink>
            <NavLink key="exam" to="/exam">
              ExamSchedule
            </NavLink>
            <NavLink key="professors" to="/professors">
              Professors
            </NavLink>
            <NavLink key="logout" color= "danger" to="/404" onClick={logout}>
              Logout
            </NavLink>
          </DropdownMenu>
        </Dropdown>
        </>
        )}
        <NavbarMenuToggle className="md:hidden" aria-label="toggle navigation" onClick={handleMobileMenuToggle} />

      {isMobileMenuOpen && (
        <NavbarContent>
          {pages.map((page , index) => (
            <NavbarItem key={index}>
              <NavLink
                to={pageRoutes[page]}
                onClick={() => setMobileMenuOpen(false)}
                color={
                  index === 2 ? "primary" : index === pages.length - 1 ? "danger" : "foreground"
                }
                className="w-full"
              >
                {page}
              </NavLink>
            </NavbarItem>
          ))}
        </NavbarContent>
      )}
      </NavbarContent>
    </Navbar>
  );
};

export default Navbars;






