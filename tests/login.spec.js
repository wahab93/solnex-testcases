require('dotenv').config();
const { test, expect } = require('@playwright/test');

// test('login user and password test', async ({ page }) => {
// // Navigate to the login page
// await page.goto('https://assets.dev.dojo.otomo.io/home/login');

// // Fill in login credentials
// await page.fill('input[type="email"]', 'zak@solarnex.com');
// await page.fill('input[type="password"]', 'wahab123');

//   // Click login button
//   await page.getByRole('button', {name: 'login'}).click();
//   // await page.click('button[type="submit"]');

// // Assertion of page title
// await expect(page).toHaveTitle('InDesign Transform');
// // timer to wait for the page to load
// await page.waitForTimeout(5000);

//   // Verify successful login
//   expect(page.url()).not.toContain('/login');
// });

test.setTimeout(600000); // 600 seconds for all tests in this file

test('Login, navigate through list, and open Variants tab', async ({ page }) => {
  //step 1 login
  // Navigate to the login page
  await page.goto('https://assets.dev.dojo.otomo.io/home/login');

  // Fill in login credentials
  await page.fill('input[type="email"]', 'zak@solarnex.com');
  await page.fill('input[type="password"]', 'wahab123');

  // Click login button
  await page.getByRole('button', { name: 'login' }).click();

  // Assertion of page title
  await expect(page).toHaveTitle('InDesign Transform');
  // timer to wait for the page to load
  await page.waitForTimeout(5000);

  // Step 2: Click on "Freezone Internet" in the list
  // locate the element by text and click on it
  const freezoneInternet = page.locator('text=Freezone Internet');
  await freezoneInternet.click();

  // Step 3: Click on "Syed Hamza-1-14" in the campaign list
  // locate the element by text and click on it
  const campaignItem = page.locator('text=Syed Hamza-1-14');
  await campaignItem.click();

  // Step 4: Click on "Syed Hamza-1-18" within the expanded accordion
  // locate the element by text and click on it
  const accordionItem = page.locator('text=Syed Hamza-1-18');
  await accordionItem.click();
  // timer to wait for the page to load
  await page.waitForTimeout(5000);

  // Step 5: Switch from "Master" to "Variants" by clicking on the "Variants" div
  // locate the element by text and click on it
  const variantsDiv = page.locator('div:text("Variants")');
  await variantsDiv.click();
  // timer to wait for the page to load
  await page.waitForTimeout(5000);

  // // Step 6: Locate the search filter in Variants tab and search for an item
  // // locate the element by id and fill in the search input
  // const searchInput = page.locator('input#searchQuery');
  // // write what you want to search for
  // const searchTerm = 'Poster_tagged';
  // // fill in the search input
  // await searchInput.fill(searchTerm);

  // // Log the value currently in the search input
  // const typedValue = await searchInput.inputValue();
  // console.log(`Typed value in search input: "${typedValue}"`);

  // // Step 7: Verify that the search results contain the expected item
  // // locate the element by class and get the text content of the first result
  // const searchResults = page.locator('.variant-row');
  //  // Get the text content of the first result
  // const firstResultText = await searchResults.nth(0).innerText();
  // console.log(`First search result text: "${firstResultText}"`);
  // // wait for the page to load
  // await page.waitForTimeout(5000);
});