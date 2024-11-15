import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./contexts/UserContext";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import Schedule from "./pages/schedule";
import NavbarPage from "./pages/NavbarPage";
import LandingPage from "./pages/LandingPage";


function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <ToastContainer />
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/navbar" element={<NavbarPage/>} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
