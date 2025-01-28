import axios from "axios";
import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { Eye, EyeSlash, TickCircle } from "iconsax-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../../recoil/authAtom";
import { userAtom } from "../../recoil/userAtom";
import { useTranslation } from "react-i18next";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authAtom);
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    const language = storedLanguage === "fa" || storedLanguage === "en" ? storedLanguage : "fa";
    i18n.changeLanguage(language);
  }, [i18n]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("login.errors.email_invalid"))
      .required(t("login.errors.email_required")),
    password: Yup.string()
      .required(t("login.errors.password_required"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        t("login.errors.password_invalid")
      ),
  });

  const onSubmit = async (values: any) => {
    const { email, password } = values;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"}/api/accounts/login/`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);

        setAuth({
          isLoggedin: true,
          isAdmin: response.data.user.role === "admin",
          role: response.data.user.role,
        });

        setUser({
          id: response.data.user.id,
          email: response.data.user.email,
          department: response.data.user.department,
          avatar: response.data.user.avatar || "",
        });

        navigate(response.data.user.role === "admin" ? "/admin" : "/");
      } else {
        const errorMessage = response.data.message || t("login.error.general");
        console.error("Login error:", errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || t("login.error.server");
      console.error("Server connection error:", errorMessage);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: false,
    enableReinitialize: true,
  });

  return (
    <div
      className="w-full max-w-md h-full px-4 py-6"
      lang={i18n.language}
      dir={i18n.language === "fa" ? "rtl" : "ltr"}
    >
      <div>
        <h1 className="text-blue-700 font-bold text-xl mb-4">
          {t("login.title")}
        </h1>
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <Input
            {...formik.getFieldProps("email")}
            name="email"
            label={t("login.email")}
            size="sm"
            variant="bordered"
            labelPlacement={"outside"}
            errorMessage={
              formik.touched.email && formik.errors.email ? (
                <>{formik.errors.email}</>
              ) : null
            }
            isInvalid={formik.touched.email && !!formik.errors.email}
          />
          <Input
            {...formik.getFieldProps("password")}
            name="password"
            label={t("login.password")}
            size="sm"
            variant="bordered"
            labelPlacement={"outside"}
            type={isVisible ? "text" : "password"}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <span className="text-2xl text-default-400 pointer-events-none">
                    <EyeSlash variant="Bulk" />
                  </span>
                ) : (
                  <span className="text-2xl text-default-400 pointer-events-none">
                    <Eye variant="Bulk" />
                  </span>
                )}
              </button>
            }
            errorMessage={
              formik.touched.password && formik.errors.password ? (
                <>{formik.errors.password}</>
              ) : null
            }
            isInvalid={formik.touched.password && !!formik.errors.password}
          />
          <Button
            size="sm"
            fullWidth
            startContent={<TickCircle variant="Bulk" />}
            type="submit"
            color="primary"
            className="my-2"
          >
            {t("login.submit")}
          </Button>
          <p>
            {t("login.noAccount")}{" "}
            <Link to={`/signup`} className="text-blue-600">
              {t("login.signup")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
