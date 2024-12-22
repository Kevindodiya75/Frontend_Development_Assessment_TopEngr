import { test, expect } from "@playwright/test";

test.describe("Dashboard Component Tests", () => {
  const dashboardUrl = "http://localhost:5173/"; // Ensure the correct URL is used

  test("should render the dashboard with data points and chart", async ({
    page,
  }) => {
    // Navigate to the Dashboard page
    await page.goto(dashboardUrl);

    // Validate the presence of data point cards
    const dataPointCards = await page.locator(".info-card");
    await expect(dataPointCards).toHaveCount(3);

    // Validate content inside each data point card
    const dp1 = await page.locator(".info-card").first();
    const dp2 = await page.locator(".info-card").nth(1);
    const dp3 = await page.locator(".info-card").nth(2);

    await expect(dp1).toContainText("Data Point 1");
    await expect(dp2).toContainText("Data Point 2");
    await expect(dp3).toContainText("Data Point 3");

    // Check if the chart is rendered
    const chart = await page.locator(".chart-container canvas");
    await expect(chart).toBeVisible();
  });

  test("should display loading state initially for the chart", async ({
    page,
  }) => {
    // Simulate a loading state
    await page.goto(dashboardUrl);

    const loadingLabel = await page.locator("text=Loading...");
    await expect(loadingLabel).toBeVisible();

    // Ensure the loading text disappears after data loads
    await page.waitForSelector(".chart-container canvas", { state: "visible" });
    await expect(loadingLabel).not.toBeVisible();
  });

  test("should correctly update chart labels and datasets after data fetch", async ({
    page,
  }) => {
    await page.goto(dashboardUrl);

    // Wait for chart data to load
    const chart = await page.locator(".chart-container canvas");
    await expect(chart).toBeVisible();

    // Verify the labels and data in the chart
    const labels = ["Loading...", "Time Period"]; // Replace with your mock labels
    for (const label of labels) {
      const labelExists = await page.locator(`text=${label}`).isVisible();
      expect(labelExists).toBeTruthy();
    }
  });

  test("should resize correctly when sidebar toggles", async ({ page }) => {
    await page.goto(dashboardUrl);

    // Initially, verify layout with sidebar open (class should be present)
    const content = page.locator(".content");
    await expect(content).toHaveClass(/content-shrink/);

    // Simulate sidebar toggle by clicking the toggle button
    const sidebarToggle = await page.locator(".sidebar-toggle"); // Make sure the selector is correct
    await sidebarToggle.click();

    // Wait for layout to update after sidebar toggle
    await page.waitForTimeout(500); // Optional, can be adjusted based on transition duration

    // Verify the content has resized (class removed)
    await expect(content).not.toHaveClass(/content-shrink/);

    // Simulate sidebar toggle again to check the reverse case
    await sidebarToggle.click();

    // Wait for layout to update again
    await page.waitForTimeout(500); // Optional

    // Verify layout with sidebar open again
    await expect(content).toHaveClass(/content-shrink/);
  });

  test("should handle API error gracefully", async ({ page }) => {
    // Mock the API to return an error
    await page.route("**/dashboard", (route) => route.abort());

    // Navigate to the dashboard page
    await page.goto(dashboardUrl);

    // Check for error handling message
    const errorMessage = await page.locator(
      "text=Error fetching dashboard data"
    );
    await expect(errorMessage).toBeVisible();

    // Check for Retry button
    const retryButton = await page.locator("button:has-text('Retry')");
    await expect(retryButton).toBeVisible();

    // Simulate retry
    await retryButton.click();

    // Check if the error message is no longer visible after retry
    await expect(errorMessage).not.toBeVisible();
  });
});
