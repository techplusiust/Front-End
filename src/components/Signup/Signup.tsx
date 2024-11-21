import axios from "axios";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useFormik } from "formik";
import { Eye, EyeSlash, TickCircle } from "iconsax-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useQuery } from "../../hooks/useQuery";
import { eGender } from "../../models/enum/Enums";
import signupimage from "../../assets/fonts/iranyekan/Images/signupimage.png";


const initialValues = {
  name: "",
  username: "",
  email: "",
  password1: "",
  password2: "",
  gender: eGender.Male,
  department: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("نام پروفایل را وارد نمایید"),
  username: Yup.string().required("نام کاربری را وارد نمایید"),
  email: Yup.string()
    .email("فرمت ایمیل صحیح نیست")
    .required("ایمیل را وارد نمایید"),
  password1: Yup.string()
    .required("رمز عبور را وارد نمایید")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "رمز عبور باید حداقل 8 کارکتر باشد و شامل حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد، و کارکتر ویژه مانند @، # یا ؟ باشد"
    ),
  password2: Yup.string()
    .required("رمز عبور را مجدد وارد نمایید")
    .oneOf([Yup.ref("password1"), ""], "رمز عبور تکرار شده مغایرت دارد"),
  gender: Yup.string().required("جنسیت را وارد نمایید"),
  department: Yup.string().required("رشته تحصیلی را وارد نمایید"),
});

const SignupForm = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [subjectOptions, setSubjectOptions] = useState<any[]>([
    {
      id: "1",
      title: "مهندسی کامپیوتر",
    },
  ]);
  const query = useQuery();
  const redirect = query.get("redirect") || "/";
  const onSubmit = async (values: any) => {
    const { name, email, username, password1, gender, department } = values;
    const userData = {
      name,
      username,
      email,
      password: password1,
      gender,
      department,
    };
    try {
      const response = await axios.post("https://localhost/signup", userData);
      if (response.data.success) {
        console.log("Signup successful. User data:", response.data);
      } else {
        console.error(
          "Signup error. Please check your details.",
          response.data.message
        );
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
      <div className="h-full overflow-y-scroll py-8 flex-1 flex flex-col justify-start items-center">
        <h1 className="text-blue-700 font-bold text-xl mb-4">ثبت نام</h1>
        <form
          className=" w-1/2 flex flex-col items-center justify-center gap-1"
          onSubmit={formik.handleSubmit}
        >
          <Input
            {...formik.getFieldProps({ name: "name" })}
            name="name"
            label="نام پروفایل"
            size="sm"
            variant="bordered"
            labelPlacement={"outside"}
            errorMessage={<>{formik.errors.name ?? ""}</>}
            isInvalid={!!formik.errors.name}
          />
          <Input
            {...formik.getFieldProps({ name: "username" })}
            name="username"
            label="نام کاربری"
            size="sm"
            variant="bordered"
            labelPlacement={"outside"}
            errorMessage={<>{formik.errors.username ?? ""}</>}
            isInvalid={!!formik.errors.username}
          />
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
            {...formik.getFieldProps({ name: "password1" })}
            name="password1"
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
            errorMessage={<>{formik.errors.password1 ?? ""}</>}
            isInvalid={!!formik.errors.password1}
          />
          <Input
            {...formik.getFieldProps({ name: "password2" })}
            name="password2"
            label="تکرار رمز عبور"
            size="sm"
            variant="bordered"
            labelPlacement={"outside"}
            type={isVisible ? "text" : "password"}
            errorMessage={<>{formik.errors.password2 ?? ""}</>}
            isInvalid={!!formik.errors.password2}
          />
          <Select
            label={"جنسیت"}
            size="sm"
            variant="bordered"
            labelPlacement={"outside"}
            {...formik.getFieldProps({ name: "gender" })}
            errorMessage={<>{formik.errors.gender ?? ""}</>}
            isInvalid={!!formik.errors.gender}
          >
            <SelectItem key={eGender.Male} value={eGender.Male}>
              آقا
            </SelectItem>
            <SelectItem key={eGender.Female} value={eGender.Female}>
              خانم
            </SelectItem>
          </Select>
          <Select
            size="sm"
            label={"رشته"}
            variant="bordered"
            labelPlacement={"outside"}
            {...formik.getFieldProps({ name: "department" })}
            errorMessage={<>{formik.errors.department ?? ""}</>}
            isInvalid={!!formik.errors.department}
          >
            {subjectOptions.map((item: any) => (
              <SelectItem key={item.id} value={item.id}>
                {item.title}
              </SelectItem>
            ))}
          </Select>
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

          <Link to={`/login?redirect=${redirect}`} className="text-blue-600">
            <p>آیا حساب کاربری دارید؟</p>
          </Link>
        </form>
      </div>
      <div className="flex-1 bg-primary flex justify-center items-center">
        <img
          src={signupimage}
          alt="Login"
          style={{ width: "768px", height: "825px" }}
        />
      </div>
    </div>
  );
};

export default SignupForm;
