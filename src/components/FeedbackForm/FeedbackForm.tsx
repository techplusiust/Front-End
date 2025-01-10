import React, { useState } from "react";
import { Input, Textarea, Button, Spacer, Card } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import feedimage from "../../assets/fonts/iranyekan/Images/feedback-image.jpg";

interface FeedbackFormData {
  name: string;
  email: string;
  feedback: string;
}

const FeedbackForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: "",
    email: "",
    feedback: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    emailFormat: false,
    feedback: false,
  });

  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
      emailFormat: false,
    }));
  };

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation logic
    const newErrors = {
      name: formData.name.trim() === "",
      email: formData.email.trim() === "",
      emailFormat:
        formData.email.trim() !== "" && !validateEmail(formData.email.trim()),
      feedback: formData.feedback.trim() === "",
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.emailFormat || newErrors.feedback) {
      return;
    }

    setSuccessMessage(t("feedback_form.success_message"));
    setTimeout(() => setSuccessMessage(""), 3000);

    setFormData({ name: "", email: "", feedback: "" });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        backgroundColor: "#f3f4f6",
        padding: "1rem",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "1.5rem",
          textAlign: "center",
          marginTop: "2.5rem",
        }}
      >
        <h3>{t("feedback_form.title")}</h3>
        <img
          src={feedimage}
          alt="Feedback"
          style={{ width: "600px", marginBottom: "1rem" }}
        />
        <form onSubmit={handleSubmit}>
          <Input
            fullWidth
            label={t("feedback_form.name")}
            placeholder={t("feedback_form.name_placeholder")}
            value={formData.name}
            onChange={handleInputChange}
            name="name"
            aria-label={t("feedback_form.name")}
            color={errors.name ? "danger" : "default"}
          />
          {errors.name && (
            <span style={{ color: "red", fontSize: "0.8rem", textAlign: "left" }}>
              {t("feedback_form.errors.name_required")}
            </span>
          )}
          <Spacer y={1} />

          <Input
            fullWidth
            label={t("feedback_form.email")}
            placeholder={t("feedback_form.email_placeholder")}
            value={formData.email}
            onChange={handleInputChange}
            name="email"
            aria-label={t("feedback_form.email")}
            color={errors.email || errors.emailFormat ? "danger" : "default"}
          />
          {errors.email && (
            <span style={{ color: "red", fontSize: "0.8rem", textAlign: "left" }}>
              {t("feedback_form.errors.email_required")}
            </span>
          )}
          {errors.emailFormat && (
            <span style={{ color: "red", fontSize: "0.8rem", textAlign: "left" }}>
              {t("feedback_form.errors.email_invalid")}
            </span>
          )}
          <Spacer y={1} />

          <Textarea
            fullWidth
            label={t("feedback_form.feedback")}
            placeholder={t("feedback_form.feedback_placeholder")}
            value={formData.feedback}
            onChange={handleInputChange}
            name="feedback"
            aria-label={t("feedback_form.feedback")}
            rows={4}
            color={errors.feedback ? "danger" : "default"}
          />
          {errors.feedback && (
            <span style={{ color: "red", fontSize: "0.8rem", textAlign: "left" }}>
              {t("feedback_form.errors.feedback_required")}
            </span>
          )}
          <Spacer y={1.5} />

          <Button type="submit" color="primary" fullWidth>
            {t("feedback_form.submit")}
          </Button>
        </form>
      </Card>

      {successMessage && (
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
          }}
        >
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
