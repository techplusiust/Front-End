
import * as React from "react";
import { NavLink } from "react-router-dom";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button ,Dropdown ,DropdownTrigger ,Avatar , DropdownMenu ,NavbarMenuToggle} from "@nextui-org/react";
import { AcmeLogo } from "../Navbar/AcmeLogo";
import mg1 from "../../assets/fonts/iranyekan/Images/article7.webp";  // Ensure the import is correct
import { useUser } from "../../contexts/UserContext";


const Navbars: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);
  const { user, isLoggedIn, logout } = useUser();

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <Navbar isBordered style={{ direction: "ltr",backgroundColor: "#328bf1"}}>
      <div className="flex items-center justify-start">
      <NavbarBrand style={{ marginLeft: "-15px", flexBasis:'4rem'}}>
        <AcmeLogo />
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-5 p-3"  style={{ marginLeft: "45px", flexBasis:'4rem',whiteSpace: 'nowrap' }}>
           <NavLink key="profile" to="/profile">
              پروفایل
            </NavLink>
            <NavLink key="courses" to="/courses">
              دوره ها
            </NavLink>
            <NavLink key="exam" to="/exam">
              برنامه امتحانی
            </NavLink>
            <NavLink key="professors" to="/professors">
              اساتید
            </NavLink>
      </NavbarContent>
      </div>
      <div className="flex items-center justify-end">
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
            <Avatar src={mg1} size="md" />
          </DropdownTrigger>
          <DropdownMenu aria-label="User menu actions">
            <NavLink key="profile" to="/profile">
              پروفایل
            </NavLink>
            <NavLink key="courses" to="/courses">
              دوره ها
            </NavLink>
            <NavLink key="exam" to="/exam">
              برنامه امتحانی
            </NavLink>
            <NavLink key="professors" to="/professors">
              اساتید
            </NavLink>
            <NavLink key="logout" color= "danger" to="/404" onClick={logout}>
              خروج
            </NavLink>
          </DropdownMenu>
        </Dropdown>
        </>
        )}
        <NavbarMenuToggle className="md:hidden" aria-label="toggle navigation" onClick={handleMobileMenuToggle} />

      {isMobileMenuOpen && (
        <NavbarContent onClick={() => setMobileMenuOpen(false)}>
            <NavLink key="profile" to="/profile">
              پروفایل
            </NavLink>
            <NavLink key="courses" to="/courses">
              دوره ها
            </NavLink>
            <NavLink key="exam" to="/exam">
              برنامه امتحانی
            </NavLink>
            <NavLink key="professors" to="/professors">
              اساتید
            </NavLink>
        </NavbarContent>
      )}
      </NavbarContent>
      </div>
    </Navbar>
  );
};

export default Navbars;






