import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Avatar, Button, Textarea } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import "./TeacherDetailsPage.css";

interface Teacher {
  id: number;
  name: {
    en: string;
    fa: string;
  };
  department: {
    en: string;
    fa: string;
  };
  image?: string; // Placeholder for potential image data
  subject?: string; // Placeholder for subject if available
  daysAvailable?: string; // Placeholder for availability if available
  reviews?: string[]; // Placeholder for reviews
}

const TeacherDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const teacher = location.state as Teacher;

  const [reviews, setReviews] = useState<string[]>(teacher.reviews || []);
  const [newReview, setNewReview] = useState("");

  const handleAddReview = () => {
    if (newReview.trim()) {
      setReviews([...reviews, newReview]);
      setNewReview("");
    }
  };

  if (!teacher) {
    return <div>اطلاعات استاد موجود نیست.</div>;
  }

  return (
    <div className="details-container">
      {/* Teacher Information */}
      <Card className="teacher-info">
        <div className="header">
          <Avatar src={teacher.image || "/default-avatar.png"} size="lg" />
          <div>
            <h4 className="title">
              {teacher.name.fa} ({teacher.name.en})
            </h4>
            <p className="description">
              {teacher.department.fa} ({teacher.department.en})
            </p>
          </div>
        </div>
        {/* <p>موضوع تدریس: {teacher.subject || "نامشخص"}</p>
        <p>روزهای حضور: {teacher.daysAvailable || "نامشخص"}</p> */}
      </Card>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h3 className="review-title">{t("teacher_details.reviews_title")}</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Card key={index} className="review-card">
              {review}
            </Card>
          ))
        ) : (
          <p>{t("teacher_details.no_reviews")}</p>
        )}

        {/* Add Review Section */}
        <div className="add-review">
          <Textarea
            placeholder={t("teacher_details.add_review_placeholder")}
            fullWidth
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <Button size="sm" onClick={handleAddReview}>
            {t("teacher_details.submit_review")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetailsPage;
