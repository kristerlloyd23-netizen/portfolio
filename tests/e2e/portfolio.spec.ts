import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/projects",
  "/projects/sarisaripos",
  "/about",
  "/skills",
  "/experience",
  "/contact",
  "/resume",
];

test("all primary routes render one visible H1", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});

test("metadata, robots, sitemap, assets, and not-found route work", async ({ page, request }) => {
  for (const route of [
    "/robots.txt",
    "/sitemap.xml",
    "/og.png",
    "/projects/sarisaripos-icon.png",
  ]) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(200);
  }
  const pdf = await request.get("/resume/krister-lloyd-magalso-android-developer.pdf");
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect((await pdf.body()).subarray(0, 4).toString()).toBe("%PDF");
  await page.goto("/route-that-does-not-exist");
  await expect(page.getByRole("heading", { name: "This route doesn’t exist." })).toBeVisible();
});

test("eight owner captures render with working full-size asset links", async ({
  page,
  request,
}) => {
  await page.goto("/projects/sarisaripos#media");
  await expect(
    page.getByRole("heading", { name: "Real product media", exact: true }),
  ).toBeVisible();
  await expect(page.locator("#media figure")).toHaveCount(8);
  await expect(page.getByText("REAL APP CAPTURE REQUIRED")).toHaveCount(0);
  const firstCapture = page
    .locator("#media")
    .getByRole("link", { name: "Open full-size capture: POS catalog", exact: true });
  await expect(firstCapture).toHaveAttribute("href", "/projects/sarisaripos/01-pos.webp");
  const response = await request.get("/projects/sarisaripos/01-pos.webp");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("image/webp");
});

test("project filters show verified results and an honest empty state", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("button", { name: "Tools and Experiments", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "No published projects in this category yet." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "View all verified projects" }).click();
  await expect(page.locator("article")).toHaveCount(2);
  await page.getByRole("button", { name: "Android Development", exact: true }).click();
  await expect(page.locator("article")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "SariSariPOS", exact: true })).toBeVisible();
});

test("mobile navigation opens, closes with Escape, and routes correctly", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open navigation" });
  await menu.click();
  await expect(page.getByRole("button", { name: "Close navigation" })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open navigation" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await menu.click();
  await page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await expect(page).toHaveURL(/\/projects$/);
});

test("theme toggle persists the selected theme", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch color theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("reduced motion disables smooth scrolling and pending reveals", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    "auto",
  );
  await expect(page.locator('[data-reveal="pending"]')).toHaveCount(0);
});

test("skip link is the first keyboard destination", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
});

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`no unintended horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      const dimensions = await page.evaluate(() => ({
        viewport: window.innerWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(dimensions.content, `${route} at ${width}px`).toBeLessThanOrEqual(
        dimensions.viewport + 1,
      );
    }
  });
}

test("contact form validates and then confirms real local persistence", async ({ page }) => {
  // Isolate the reused development server's in-memory bucket between test runs.
  await page.setExtraHTTPHeaders({ "x-forwarded-for": `browser-test-${crypto.randomUUID()}` });
  await page.goto("/contact");
  await page.getByRole("button", { name: "Save message" }).click();
  await expect(page.getByText("Please check the highlighted fields.")).toBeVisible();
  await page.getByLabel("Name", { exact: true }).fill("Browser QA");
  await page.getByLabel("Email", { exact: true }).fill(`qa.${Date.now()}@example.test`);
  await page.getByLabel("Subject", { exact: true }).fill("Browser integration");
  await page
    .getByLabel("Message", { exact: true })
    .fill("This browser test verifies a real contact-store insert.");
  await page.waitForTimeout(1600);
  await page.getByRole("button", { name: "Save message" }).click();
  await expect(
    page.getByText(/Your message has been saved for follow-up\. Reference:/),
  ).toBeVisible();
});

test("print layout keeps the resume identity and removes site chrome", async ({ page }) => {
  await page.goto("/resume");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("article > header")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Krister Lloyd Magalso", exact: true }),
  ).toBeVisible();
  await expect(page.locator("body > header")).toBeHidden();
  await expect(page.locator("body > footer")).toBeHidden();
  await expect(page.getByRole("button", { name: "Print / save a copy" })).toBeHidden();
});

test("copy email provides confirmation", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/contact");
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.getByText("Email address copied.")).toBeVisible();
});
