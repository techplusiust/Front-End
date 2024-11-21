import * as React from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { AcmeLogo } from "../Navbar/AcmeLogo";
import mg1 from "../../assets/fonts/iranyekan/Images/article7.webp";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAtom } from "../../recoil/userAtom";
import { authAtom } from "../../recoil/authAtom";

const Navbars: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);
  const setUser = useSetRecoilState(userAtom);
  const [auth, setAuth] = useRecoilState(authAtom);

  const logout = () => {
    setAuth({
      isLoggedin: false,
    });
    setUser(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((isMobileMenuOpen) => !isMobileMenuOpen);
  };

  return (
    <Navbar isBordered style={{ direction: "ltr", backgroundColor: "#328bf1" }}>
      <div className="flex items-center justify-start">
        <NavbarBrand style={{ marginLeft: "-15px", flexBasis: "4rem" }}>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>

        <NavbarContent
          className="hidden sm:flex gap-4 p-3"
          style={{
            marginLeft: "45px",
            flexBasis: "4rem",
            whiteSpace: "nowrap",
          }}
        >
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
        <NavbarContent
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
          {!auth.isLoggedin && (
            <>
              <NavLink to="/login">
                <Button color="success">Login</Button>
              </NavLink>
              {/* <NavLink to="/signup">
                <Button color="danger">Signup</Button>
              </NavLink> */}
            </>
          )}
          {auth.isLoggedin && (
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
                  <NavLink
                    key="logout"
                    color="danger"
                    to="/404"
                    onClick={logout}
                  >
                    خروج
                  </NavLink>
                </DropdownMenu>
              </Dropdown>
            </>
          )}
          <Button
            className="toggle sm:flex sm:hidden bg-white"
            onClick={handleMobileMenuToggle}
          >
            {isMobileMenuOpen ? (
              <MdClose style={{ width: "32px", height: "32px" }} />
            ) : (
              <FiMenu
                style={{
                  width: "32px",
                  height: "32px",
                }}
              />
            )}
          </Button>

          {isMobileMenuOpen && (
            <Navbar className="ml-auto" style={{ marginTop: '19rem' }}>
              <NavbarMenuItem className="bg-[#328bf1] sm:hidden flex flex-col items-center justify-center w-[10rem] h-[15rem] rounded" style={{marginLeft:'10rem'}}>
                <div style={{ margin: '12px'}} className="flex flex-col w-[100%]">
                  <NavLink key="profile" to="/profile" className="p-2 hover:bg-blue-200">
                    پروفایل
                  </NavLink>
                  <NavLink key="courses" to="/courses" className="p-2 hover:bg-blue-200">
                    دوره ها
                  </NavLink>
                  <NavLink key="exam" to="/exam" className="p-2 hover:bg-blue-200">
                    برنامه امتحانی
                  </NavLink>
                  <NavLink key="professors" to="/professors" className="p-2 hover:bg-blue-200">
                    اساتید
                  </NavLink>
                </div>
              </NavbarMenuItem>
          </Navbar>
          )}
        </NavbarContent>
      </div>
    </Navbar>
  );
};

export default Navbars;
