import { expect, test } from "@playwright/test";

test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });

test("mobile navigation remains available without JavaScript", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeHidden();
  await expect(
    page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Projects", exact: true }),
  ).toBeVisible();
});
