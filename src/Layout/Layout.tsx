import CustomNavbar from "../components/Navbar/Navbar";

const Layout = ({ children }: { children: any }) => {
  return (
    <div lang="he-IL" dir="rtl" className="h-screen relative">
      <CustomNavbar />
      {children}
    </div>
  );
};

export default Layout;
