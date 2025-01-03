import React, { useEffect, useState } from "react";
import { Card, Avatar, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TeachersPage.css";

// changed

interface Professor {
  id: number;
  name: {
    en: string;
    fa: string;
  };
  department: {
    en: string;
    fa: string;
  };
}

const TeachersPage: React.FC = () => {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 20; // Number of professors per page
  const totalPages = Math.ceil(professors.length / itemsPerPage);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/professors/all/");
        setProfessors(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching professors:", err);
        setError("خطا در بارگذاری اطلاعات. لطفاً دوباره تلاش کنید.");
        setLoading(false);
      }
    };

    fetchProfessors();
  }, []);

  const handleViewDetails = (professor: Professor) => {
    navigate(`/professor/${professor.id}`, {
      state: {
        id: professor.id,
        name: professor.name,
        department: professor.department,
      },
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedProfessors = professors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <div className="container_teachers">
        {paginatedProfessors.map((professor) => (
          <Card
            key={professor.id}
            isHoverable
            variant="bordered"
            className="card"
          >
            <div className="header">
              <Avatar size="lg" text={professor.name.fa[0]} />
              <div>
                <h4 className="title">{professor.name.fa}</h4>
                <p className="description">{professor.department.fa}</p>
              </div>
            </div>
            <p>دپارتمان: {professor.department.fa}</p>
            <Button
              size="sm"
              className="btn"
              onClick={() => handleViewDetails(professor)}
            >
              مشاهده نظرات / ثبت نظر
            </Button>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`pagination-btn ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeachersPage;
