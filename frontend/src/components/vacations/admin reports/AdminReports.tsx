import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/authSlice";
import useService from "../../../hooks/useService";
import VacationReportService from "../../../services/auth-aware/VacationReportService";
import {
  BarChart, XAxis, YAxis, Tooltip, Bar,
  ResponsiveContainer, CartesianGrid
} from "recharts";
import "./AdminReports.css";

export default function AdminReports(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const jwt = useAppSelector((state) => state.auth.jwt);
  const service = useService(VacationReportService);

  const [reportData, setReportData] = useState<{ destination: string; followers: number }[]>([]);

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/not-found");
      return;
    }

    const fetch = async () => {
      try {
        const data = await service.getVacationReport();
        console.log("📊 Fetched report data:", data);
        setReportData(data);
      } catch (err) {
        console.error("Failed to fetch report:", err);
      }
    };

    fetch();
  }, [user]);



  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  async function downloadCSV() {
    try {
      const response = await fetch(`${import.meta.env.VITE_REST_SERVER_URL}/reports/vacation-followers.csv`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch CSV");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "vacation-followers.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("CSV download error:", err);
      alert("Failed to download CSV");
    }
  }

  return (
    <div className="AdminReports">
      <main className="report-section">
        <div className="report-header">
          <h2>Vacation Followers Report</h2>
          <button className="download-csv" onClick={downloadCSV}>⬇️ Download CSV</button>
        </div>

        <div className="chart-area">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="destination" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="followers" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}