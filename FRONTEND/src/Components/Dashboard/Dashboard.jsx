import React, { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSidebar } from "../Sidebar/SidebarContext";
import fetchDashboardData from "../services/dashboardService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [apidata, setApidata] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isSidebarOpen } = useSidebar();

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await fetchDashboardData();
      setApidata({
        dp1: result.dp1,
        dp2: result.dp2,
        dp3: result.dp3,
        labels: result.labels,
        data1: result.data1,
        data2: result.data2,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const data = {
    labels: apidata?.labels || ["Loading..."],
    datasets: [
      {
        label: "Dataset 1",
        data: apidata?.data1 || [0, 0, 0, 0],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
      {
        label: "Dataset 2",
        data: apidata?.data2 || [0, 0, 0, 0],
        borderColor: "rgba(192,75,192,1)",
        backgroundColor: "rgba(192,75,192,0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Performance Over Time",
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Time Period" },
      },
      y: {
        title: { display: true, text: "Values" },
      },
    },
  };

  if (loading) {
    return <div className="text-center text-secondary">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-danger">
        Error fetching dashboard data.
        <button onClick={loadData} className="btn btn-primary mt-3">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={`content ${isSidebarOpen ? "content-shrink" : ""}`}>
      <div className="dashboard-container container mt-4">
        <div className="card shadow-lg rounded p-3">
          <h1 className="text-center mb-4 text-primary">Dynamic Dashboard</h1>
          {apidata && (
            <>
              {/* Data Points */}
              <div className="row g-3 mb-4">
                {["dp1", "dp2", "dp3"].map((key, index) => (
                  <div key={index} className="col-12 col-md-6 col-lg-4">
                    <div className="info-card card text-center shadow-sm border-0">
                      <div className="card-body">
                        <h5 className="card-title text-secondary">
                          {`Data Point ${index + 1}`}
                        </h5>
                        <p className="card-text text-dark display-6">
                          {apidata[key]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="chart-container rounded shadow p-3">
                <Line data={data} options={options} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
