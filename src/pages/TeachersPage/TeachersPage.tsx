import React from "react";
import { Card, Avatar, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom"; 
import { generateTeachers } from "../../utils/generateProfiles";
import "./TeachersPage.css";

const teachers = generateTeachers(20);

const TeachersPage: React.FC = () => {
  const navigate = useNavigate();

  const handleViewDetails = (teacher: any) => {
    navigate(`/professor/${teacher.id}`, { state: teacher });
  };

  return (
    <div className="container">
      {teachers.map((teacher) => (
        <Card key={teacher.id} isHoverable style={{ border: "1px solid #ddd" }} className="card">
          <div className="header">
            <Avatar src={teacher.image} size="lg" />
            <div>
              <h4 className="title">{teacher.name}</h4>
              <p className="description">{teacher.degree}</p>
            </div>
          </div>
          <p>موضوع تدریس: {teacher.subject}</p>
          <p>روزهای حضور: {teacher.daysAvailable}</p>
          <Button size="sm" className="btn" onClick={() => handleViewDetails(teacher)}>
            مشاهده نظرات / ثبت نظر
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default TeachersPage;
