import * as React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Button,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo";
import { useRecoilState } from "recoil";
import { userAtom } from "../../recoil/userAtom";
import { authAtom } from "../../recoil/authAtom";

const menuItems = [
  {
    href: "schedule",
    title: "برنامه کلاس ها",
  },
  {
    href: "professors",
    title: "اساتید",
  },
];

const CustomNavbar: React.FC = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [auth, setAuth] = useRecoilState(authAtom);

  const logout = () => {
    setAuth({
      isLoggedin: false,
      isAdmin: false,
      role: null,
    });
    setUser(null);
  };

  return (
    <Navbar
      classNames={{
        base: "bg-primary-100",
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarContent>
        {auth.isLoggedin && (
          <NavbarContent className="sm:hidden" justify="start">
            <NavbarMenuToggle />
          </NavbarContent>
        )}
        {!auth.isLoggedin && (
          <NavbarItem>
            <Button
              as={Link}
              className="hover:text-white"
              color="primary"
              href="/login"
              variant="solid"
            >
              ورود / ثبت نام
            </Button>
          </NavbarItem>
        )}
        {auth.isLoggedin && (
          <NavbarContent as="div" className="items-center" justify="start">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={user?.email}
                  size="sm"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                {auth.isAdmin && auth.role === "admin" ? (
                  <>
                    <DropdownItem key="profile" href="/profile">
                      پروفایل
                    </DropdownItem>
                    <DropdownItem key="admin" href="/admin">
                      ادمین
                    </DropdownItem>
                  </>
                ) : (
                  <DropdownItem key="profile" href="/profile">
                    پروفایل
                  </DropdownItem>
                )}
                <DropdownItem onClick={logout} key="logout" color="danger">
                  خروج
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        )}
      </NavbarContent>
      {auth.isLoggedin && (
        <NavbarContent className="hidden sm:flex gap-8" justify="center">
          {menuItems.map((item, index) => (
            <NavbarItem key={`${item.href}-${index}`}>
              <Link aria-current="page" href={item.href}>
                {item.title}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      )}
      <NavbarBrand className="justify-end">
        <Link aria-current="page" href={"/"}>
          <AcmeLogo />
          <p className="font-bold text-inherit">Tech Plus</p>
        </Link>
      </NavbarBrand>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.href}-${index}`}>
            <Link
              className="w-full"
              color={"foreground"}
              href={item.title}
              size="lg"
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default CustomNavbar;
