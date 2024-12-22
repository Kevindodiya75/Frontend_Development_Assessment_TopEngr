import { test, expect } from "@playwright/test";

test.describe("Form Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/form");
  });

  test("should successfully submit the form", async ({ page }) => {
    await page.fill("#firstName", "John");
    await page.fill("#lastName", "Doe");
    await page.fill("#email", "john.doe@example.com");
    await page.fill("#city", "NewYork");
    await page.fill("#state", "NY");
    await page.fill("#country", "USA");

    await page.click('button:has-text("Submit")');

    await expect(page.locator(".Toastify__toast--success")).toHaveText(
      "Form submitted successfully!"
    );

    await expect(page.locator('button:has-text("Update")')).toBeVisible();
    await expect(page.locator('button:has-text("Close")')).toBeVisible();
  });

  test("should successfully update the form", async ({ page }) => {
    await page.fill("#firstName", "John");
    await page.fill("#lastName", "Doe");
    await page.fill("#email", "john.doe@example.com");
    await page.fill("#city", "NewYork");
    await page.fill("#state", "NY");
    await page.fill("#country", "USA");
    await page.click('button:has-text("Submit")');

    await expect(page.locator('button:has-text("Update")')).toBeVisible();

    await page.fill("#firstName", "Jane");
    await page.fill("#lastName", "Smith");

    await page.click('button:has-text("Update")');

    await expect(page.locator(".Toastify__toast--success")).toHaveText(
      "Form updated successfully!"
    );

    await expect(page.locator("#firstName")).toHaveValue("");
    await expect(page.locator("#lastName")).toHaveValue("");
  });

  test("should reset the form when clicking Close", async ({ page }) => {
    await page.fill("#firstName", "John");
    await page.fill("#lastName", "Doe");
    await page.fill("#email", "john.doe@example.com");
    await page.fill("#city", "NewYork");
    await page.fill("#state", "NY");
    await page.fill("#country", "USA");
    await page.click('button:has-text("Submit")');

    await expect(page.locator('button:has-text("Close")')).toBeVisible();

    await page.click('button:has-text("Close")');

    await expect(page.locator("#firstName")).toHaveValue("");
    await expect(page.locator("#lastName")).toHaveValue("");
    await expect(page.locator("#email")).toHaveValue("");
    await expect(page.locator("#city")).toHaveValue("");
    await expect(page.locator("#state")).toHaveValue("");
    await expect(page.locator("#country")).toHaveValue("");
  });

  test("should show validation errors when submitting with empty fields", async ({
    page,
  }) => {
    await page.click('button:has-text("Submit")');

    await expect(page.locator("#firstName + .invalid-feedback")).toHaveText(
      "First Name is required"
    );
    await expect(page.locator("#lastName + .invalid-feedback")).toHaveText(
      "Last Name is required"
    );
    await expect(page.locator("#email + .invalid-feedback")).toHaveText(
      "Email is required"
    );
    await expect(page.locator("#city + .invalid-feedback")).toHaveText(
      "City is required"
    );
    await expect(page.locator("#state + .invalid-feedback")).toHaveText(
      "State is required"
    );
    await expect(page.locator("#country + .invalid-feedback")).toHaveText(
      "Country is required"
    );
  });

  test("should show validation errors for invalid email", async ({ page }) => {
    await page.fill("#firstName", "John");
    await page.fill("#lastName", "Doe");
    await page.fill("#email", "invalid-email");
    await page.fill("#city", "NewYork");
    await page.fill("#state", "NY");
    await page.fill("#country", "USA");

    await page.click('button:has-text("Submit")');

    await expect(page.locator("#email + .invalid-feedback")).toHaveText(
      "Email is invalid"
    );
  });
});
