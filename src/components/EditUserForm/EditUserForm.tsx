import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useFormik } from "formik";
import { TickCircle } from "iconsax-react";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import edituserimage from "../../assets/fonts/iranyekan/Images/edituserimage.jpg";
import { useTranslation } from "react-i18next";

// Initial values for the form
const initialValues = {
  fullname: "",
  national_code: "",
  student_number: "987654321",
  email: "",
  department: "",
};

// Validation schema
const validationSchema = Yup.object({
  fullname: Yup.string().required("نام پروفایل را وارد نمایید"),
  national_code: Yup.string().required("کد ملی را وارد نمایید"),
  email: Yup.string()
    .email("فرمت ایمیل صحیح نیست")
    .required("ایمیل را وارد نمایید"),
  department: Yup.string().required("رشته تحصیلی را وارد نمایید"),
});

const initialSubjectOptions = [
  {
    id: "1",
    title: "مهندسی کامپیوتر",
  },
  {
    id: "2",
    title: "مهندسی برق",
  },
];

const EditUserForm = () => {
  const { t, i18n } = useTranslation();
  const [subjectOptions] = useState(initialSubjectOptions);
  const [successPopup, setSuccessPopup] = useState<boolean>(false);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "en"; 
    i18n.changeLanguage(storedLanguage); 
  }, [i18n]);
  const onSubmit = async (values: any) => {
    console.log("Updated user data:", values);

    // Show the success popup
    setSuccessPopup(true);

    // Hide the success popup after 3 seconds
    setTimeout(() => setSuccessPopup(false), 3000);
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
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #6e8efb, #a777e3)",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "800px",
          padding: "2rem",
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          marginTop: "2rem",
        }}
      >
        {/* Left: Form Section */}
        <div style={{ flex: 2 }}>
          <h1
            style={{
              textAlign: "center",
              color: "#4a90e2",
              fontWeight: "bold",
              marginBottom: "1.5rem",
            }}
          >
            {t("edit_user_form.title")}
          </h1>

          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {/* Fullname Field */}
            <Input
              {...formik.getFieldProps({ name: "fullname" })}
              name="fullname"
              label={t("edit_user_form.fullname")}
              size="lg"
              variant="bordered"
              labelPlacement={"outside"}
              errorMessage={<>{formik.errors.fullname ?? ""}</>}
              isInvalid={!!formik.errors.fullname}
            />

            {/* National Code Field */}
            <Input
              {...formik.getFieldProps({ name: "national_code" })}
              name="national_code"
              label={t("edit_user_form.national_code")}
              size="lg"
              variant="bordered"
              labelPlacement={"outside"}
              errorMessage={<>{formik.errors.national_code ?? ""}</>}
              isInvalid={!!formik.errors.national_code}
            />

            {/* Student Number Field (Read-Only) */}
            <Input
              {...formik.getFieldProps({ name: "student_number" })}
              name="student_number"
              label={t("edit_user_form.student_number")}
              size="lg"
              variant="bordered"
              labelPlacement={"outside"}
              isReadOnly
            />

            {/* Email Field */}
            <Input
              {...formik.getFieldProps({ name: "email" })}
              name="email"
              label={t("edit_user_form.email")}
              size="lg"
              variant="bordered"
              labelPlacement={"outside"}
              errorMessage={<>{formik.errors.email ?? ""}</>}
              isInvalid={!!formik.errors.email}
            />

            {/* Department Field */}
            <Select
              size="lg"
              label={t("edit_user_form.department")}
              aria-label={t("edit_user_form.department")}
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

            {/* Submit Button */}
            <Button
              size="lg"
              fullWidth
              startContent={<TickCircle variant="Bulk" />}
              type="submit"
              color="primary"
              className="mt-2"
            >
              {t("edit_user_form.save_changes")}
            </Button>
          </form>
        </div>

        {/* Right: Decorative Image Section */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={edituserimage}
            alt="Decorative Illustration"
            style={{
              width: "100%",
              maxWidth: "550px",
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* Success Popup */}
      {successPopup && (
        <div
          style={{
            position: "fixed",
            bottom: "1rem",
            left: "1rem",
            backgroundColor: "#4caf50",
            color: "white",
            padding: "0.75rem 1.25rem",
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            fontSize: "0.9rem",
          }}
        >
          {t("edit_user_form.success_message")}
        </div>
      )}
    </div>
  );
};

export default EditUserForm;
