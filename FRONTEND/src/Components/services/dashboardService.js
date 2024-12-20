const fetchDashboardData = async () => {
  try {
    const response = await fetch(
      "https://test.topengr.com/api/v1/assessment/dashboard"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch dashboard data.");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export default fetchDashboardData;
