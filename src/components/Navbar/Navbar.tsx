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
import { languageAtom } from "../../recoil/languageAtom";
import { useTranslation } from "react-i18next";

// Import translations dynamically based on the language
import enTranslations from "../../lang/en.json";
import faTranslations from "../../lang/fa.json";

const menuItems = [
  {
    href: "schedule",
    title: "schedule",
  },
  {
    href: "professors",
    title: "professors",
  },
];

const languages = [
  { code: "fa", label: "فارسی" },
  { code: "en", label: "English" },
];

const CustomNavbar: React.FC = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [auth, setAuth] = useRecoilState(authAtom);
  const [language, setLanguage] = useRecoilState(languageAtom);
  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    if (language === "fa") {
      i18n.addResources("fa", "translation", faTranslations);
    } else {
      i18n.addResources("en", "translation", enTranslations);
    }
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const logout = () => {
    setAuth({
      isLoggedin: false,
      isAdmin: false,
      role: null,
    });
    setUser(null);
  };

  const handleLanguageChange = (code: string) => {
    setLanguage(code);
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
        <NavbarContent className="flex items-center gap-4">
          <Dropdown>
            <DropdownTrigger>
              <Button
                size="sm"
                color="primary"
                variant="flat"
                className="p-0"
                aria-label="Language Selector"
              >
                <img
                  src="/path-to-globe-icon.png"
                  alt="Change Language"
                  className="w-6 h-6"
                />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {languages.map((lang) => (
                <DropdownItem
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  {lang.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          {!auth.isLoggedin && (
            <NavbarItem>
              <Button
                as={Link}
                className="hover:text-white"
                color="primary"
                href="/login"
                variant="solid"
              >
                {t("login")}
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>
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
                      {t("profile")}
                    </DropdownItem>
                    <DropdownItem key="admin" href="/admin">
                      {t("admin")}
                    </DropdownItem>
                  </>
                ) : (
                  <DropdownItem key="profile" href="/profile">
                    {t("profile")}
                  </DropdownItem>
                )}
                <DropdownItem onClick={logout} key="logout" color="danger">
                  {t("logout")}
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
                {t(item.title)}
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
              href={item.href}
              size="lg"
            >
              {t(item.title)}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default CustomNavbar;
