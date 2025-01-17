import axios from "axios";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useFormik } from "formik";
import { Eye, EyeSlash, TickCircle } from "iconsax-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useQuery } from "../../hooks/useQuery";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const initialValues = {
  fullname: "",
  national_code: "",
  student_number: "",
  email: "",
  password1: "",
  password2: "",
  department: "",
};

const initialSubjectOptions = [
  {
    id: "1",
    title: "مهندسی کامپیوتر",
  },
];

const SignupForm = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const subjectOptions = initialSubjectOptions;
  const navigate = useNavigate();
  const query = useQuery();
  const redirect = query.get("redirect") || "/";

  const validationSchema = Yup.object({
    fullname: Yup.string().required(t("signup.errors.fullname_required")),
    national_code: Yup.string().required(t("signup.errors.national_code_required")),
    student_number: Yup.string().required(t("signup.errors.student_number_required")),
    email: Yup.string()
      .email(t("signup.errors.email_invalid"))
      .required(t("signup.errors.email_required")),
    password1: Yup.string()
      .required(t("signup.errors.password1_required"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        t("signup.errors.password1_invalid")
      ),
    password2: Yup.string()
      .required(t("signup.errors.password2_required"))
      .oneOf([Yup.ref("password1")], t("signup.errors.password2_mismatch")),
    department: Yup.string().required(t("signup.errors.department_required")),
  });

  const onSubmit = async (values: any) => {
    const {
      fullname,
      national_code,
      student_number,
      email,
      password1,
      password2,
      department,
    } = values;

    const userData = {
      fullname,
      national_code,
      student_number,
      email,
      password1,
      password2,
      department,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/accounts/signup/",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        navigate("/login");
      } else {
        console.error("Signup error.", response.data.message);
      }
    } catch (error: any) {
      console.error("Server connection error:", error.message);
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
    <div className="w-full max-w-md h-full px-4 py-6 mt-4" lang="he-IL" dir="rtl">
      <div>
        <h1 className="text-blue-700 font-bold text-xl">{t("signup.title")}</h1>
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
          }}
        >
          <Input
            {...formik.getFieldProps({ name: "fullname" })}
            name="fullname"
            label={t("signup.fullname")}
            size="sm"
            variant="bordered"
            labelPlacement={"outside"}
            errorMessage={<>{formik.errors.fullname ?? ""}</>}
            isInvalid={!!formik.errors.fullname}
          />
          <Input
            {...formik.getFieldProps({ name: "national_code" })}
            name="national_code"
            label={t("signup.national_code")}
            size="sm"
            variant="bordered"
            labelPlacement={"outside"}
            errorMessage={<>{formik.errors.national_code ?? ""}</>}
            isInvalid={!!formik.errors.national_code}
          />
          <Input
            {...formik.getFieldProps({ name: "student_number" })}
            name="student_number"
            label={t("signup.student_number")}
            size="sm"
            variant="bordered"
            labelPlacement={"outside"}
            errorMessage={<>{formik.errors.student_number ?? ""}</>}
            isInvalid={!!formik.errors.student_number}
          />
          <Input
            {...formik.getFieldProps({ name: "email" })}
            name="email"
            label={t("signup.email")}
            size="sm"
            variant="bordered"
            labelPlacement={"outside"}
            errorMessage={<>{formik.errors.email ?? ""}</>}
            isInvalid={!!formik.errors.email}
          />
          <Input
            {...formik.getFieldProps({ name: "password1" })}
            name="password1"
            label={t("signup.password")}
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
                  <EyeSlash variant="Bulk" />
                ) : (
                  <Eye variant="Bulk" />
                )}
              </button>
            }
            errorMessage={<>{formik.errors.password1 ?? ""}</>}
            isInvalid={!!formik.errors.password1}
          />
          <Input
            {...formik.getFieldProps({ name: "password2" })}
            name="password2"
            label={t("signup.confirm_password")}
            size="sm"
            variant="bordered"
            labelPlacement={"outside"}
            type={isVisible ? "text" : "password"}
            errorMessage={<>{formik.errors.password2 ?? ""}</>}
            isInvalid={!!formik.errors.password2}
          />
          <Select
            size="sm"
            label={t("signup.department")}
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
            color="primary"
            className="mt-2"
          >
            {t("signup.submit")}
          </Button>

          <Link to={`/login?redirect=${redirect}`} className="text-blue-600">
            <p>{t("signup.already_have_account")}</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
