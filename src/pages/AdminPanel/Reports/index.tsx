import React, { useState } from "react";
import "./Reports.css";
import { useTranslation } from "react-i18next";

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
    name: "علی حسینی",
    joinDate: "1402/01/15",
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
    joinDate: "1401/12/10",
    deleteDate: "1402/05/01",
    recentAccessPairs: [
      { entry: "09:15", exit: "12:00" },
      { entry: "13:30", exit: "15:00" },
      { entry: "17:00", exit: "19:45" },
    ],
  },
  {
    id: 3,
    name: "مهدی کاظمی",
    joinDate: "1400/06/20",
    deleteDate: null,
    recentAccessPairs: [
      { entry: "11:00", exit: "13:00" },
      { entry: "14:30", exit: "16:15" },
      { entry: "17:45", exit: "20:00" },
    ],
  },
  {
    id: 4,
    name: "سارا مرادی",
    joinDate: "1401/02/10",
    deleteDate: null,
    recentAccessPairs: [
      { entry: "08:30", exit: "12:30" },
      { entry: "13:00", exit: "15:45" },
      { entry: "16:30", exit: "19:00" },
    ],
  },
  {
    id: 5,
    name: "فاطمه رضایی",
    joinDate: "1399/11/05",
    deleteDate: "1402/02/20",
    recentAccessPairs: [
      { entry: "07:45", exit: "10:15" },
      { entry: "12:30", exit: "14:45" },
      { entry: "15:30", exit: "18:00" },
    ],
  },
  {
    id: 6,
    name: "امیر صادقی",
    joinDate: "1400/01/10",
    deleteDate: null,
    recentAccessPairs: [
      { entry: "09:00", exit: "11:30" },
      { entry: "13:00", exit: "15:30" },
      { entry: "17:30", exit: "20:00" },
    ],
  },
  {
    id: 7,
    name: "مریم اکبری",
    joinDate: "1401/04/18",
    deleteDate: null,
    recentAccessPairs: [
      { entry: "08:15", exit: "11:45" },
      { entry: "12:30", exit: "15:00" },
      { entry: "16:00", exit: "19:00" },
    ],
  },
  {
    id: 8,
    name: "حسین موسوی",
    joinDate: "1402/06/01",
    deleteDate: null,
    recentAccessPairs: [
      { entry: "10:00", exit: "12:30" },
      { entry: "13:00", exit: "15:30" },
      { entry: "16:30", exit: "19:00" },
    ],
  },
  {
    id: 9,
    name: "ناهید سلطانی",
    joinDate: "1402/04/20",
    deleteDate: null,
    recentAccessPairs: [
      { entry: "09:45", exit: "12:15" },
      { entry: "13:15", exit: "15:45" },
      { entry: "16:30", exit: "19:00" },
    ],
  },
  {
    id: 10,
    name: "رضا شیرازی",
    joinDate: "1401/08/15",
    deleteDate: null,
    recentAccessPairs: [
      { entry: "07:30", exit: "10:00" },
      { entry: "12:00", exit: "14:30" },
      { entry: "15:00", exit: "17:30" },
    ],
  },
  {
    id: 11,
    name: "علیرضا صالحی",
    joinDate: "1401/01/12",
    deleteDate: null,
    recentAccessPairs: [
      { entry: "08:00", exit: "10:30" },
      { entry: "11:00", exit: "13:30" },
      { entry: "14:00", exit: "16:30" },
    ],
  },
  {
    id: 12,
    name: "فرزاد محمدی",
    joinDate: "1400/09/20",
    deleteDate: null,
    recentAccessPairs: [
      { entry: "09:30", exit: "12:00" },
      { entry: "12:30", exit: "15:00" },
      { entry: "15:30", exit: "18:00" },
    ],
  },
  {
    id: 13,
    name: "شادی کاظمی",
    joinDate: "1402/02/01",
    deleteDate: null,
    recentAccessPairs: [
      { entry: "08:30", exit: "11:00" },
      { entry: "12:00", exit: "14:30" },
      { entry: "15:00", exit: "17:30" },
    ],
  },
  {
    id: 14,
    name: "کامران طاهری",
    joinDate: "1402/07/15",
    deleteDate: null,
    recentAccessPairs: [
      { entry: "09:00", exit: "12:30" },
      { entry: "13:00", exit: "15:30" },
      { entry: "16:00", exit: "18:30" },
    ],
  },
  {
    id: 15,
    name: "بهزاد جمشیدی",
    joinDate: "1401/03/25",
    deleteDate: null,
    recentAccessPairs: [
      { entry: "10:00", exit: "12:30" },
      { entry: "13:00", exit: "15:30" },
      { entry: "16:00", exit: "18:00" },
    ],
  },
  {
    id: 16,
    name: "آزاده یوسفی",
    joinDate: "1400/07/07",
    deleteDate: null,
    recentAccessPairs: [
      { entry: "08:00", exit: "10:30" },
      { entry: "11:00", exit: "13:30" },
      { entry: "14:00", exit: "16:30" },
    ],
  },
  {
    id: 17,
    name: "حسین یزدی",
    joinDate: "1401/11/05",
    deleteDate: null,
    recentAccessPairs: [
      { entry: "09:30", exit: "12:00" },
      { entry: "12:30", exit: "15:00" },
      { entry: "15:30", exit: "18:00" },
    ],
  },
  {
    id: 18,
    name: "محمود قاسمی",
    joinDate: "1399/12/12",
    deleteDate: null,
    recentAccessPairs: [
      { entry: "07:30", exit: "09:30" },
      { entry: "11:00", exit: "13:30" },
      { entry: "14:00", exit: "16:30" },
    ],
  },
  {
    id: 19,
    name: "ستار اسدی",
    joinDate: "1401/05/08",
    deleteDate: null,
    recentAccessPairs: [
      { entry: "08:15", exit: "10:45" },
      { entry: "11:30", exit: "14:00" },
      { entry: "14:30", exit: "16:30" },
    ],
  },
  {
    id: 20,
    name: "سینا نیکو",
    joinDate: "1400/12/01",
    deleteDate: null,
    recentAccessPairs: [
      { entry: "09:00", exit: "11:30" },
      { entry: "12:00", exit: "14:30" },
      { entry: "15:00", exit: "17:30" },
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
                {report.deleteDate
                  ? report.deleteDate
                  : t("reports.not_deleted")}
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
