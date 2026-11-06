import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pagesToScan = [
  "/",
  "/projects",
  "/projects/sarisaripos",
  "/about",
  "/skills",
  "/experience",
  "/contact",
  "/resume",
];
const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

for (const route of pagesToScan) {
  test(`automated WCAG checks: ${route}`, async ({ page }) => {
    await page.goto(route);
    // Wait beyond the 650ms reveal duration so axe measures the stable UI.
    await page.waitForTimeout(800);
    const results = await new AxeBuilder({ page }).withTags(tags).analyze();
    expect(results.violations).toEqual([]);
  });
}

for (const route of pagesToScan) {
  test(`automated WCAG checks in light theme: ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.getByRole("button", { name: "Switch color theme" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    // Wait beyond the 650ms reveal duration so axe measures the stable UI.
    await page.waitForTimeout(800);
    const results = await new AxeBuilder({ page }).withTags(tags).analyze();
    expect(results.violations).toEqual([]);
  });
}
