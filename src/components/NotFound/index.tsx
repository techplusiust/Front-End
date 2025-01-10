import React from "react";
import { Link } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import {  useEffect } from "react";

const NotFound: React.FC = () => {

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "en"; 
    i18n.changeLanguage(storedLanguage);
  }, [i18n]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center">
      <img
        src="/images/loginPage/404.jpg"
        alt="404 Illustration"
        className="w-1/3 max-w-xs h-auto"
      />
      <p className="text-lg text-gray-700 mt-4">{t("not_found.title")}</p>
      <Link
        href="/"
        className="mt-6 bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
      >
        {t("not_found.go_home")}
      </Link>
    </div>
  );
};

export default NotFound;
