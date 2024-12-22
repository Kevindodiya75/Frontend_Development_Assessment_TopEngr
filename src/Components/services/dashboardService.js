const fetchDashboardData = async () => {
  try {
    const response = await fetch(
      "https://test.topengr.com/api/v1/assessment/dashboard"
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch dashboard data. Status: ${response.status} (${response.statusText})`
      );
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in fetchDashboardData:", error.message);
    throw new Error("Unable to retrieve dashboard data at this time.");
  }
};

export default fetchDashboardData;
