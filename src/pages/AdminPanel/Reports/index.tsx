import React, { useState } from "react";
import "./Reports.css";
import { useTranslation } from "react-i18next";

const getFormattedDate = (daysToAdd: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return new Intl.DateTimeFormat("fa-IR").format(date);
};

interface UserReport {
  id: number;
  name: string;
  joinDate: string;
  deleteDate: string | null;
  recentAccessPairs: { entry: string; exit: string }[];
}

const reportsData: UserReport[] = [
  {
    id: 1,
    name: "علی محمدی",
    joinDate: getFormattedDate(),
    deleteDate: null,
    recentAccessPairs: [
      { entry: "10:30", exit: "14:45" },
      { entry: "18:20", exit: "20:15" },
      { entry: "21:00", exit: "23:30" },
    ],
  },
  {
    id: 2,
    name: "زهرا احمدی",
    joinDate: getFormattedDate(),
    deleteDate: getFormattedDate(1),
    recentAccessPairs: [
      { entry: "09:15", exit: "12:00" },
      { entry: "13:30", exit: "15:00" },
      { entry: "17:00", exit: "19:45" },
    ],
  },
  {
    id: 3,
    name: "مهدی حسینی",
    joinDate: getFormattedDate(),
    deleteDate: null,
    recentAccessPairs: [
      { entry: "11:00", exit: "13:00" },
      { entry: "14:30", exit: "16:15" },
      { entry: "17:45", exit: "20:00" },
    ],
  },
  {
    id: 4,
    name: "فرگل نصیری",
    joinDate: getFormattedDate(),
    deleteDate: null,
    recentAccessPairs: [
      { entry: "08:30", exit: "12:30" },
      { entry: "13:00", exit: "15:45" },
      { entry: "16:30", exit: "19:00" },
    ],
  },
  {
    id: 5,
    name: "هانیه کریمی",
    joinDate: getFormattedDate(),
    deleteDate: getFormattedDate(1),
    recentAccessPairs: [
      { entry: "07:45", exit: "10:15" },
      { entry: "12:30", exit: "14:45" },
      { entry: "15:30", exit: "18:00" },
    ],
  },
  {
    id: 6,
    name: "امیررضا قاسمی",
    joinDate: getFormattedDate(),
    deleteDate: null,
    recentAccessPairs: [
      { entry: "09:00", exit: "11:30" },
      { entry: "13:00", exit: "15:30" },
      { entry: "17:30", exit: "20:00" },
    ],
  },
  {
    id: 7,
    name: "سمیرا علوی",
    joinDate: getFormattedDate(),
    deleteDate: null,
    recentAccessPairs: [
      { entry: "08:15", exit: "11:45" },
      { entry: "12:30", exit: "15:00" },
      { entry: "16:00", exit: "19:00" },
    ],
  },
];

const Reports: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredReports = reportsData.filter((report) =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="reports">
      <h1 className="reports-title">{t("reports.title")}</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={t("reports.search_placeholder")}
        className="reports-search"
      />
      <div className="report-cards">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <div key={report.id} className="report-card">
              <h2 className="report-name">{report.name}</h2>
              <p>
                <strong>{t("reports.join_date")}:</strong> {report.joinDate}
              </p>
              <p>
                <strong>{t("reports.delete_date")}:</strong>{" "}
                {report.deleteDate ? report.deleteDate : t("reports.not_deleted")}
              </p>
              <div>
                <strong>{t("reports.recent_activity")}:</strong>
                <table className="access-table">
                  <thead>
                    <tr>
                      <th>{t("reports.entry")}</th>
                      <th>{t("reports.exit")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.recentAccessPairs.map((pair, index) => (
                      <tr key={index}>
                        <td>{pair.entry}</td>
                        <td>{pair.exit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">{t("reports.no_results")}</p>
        )}
      </div>
    </div>
  );
};

export default Reports;
