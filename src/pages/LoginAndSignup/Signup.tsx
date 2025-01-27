import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useFormik } from "formik";
import { Eye, EyeSlash, TickCircle } from "iconsax-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useQuery } from "../../hooks/useQuery";
//دوباره پوش مینمایم
const initialValues = {
  fullname: "",
  national_code: "",
  student_number: "",
  email: "",
  password1: "",
  password2: "",
  department: "",
};

const SignupForm = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [uniqueDepartments, setUniqueDepartments] = useState<
    { en: string; fa: string }[]
  >([]);

  const navigate = useNavigate();
  const query = useQuery();
  const redirect = query.get("redirect") || "/";

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/professors/all/"
        );
        
        // بررسی ساختار پاسخ API
        const data = response.data?.data || response.data;
  
        if (Array.isArray(data)) {
          console.log("API Data:", data);
          setUniqueDepartments(data); // تنظیم داده‌ها
        } else {
          console.error("Unexpected API response format:", response.data);
        }

        // Explicitly type the departments and unique variables
        const departments: { en: string; fa: string }[] = response.data.map(
          (item: any) => item.department
        );
  
        const unique: { en: string; fa: string }[] = Array.from(
          new Map(
            departments.map((dep) => [dep.en, dep]) // Using dep.en as the key
          ).values()
        );
  
        setUniqueDepartments(unique);

      } catch (error) {
        console.error("Error fetching faculties:", error.response?.data || error.message);
      }
    };
  
    fetchFaculties();
  }, []);
  

  const validationSchema = Yup.object({
    fullname: Yup.string().required(t("signup.errors.fullname_required")),
    national_code: Yup.string().required(
      t("signup.errors.national_code_required")
    ),
    student_number: Yup.string().required(
      t("signup.errors.student_number_required")
    ),
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
      .oneOf([Yup.ref("password1"), ""], t("signup.errors.password2_mismatch")),
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
    <div
      className="w-full max-w-md h-full px-4 py-6 mt-4"
      lang={i18n.language === "fa" ? "fa-IR" : "en-US"}
      dir={i18n.language === "fa" ? "rtl" : "ltr"}
    >
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
            {...formik.getFieldProps("fullname")}
            name="fullname"
            label={t("signup.fullname")}
            size="sm"
            variant="bordered"
            labelPlacement={"outside"}
            errorMessage={<>{formik.errors.fullname ?? ""}</>}
            isInvalid={!!formik.errors.fullname}
          />
          <Input
            {...formik.getFieldProps("national_code")}
            name="national_code"
            label={t("signup.national_code")}
            size="sm"
            variant="bordered"
            labelPlacement={"outside"}
            errorMessage={<>{formik.errors.national_code ?? ""}</>}
            isInvalid={!!formik.errors.national_code}
          />
          <Input
            {...formik.getFieldProps("student_number")}
            name="student_number"
            label={t("signup.student_number")}
            size="sm"
            variant="bordered"
            labelPlacement={"outside"}
            errorMessage={<>{formik.errors.student_number ?? ""}</>}
            isInvalid={!!formik.errors.student_number}
          />
          <Input
            {...formik.getFieldProps("email")}
            name="email"
            label={t("signup.email")}
            size="sm"
            variant="bordered"
            labelPlacement={"outside"}
            errorMessage={<>{formik.errors.email ?? ""}</>}
            isInvalid={!!formik.errors.email}
          />
          <Input
            {...formik.getFieldProps("password1")}
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
            {...formik.getFieldProps("password2")}
            name="password2"
            label={t("signup.confirm_password")}
            size="sm"
            variant="bordered"
            labelPlacement={"outside"}
            type="password"
            errorMessage={<>{formik.errors.password2 ?? ""}</>}
            isInvalid={!!formik.errors.password2}
          />
          <Select
            size="sm"
            label={t("signup.department")}
            variant="bordered"
            labelPlacement={"outside"}
            {...formik.getFieldProps("department")}
            errorMessage={<>{formik.errors.department ?? ""}</>}
            isInvalid={!!formik.errors.department}
          >

            {uniqueDepartments.map((dept: any) => (
              <SelectItem key={dept.en} value={dept.en}>
                {i18n.language === "fa" ? dept.fa : dept.en}

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
