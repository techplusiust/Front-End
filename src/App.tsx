import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./contexts/UserContext";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import Schedule from "./pages/schedule";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <ToastContainer />
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
