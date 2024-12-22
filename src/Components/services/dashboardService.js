const fetchDashboardData = async () => {
  try {
    const response = await fetch(
      "https://test.topengr.com/api/v1/assessment/dashboard"
    );
    if (!response.ok) {
      // Custom error message with the status code
      throw new Error(
        `Failed to fetch dashboard data. Status: ${response.status} (${response.statusText})`
      );
    }
    const result = await response.json();
    return result;
  } catch (error) {
    // Log the error for debugging
    console.error("Error in fetchDashboardData:", error.message);
    // Re-throw the error so it can be handled by the calling component
    throw new Error("Unable to retrieve dashboard data at this time.");
  }
};

export default fetchDashboardData;
