import axios from "axios";
import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { Eye, EyeSlash, TickCircle } from "iconsax-react";
import {  useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import loginimage from "../../assets/fonts/iranyekan/Images/loginimage.png";
// import { useQuery } from "../../hooks/useQuery";

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

 
  const onSubmit = async (values: any) => {
    const { email, password } = values;
    const userData = { email, password };

    try {
      const response = await axios.post("https://localhost/login", userData);
      if (response.data.success) {
        console.log("Login successful. User data:", response.data);
      } else {
        console.error("Login error. Please check your credentials.", response.data.message);
      }
    } catch (error) {
      console.error("Server connection error. Please try again later.", error);
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
      className="flex justify-between h-screen relative"
      lang="he-IL"
      dir="rtl"
    >
      <div className="h-full overflow-y-scroll py-8 flex-1 flex flex-col justify-center items-center">
        <h1 className="text-blue-700 font-bold text-xl mb-4">ورود</h1>
        <form
          className=" w-1/2 flex flex-col items-center justify-center gap-3"
          onSubmit={formik.handleSubmit}
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
          >
            تایید
          </Button>
          <p>آیا حساب کاربری دارید؟
            <Link to={`/signup`} className="text-blue-600">
              ثبت نام
            </Link>
          </p>
        </form>
      </div>
      <div className="flex-1 bg-primary flex justify-center items-center">
        
        <img src={loginimage} alt="Login" style={{ width: '770px', height: '825px' }}/>
      </div>
    </div>
  );
};

export default LoginForm;

