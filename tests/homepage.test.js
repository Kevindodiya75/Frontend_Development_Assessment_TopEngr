import { test, expect } from "@playwright/test";

test.describe("Dashboard Component Tests", () => {
  const dashboardUrl = "http://localhost:5173/";

  // pass
  test("should render the dashboard with data points and chart", async ({
    page,
  }) => {
    await page.goto(dashboardUrl);

    const dataPointCards = await page.locator(".info-card");
    await expect(dataPointCards).toHaveCount(3);

    const dp1 = await page.locator(".info-card").first();
    const dp2 = await page.locator(".info-card").nth(1);
    const dp3 = await page.locator(".info-card").nth(2);

    await expect(dp1).toContainText("Data Point 1");
    await expect(dp2).toContainText("Data Point 2");
    await expect(dp3).toContainText("Data Point 3");

    const chart = await page.locator(".chart-container canvas");
    await expect(chart).toBeVisible();
  });

  test("should display loading state initially for the chart", async ({
    page,
  }) => {
    await page.goto(dashboardUrl);

    const loadingLabel = await page.locator("text=Loading...");
    await expect(loadingLabel).toBeVisible();

    await page.waitForSelector(".chart-container canvas", { state: "visible" });
    await expect(loadingLabel).not.toBeVisible();
  });

  test("should correctly update chart labels and datasets after data fetch", async ({
    page,
  }) => {
    await page.goto(dashboardUrl);

    const chart = await page.locator(".chart-container canvas");
    await expect(chart).toBeVisible();

    const labels = ["Loading...", "Time Period"];
    for (const label of labels) {
      const labelExists = await page.locator(`text=${label}`).isVisible();
      expect(labelExists).toBeTruthy();
    }
  });

  test("should resize correctly when sidebar toggles", async ({ page }) => {
    await page.goto(dashboardUrl);

    const content = page.locator(".content");
    await expect(content).toHaveClass(/content-shrink/);

    const sidebarToggle = await page.locator(".sidebar-toggle");
    await sidebarToggle.click();

    await page.waitForTimeout(500);

    await expect(content).not.toHaveClass(/content-shrink/);

    await sidebarToggle.click();

    await page.waitForTimeout(500);

    await expect(content).toHaveClass(/content-shrink/);
  });

  test("should handle API error gracefully", async ({ page }) => {
    await page.route("**/dashboard", (route) => route.abort());

    await page.goto(dashboardUrl);

    const errorMessage = await page.locator(
      "text=Error fetching dashboard data"
    );
    await expect(errorMessage).toBeVisible();

    const retryButton = await page.locator("button:has-text('Retry')");
    await expect(retryButton).toBeVisible();

    await retryButton.click();

    await expect(errorMessage).not.toBeVisible();
  });
});
