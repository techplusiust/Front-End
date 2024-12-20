import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilValue } from "recoil";
import { authAtom } from "./recoil/authAtom";
import Layout from "./Layout/Layout";
import AuthPage from "./pages/LoginAndSignup/index";
import Login from "./pages/LoginAndSignup/Login";
import Signup from "./pages/LoginAndSignup/Signup";
import ProfilePage from "./pages/ProfilePage";
import Schedule from "./pages/schedulePage";
import LandingPage from "./pages/LandingPage";
import TeachersPage from "./pages/TeachersPage/TeachersPage";
import TeacherDetailsPage from "./pages/TeachersPage/TeacherDetailsPage";
import UserPage from "./components/Admin/Users";
import AdminDashboard from "./pages/AdminPanel/index";
import CourseList from "./pages/AdminPanel/CourseList";
import Reports from "./pages/AdminPanel/Reports";
import Comments from "./pages/AdminPanel/Comments";
import EditUserFormPage from"./pages/EditUserFormPage/EditUserFormPage";
function App() {
  const auth = useRecoilValue(authAtom);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {auth.isLoggedin ? (
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
            <Route
              path="/professors"
              element={
                <Layout>
                  <TeachersPage />
                </Layout>
              }
            />
            <Route
              path="/professor/:id"
              element={
                <Layout>
                  <TeacherDetailsPage />
                </Layout>
              }
            />
            {auth.isAdmin && (
              <Route
                path="/admin"
                element={
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                }
              >
                <Route path="courses" element={<CourseList />} />
                <Route path="reports" element={<Reports />} />
                <Route path="Comments" element={<Comments />} />
                <Route path="users" element={<UserPage />} />
              </Route>
            )}
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        ) : (
          <>
            <Route
              path="/"
              element={
                <Layout>
                  <LandingPage />
                </Layout>
              }
            />
            <Route
              path="/edituserform"
              element={
                <Layout>
                  <EditUserFormPage />
                </Layout>
              }
            />
            <Route
              path="/professors"
              element={
                <Layout>
                  <TeachersPage />
                </Layout>
              }
            />
            <Route
              path="/professor/:id"
              element={
                <Layout>
                  <TeacherDetailsPage />
                </Layout>
              }
            />

            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        )}
        <Route path="/login" element={<AuthPage />}>
              <Route index element={<Login />} />
        </Route>
        <Route path="/signup" element={<AuthPage />}>
              <Route index element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
