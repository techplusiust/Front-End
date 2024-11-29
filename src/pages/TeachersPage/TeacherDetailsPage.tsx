import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Avatar, Button, Textarea } from "@nextui-org/react";
import "./TeacherDetailsPage.css";

const TeacherDetailsPage: React.FC = () => {
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
        <p>موضوع تدریس: {teacher.subject}</p>
        <p>روزهای حضور: {teacher.daysAvailable}</p>
      </Card>

      <div className="reviews-section">
        <h3 className="review-title">نظرات:</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Card key={index} className="review-card">
              {review}
            </Card>
          ))
        ) : (
          <p>هنوز نظری ثبت نشده است.</p>
        )}

        <div className="add-review">
          <Textarea
            placeholder="نظر خود را وارد کنید..."
            fullWidth
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <Button size="sm" onClick={handleAddReview}>
            ثبت نظر
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetailsPage;
