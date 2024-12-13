import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sideBar/index";

const AdminDashboard: React.FC = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px", overflowY: "auto",marginRight:"100px" , paddingRight:"100px" , paddingTop:"70px"}}>
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminDashboard;
