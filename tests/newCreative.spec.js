const { test, expect } = require('@playwright/test');
const path = require('path');

test.setTimeout(600000); // 600 seconds for all tests in this file

test('Login, navigate through list, and make new compaingn and creative', async ({ page }) => {
  //step 1 login
  await page.goto('https://assets.dev.dojo.otomo.io/home/login');

  // Fill in login credentials
  await page.fill('input[type="email"]', 'zak@solarnex.com');
  await page.fill('input[type="password"]', 'wahab123');

  // Click login button
  await page.getByRole('button', { name: 'login' }).click();

  // Assertion of page title
  await expect(page).toHaveTitle('InDesign Transform');

  // timer to wait for the page to load
  await page.waitForTimeout(2000);

  // Step 2: Click on "Freezone Internet" in the list
  await page.locator('text=Freezone Internet').click();

  // Step 3: Click on "new compaign" button to make new campaig
  await page.getByRole('button', { name: 'NEW CAMPAIGNS' }).click();

  // timer to wait for the page to load
  await page.waitForTimeout(2000);

  // Step 4: Fill in the form with the required data
  // define creative name
  let compaignName = 'Abdulwahab 05-11';
  
  // Step 5: Fill in the form with the required data
  await page.locator('input#campaignName').fill(compaignName);
  await page.locator('input#jobNumber').fill('Abdulwahab optional 05-11');

  // get the submit button and click on it
  await page.getByRole('button', { name: 'SUBMIT' }).click();

  // timer to wait for the page to load
  await page.waitForTimeout(2000);

  // Step 6: Click on "new creative" button to make new creative
  await page.getByRole('button', { name: 'NEW CREATIVE' }).click();

  // timer to wait for the page to load
  await page.waitForTimeout(2000);

  // Step 7: Fill in the form with the required data

  await page.locator('select#campaignName').selectOption(compaignName);
  await page.locator('input#creativeName').fill('Abdulwahab creative name 05-11');
  await page.locator('input#jobNumber').fill('Abdulwahab creative job number 05-11');

  // Step 8: Click on "select Zip" button to upload zip file
  const filePath = path.resolve('creativefile', 'Archive.zip');

  // Step 9: Listen for the `filechooser` event triggered by the button click
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.getByRole('button', { name: 'SELECT ZIP' }).click()
  ]);

  // Step 10: Set the files to be uploaded
  await fileChooser.setFiles(filePath);

  //step 10: click on submit button
  await page.getByRole('button', { name: 'UPLOAD' }).click();

  // timer to wait for the page to load
  await page.waitForTimeout(10000);

  // step 11: after that there is pop up open and we should wait until it process you file
  // locate the element by text and click on it
  const mastersDiv = page.locator('div:text("Masters")');
  await mastersDiv.click();

  // timer to wait for the page to load
  await page.waitForTimeout(2000);

  // wait for the process to complete and close the new creative modal
  await page.waitForSelector('text=New Creative', { state: 'hidden' });

  // timer to wait for the page to load
  await page.waitForTimeout(2000);

  // Step 16: Switch from "Master" to "Variants" by clicking on the "Variants" div
  await page.locator('div:text("MASTERS")').click();

  // Step 17: Check if the file has been processed successfully
  // wait for the process to complete
  await page.waitForSelector('text=Creative Setup', { state: 'hidden' });
});