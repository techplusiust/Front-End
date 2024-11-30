import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import Schedule from "./pages/schedulePage";
import LandingPage from "./pages/LandingPage";
import { useRecoilValue } from "recoil";
import { authAtom } from "./recoil/authAtom";
import Layout from "./Layout/Layout";

function App() {
  const auth = useRecoilValue(authAtom);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* {auth.isLoggedin ? ( */}
          <Route>
            <Route
              path="/profile"
              element={
                <Layout>
                  <ProfilePage />
                </Layout>
              }
            />
            <Route
              path="/schedule"
              element={
                <Layout>
                  <Schedule />
                </Layout>
              }
            />
            <Route
              path="/"
              element={
                <Layout>
                  <LandingPage />
                </Layout>
              }
            />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        {/* ) : ( */}
          <>
            <Route
              path="/"
              element={
                <Layout>
                  <LandingPage />
                </Layout>
              }
            />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        {/* )} */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
