import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Avatar, Button, Textarea } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import "./TeacherDetailsPage.css";

const TeacherDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const teacher = location.state;
  const [reviews, setReviews] = useState<string[]>(teacher.reviews || []);
  const [newReview, setNewReview] = useState("");

  const handleAddReview = () => {
    if (newReview.trim()) {
      setReviews([...reviews, newReview]);
      setNewReview("");
    }
  };

  return (
    <div className="details-container">
      <Card className="teacher-info">
        <div className="header">
          <Avatar src={teacher.image} size="lg" />
          <div>
            <h4 className="title">{teacher.name}</h4>
            <p className="description">{teacher.degree}</p>
          </div>
        </div>
        <p>
          {t("teacher_details.subject")}: {teacher.subject}
        </p>
        <p>
          {t("teacher_details.days_available")}: {teacher.daysAvailable}
        </p>
      </Card>

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
