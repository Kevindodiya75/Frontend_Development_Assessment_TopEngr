import { test, expect } from "@playwright/test";

test.describe("Form Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the form page
    await page.goto("http://localhost:5173/Myform");
  });

  test("should successfully submit the form", async ({ page }) => {
    // Fill out the form fields
    await page.fill("#firstName", "John");
    await page.fill("#lastName", "Doe");
    await page.fill("#email", "john.doe@example.com");
    await page.fill("#city", "NewYork");
    await page.fill("#state", "NY");
    await page.fill("#country", "USA");

    // Click the Submit button
    await page.click('button:has-text("Submit")');

    // Verify success toast message
    await expect(page.locator(".Toastify__toast--success")).toHaveText(
      "Form submitted successfully!"
    );

    // Verify Update and Close buttons are visible
    await expect(page.locator('button:has-text("Update")')).toBeVisible();
    await expect(page.locator('button:has-text("Close")')).toBeVisible();
  });

  test("should successfully update the form", async ({ page }) => {
    // Submit the form first
    await page.fill("#firstName", "John");
    await page.fill("#lastName", "Doe");
    await page.fill("#email", "john.doe@example.com");
    await page.fill("#city", "NewYork");
    await page.fill("#state", "NY");
    await page.fill("#country", "USA");
    await page.click('button:has-text("Submit")');

    // Verify Update and Close buttons are visible
    await expect(page.locator('button:has-text("Update")')).toBeVisible();

    // Update some fields
    await page.fill("#firstName", "Jane");
    await page.fill("#lastName", "Smith");

    // Click the Update button
    await page.click('button:has-text("Update")');

    // Verify success toast message
    await expect(page.locator(".Toastify__toast--success")).toHaveText(
      "Form updated successfully!"
    );

    // Verify the form is reset
    await expect(page.locator("#firstName")).toHaveValue("");
    await expect(page.locator("#lastName")).toHaveValue("");
  });

  test("should reset the form when clicking Close", async ({ page }) => {
    // Submit the form first
    await page.fill("#firstName", "John");
    await page.fill("#lastName", "Doe");
    await page.fill("#email", "john.doe@example.com");
    await page.fill("#city", "NewYork");
    await page.fill("#state", "NY");
    await page.fill("#country", "USA");
    await page.click('button:has-text("Submit")');

    // Verify Update and Close buttons are visible
    await expect(page.locator('button:has-text("Close")')).toBeVisible();

    // Click the Close button
    await page.click('button:has-text("Close")');

    // Verify the form is reset
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
    // Leave all fields empty and submit the form
    await page.click('button:has-text("Submit")');

    // Verify validation error messages
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
    // Fill in the form with invalid email
    await page.fill("#firstName", "John");
    await page.fill("#lastName", "Doe");
    await page.fill("#email", "invalid-email");
    await page.fill("#city", "NewYork");
    await page.fill("#state", "NY");
    await page.fill("#country", "USA");

    // Click the Submit button
    await page.click('button:has-text("Submit")');

    // Verify that the email error message is displayed
    await expect(page.locator("#email + .invalid-feedback")).toHaveText(
      "Email is invalid"
    );
  });
});
