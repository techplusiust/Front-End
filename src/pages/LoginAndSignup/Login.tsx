import axios from "axios";
import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { Eye, EyeSlash, TickCircle } from "iconsax-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../../recoil/authAtom";
import { userAtom } from "../../recoil/userAtom";


const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("فرمت ایمیل صحیح نیست")
    .required("ایمیل را وارد نمایید"),
  password: Yup.string()
    .required("رمز عبور را وارد نمایید")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "رمز عبور باید حداقل 8 کارکتر باشد و شامل حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد، و کارکتر ویژه مانند @، # یا ؟ باشد"
    ),
});

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authAtom);
  const setUser = useSetRecoilState(userAtom);

  const onSubmit = async (values: any) => {
    const { email, password } = values;

    if (email === "admin@example.com" && password === "@Admin123") {
      setAuth({
        isLoggedin: true,
        isAdmin: true,
        role: "admin",
      });

      setUser({
        email: "admin@example.com",
        department: "Administration",
      });

      navigate("/admin");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/accounts/login/",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("API Response:", response.data);
      if (response.status === 200) {
        console.log("Login successful. User data:", response.data);
        // setLoginResponse(response.data);
        localStorage.setItem("token", response.data.token);

        setAuth({
          isLoggedin: true,
          isAdmin: email === "admin@example.com" || false,
          role: email === "admin@example.com" ? "admin" : "user",
        });

        setUser({
          email: response.data.user.email,
          department: response.data.user.department,
          avatar: "",
        });

        navigate(response.data.isAdmin ? "/admin" : "/");
      } else {
        const errorMessage =
          response.data.message ||
          "ورود ناموفق. لطفاً اطلاعات خود را بررسی کنید.";
        console.error("Login error:", errorMessage);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "خطای اتصال به سرور. لطفاً دوباره تلاش کنید.";
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
    <div className="w-full max-w-md h-full px-4 py-6 " lang="he-IL" dir="rtl">
      <div>
        <h1 className="text-blue-700 font-bold text-xl mb-4">ورود</h1>
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
          }}
        >
          <Input
            {...formik.getFieldProps({ name: "email" })}
            name="email"
            label="ایمیل"
            size="sm"
            variant="bordered"
            labelPlacement={"outside"}
            errorMessage={<>{formik.errors.email ?? ""}</>}
            isInvalid={!!formik.errors.email}
          />
          <Input
            {...formik.getFieldProps({ name: "password" })}
            name="password"
            label="رمز عبور"
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
            errorMessage={<>{formik.errors.password ?? ""}</>}
            isInvalid={!!formik.errors.password}
          />
          <Button
            size="sm"
            fullWidth
            startContent={<TickCircle variant="Bulk" />}
            type="submit"
            // disabled={!formik.isValid}
            color="primary"
            className="my-2"
          >
            تایید
          </Button>
          <p>
            آیا حساب کاربری ندارید؟
            <Link to={`/signup`} className="text-blue-600">
              ثبت نام
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
