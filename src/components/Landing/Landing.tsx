import React from 'react';
import { NavLink } from 'react-router-dom'

const styles = {
    container: {
      backgroundColor: "#007BFF", // رنگ آبی
      color: "#fff",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      margin: 0,
    },
    header: {
      textAlign: "center" as const,
      marginBottom: "30px",
    },
    title: {
      fontSize: "3rem",
      fontWeight: "bold" as const,
      margin: 0,
    },
    subtitle: {
      fontSize: "1.2rem",
      marginTop: "10px",
    },
    main: {
      display: "flex",
      gap: "20px",
    },
    button: {
      backgroundColor: "#0056b3", // رنگ دکمه اصلی
      color: "#fff",
      padding: "15px 30px",
      fontSize: "1rem",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
  };
export default function Landing() {
  return (
    <>
      <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>سیستم انتخاب واحد</h1>
        <p style={styles.subtitle}>
          برای انتخاب واحد ترم جدید وارد سیستم شوید یا اطلاعات دوره‌ها را مشاهده کنید.
        </p>
      </header>
      <main style={styles.main}>
        <NavLink to="/login">
        <button style={styles.button}>
          ورود به سیستم
        </button>
        </NavLink>
        <NavLink to="/navbar">
        <button
          style={{ ...styles.button, backgroundColor: "#28a745" }}
          onClick={() => alert("نمایش اطلاعات دوره‌ها")}
        >
          مشاهده دوره‌ها
        </button>
        </NavLink>
      </main>
    </div>
    </>
  )
}
