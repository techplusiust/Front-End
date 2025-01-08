import React from "react";
import { Card, Avatar, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { generateTeachers } from "../../utils/generateProfiles";
import { useTranslation } from "react-i18next";
import "./TeachersPage.css";

const teachers = generateTeachers(20);

const TeachersPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleViewDetails = (teacher: any) => {
    navigate(`/professor/${teacher.id}`, { state: teacher });
  };

  return (
    <div className="container_teachers">
      {teachers.map((teacher) => (
        <Card
          key={teacher.id}
          isHoverable
          style={{ border: "1px solid #ddd" }}
          className="card"
        >
          <div className="header">
            <Avatar src={teacher.image} size="lg" />
            <div>
              <h4 className="title">{teacher.name}</h4>
              <p className="description">{teacher.degree}</p>
            </div>
          </div>
          <p>
            {t("teachers.subject")}: {teacher.subject}
          </p>
          <p>
            {t("teachers.days_available")}: {teacher.daysAvailable}
          </p>
          <Button
            size="sm"
            className="btn"
            onClick={() => handleViewDetails(teacher)}
          >
            {t("teachers.view_and_review")}
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default TeachersPage;
