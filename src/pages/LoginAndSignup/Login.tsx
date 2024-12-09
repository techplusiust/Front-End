import axios from "axios";
import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { Eye, EyeSlash, TickCircle } from "iconsax-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()

  const onSubmit = async (values: any) => {
    const { email, password } = values;
    const userData = { email, password };

    try {
      const response = await axios.post(
        "https://127.0.0.1:8000/api/accounts/login/",
        userData,
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.status === 200 && response.data.success) {
        console.log("Login successful. User data:", response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        const errorMessage =
          response.data.message || "ورود ناموفق. لطفاً اطلاعات خود را بررسی کنید.";
        console.error("Login error:", errorMessage);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "خطای اتصال به سرور. لطفاً دوباره تلاش کنید.";
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
            disabled={!formik.isValid}
            color="primary"
            className="my-2"
          >
            تایید
          </Button>
          <p>
            آیا حساب کاربری دارید؟
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
