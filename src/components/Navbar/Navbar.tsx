import * as React from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo";
// import mg1 from "../../assets/fonts/iranyekan/Images/article7.webp";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAtom } from "../../recoil/userAtom";
import { authAtom } from "../../recoil/authAtom";
import { Profile } from "iconsax-react";

const CustomNavbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);
  const setUser = useSetRecoilState(userAtom);
  const [auth, setAuth] = useRecoilState(authAtom);

  const logout = () => {
    setAuth({
      isLoggedin: false,
      isAdmin: false,
    });
    setUser(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((isMobileMenuOpen) => !isMobileMenuOpen);
  };

  return (
    <Navbar
      classNames={{ base: "bg-primary-300", wrapper: "max-w-full" }}
      className="fixed"
      isBordered
    >
      <div className="flex items-center justify-start">
        <NavbarBrand className="basis-16 flex justify-center items-center">
          <AcmeLogo />
          <p className="font-bold text-inherit">Tech Plus</p>
        </NavbarBrand>

        <NavbarContent
          className="hidden sm:flex gap-4 p-3 ml-11 whitespace-nowrap basis-16"
          style={{
            marginLeft: "45px",
            flexBasis: "4rem",
          }}
        >
          <NavLink key="profile" to="/profile">
            پروفایل
          </NavLink>
          <NavLink key="schedule" to="/schedule">
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
                <Button variant="solid" color="primary">
                  ورود / ثبت نام
                </Button>
              </NavLink>
              <NavLink to="/signup">
                <Button color="danger">Signup</Button>
              </NavLink>
            </>
          )}
          {auth.isLoggedin && (
            <>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <span className="text-primary">
                    <Profile variant="Bulk" size={32} />
                  </span>
                </DropdownTrigger>
                <DropdownMenu aria-label="User menu actions">
                  <NavLink key="profile" to="/profile">
                    پروفایل
                  </NavLink>
                  <NavLink key="schedule" to="/schedule">
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
            className="toggle sm:hidden bg-white py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            aria-haspopup="dialog"
            aria-expanded={isMobileMenuOpen}
            aria-controls="hs-offcanvas-example"
            onClick={handleMobileMenuToggle}
            type="button"
          >
            {isMobileMenuOpen ? (
              <MdClose style={{ width: "32px", height: "32px" }} />
            ) : (
              <FiMenu style={{ width: "32px", height: "32px" }} />
            )}
          </Button>

          {isMobileMenuOpen && (
            // <Navbar className="ml-auto" style={{ marginTop: "19rem" }}>
            //   <NavbarMenuItem
            //     className="bg-[#328bf1] sm:hidden flex flex-col items-center justify-center w-[10rem] h-[15rem] rounded"
            //     style={{ marginLeft: "10rem" }}
            //   >
            //     <div
            //       style={{ margin: "12px" }}
            //       className="flex flex-col w-[100%]"
            //     >
            //       <NavLink
            //         key="profile"
            //         to="/profile"
            //         className="p-2 hover:bg-blue-200"
            //       >
            //         پروفایل
            //       </NavLink>
            //       <NavLink
            //         key="courses"
            //         to="/courses"
            //         className="p-2 hover:bg-blue-200"
            //       >
            //         دوره ها
            //       </NavLink>
            //       <NavLink
            //         key="exam"
            //         to="/exam"
            //         className="p-2 hover:bg-blue-200"
            //       >
            //         برنامه امتحانی
            //       </NavLink>
            //       <NavLink
            //         key="professors"
            //         to="/professors"
            //         className="p-2 hover:bg-blue-200"
            //       >
            //         اساتید
            //       </NavLink>
            //     </div>
            //    </NavbarMenuItem>
            // </Navbar>

            <div
              id="hs-offcanvas-example"
              className={`hs-overlay fixed top-0 left-0 h-full max-w-xs w-full z-50 bg-white shadow-lg transition-transform duration-300 ${
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
              role="dialog"
              tabIndex={-1}
              aria-labelledby="hs-offcanvas-example-label"
            >
              {/* هدر منو */}
              <div className="flex justify-between items-center py-3 px-4 border-b bg-white">
                <h3
                  id="hs-offcanvas-example-label"
                  className="font-bold text-gray-800"
                >
                  منوی اصلی
                </h3>
                <button
                  type="button"
                  className="inline-flex justify-center items-center rounded-full bg-gray-100 p-2 hover:bg-gray-200 focus:outline-none"
                  aria-label="Close"
                  onClick={handleMobileMenuToggle}
                >
                  <MdClose className="w-6 h-6" />
                </button>
              </div>

              {/* آیتم‌های منو */}
              <div className="p-4 bg-white">
                <ul className="flex flex-col space-y-3">
                  <li>
                    <NavLink
                      to="/profile"
                      className="block py-2 px-3 text-gray-700 hover:bg-primary-300 rounded-lg"
                    >
                      پروفایل
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/schedule"
                      className="block py-2 px-3 text-gray-700 hover:bg-primary-300 rounded-lg"
                    >
                      دوره‌ها
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/exam"
                      className="block py-2 px-3 text-gray-700 hover:bg-primary-300 rounded-lg"
                    >
                      برنامه امتحانی
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/professors"
                      className="block py-2 px-3 text-gray-700 hover:bg-primary-300 rounded-lg"
                    >
                      اساتید
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </NavbarContent>
      </div>
    </Navbar>
  );
};

export default CustomNavbar;
