import React from "react";
import { Link } from "@nextui-org/react";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center">
      <img
        src="/images/loginPage/404.jpg"
        alt="404 Illustration"
        className="w-1/3 max-w-xs h-auto" 
      />
      <p className="text-lg text-gray-700 mt-4">
        صفحه‌ای که به دنبال آن هستید یافت نشد!
      </p>
      <Link
        href="/"
        className="mt-6 bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
      >
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
};

export default NotFound;
