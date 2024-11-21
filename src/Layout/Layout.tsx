import Navigation from "../components/Navigation/Navigation";

const Layout = ({ children }: { children: any }) => {
  return (
    <div lang="he-IL" dir="rtl" className="h-screen relative">
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;
