import { test, expect } from "@playwright/test";

test("search duckduckgo", async ({ page }) => {
  await page.goto("https://duckduckgo.com");

  const searchField = await page.locator("input[type='text']");
  await searchField.fill("Playwright");
  await searchField.press("Enter");

  const results = await page.locator(".react-results--main > li");
  await expect(results).toHaveCount(11);
  await expect(results.count()).resolves.toBeGreaterThan(0);

  let found = false;
  for (let i = 0; i < (await results.count()); i++) {
    const result = await results.nth(i);
    const text = await result.innerText();
    if (text.includes("Playwright")) {
      found = true;
      break;
    }
  }

  expect(found).toBe(true);
});

test("Search the text 'Palm Treo Pro  ", async ({ page }) => {
  await page.goto("https://ecommerce-playground.lambdatest.io/");
  await page.locator("span.title", { hasText: "Mega Menu" }).hover();
  await page.locator("a[title=Desktop]").click();
  await page
    .locator("div.carousel-item.active > img[title='Palm Treo Pro']")
    .click();
  await page.locator("#container button[title='Add to Cart']").click();
  await page
    .locator("a.btn.btn-primary.btn-block", { hasText: "View Cart" })
    .click();
  await expect(
    page.locator("td.text-left", { hasText: "Palm Treo Pro" })
  ).toBeVisible();
  await expect(page.locator("div[class$='flex-nowrap'] > input")).toHaveValue(
    "1"
  );
});
