require('dotenv').config();
const { test, expect } = require('@playwright/test');
const path = require('path');


// Access the environment variables
const baseUrl = process.env.BASE_URL;
const userName = process.env.USER_NAME;
const password = process.env.PASSWORD;

test.setTimeout(600000); // 600 seconds for all tests in this file

test('Login, navigate through list, and make new compaingn and creative', async ({ page }) => {
  //step 1 login
  // Navigate to the login page
  await page.goto(baseUrl);

  // Fill in login credentials
  await page.fill('input[type="email"]', userName);
  await page.fill('input[type="password"]', password);

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

  // Step 3: Click on "new compaign" button to make new campaig
  await page.getByRole('button', { name: 'NEW CAMPAIGNS' }).click();
  // timer to wait for the page to load
  await page.waitForTimeout(5000);


  // Step 4: Fill in the form with the required data
  const compaingnNameInput = page.locator('input#campaignName');
  // fill the input field with the compaign name
  await compaingnNameInput.fill('Abdulwahab');

  // Step 5: Fill in the form with the required data

  // find the input field for the compaign job number optional
  const CJobNumberInput = page.locator('input#jobNumber');
  // fill the input field with the compaign job number
  await CJobNumberInput.fill('Abdulwahab optional test');

  // ge the submit button and click on it
  await page.getByRole('button', { name: 'SUBMIT' }).click();

  // timer to wait for the page to load
  await page.waitForTimeout(5000);

  // Step 6: Click on "new creative" button to make new creative
  await page.getByRole('button', { name: 'NEW CREATIVE' }).click();

  // timer to wait for the page to load
  await page.waitForTimeout(5000);

  // Step 7: Fill in the form with the required data

  // there is first dropdown for select the compaign name
  const compaignNameDropdown = page.locator('select#campaignName');
  // select the compaign name
  await compaignNameDropdown.selectOption('Abdulwahab');

  // then there is creative name input field
  const creativeNameInput = page.locator('input#creativeName');

  // fill the input field with the creative name
  await creativeNameInput.fill('Abdulwahab name test');

  // then there is creative job number input field
  const creativeJobNumberInput = page.locator('input#jobNumber');
  // fill the input field with the creative job number
  await creativeJobNumberInput.fill('Abdulwahab creative job number test');

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
  await page.waitForTimeout(5000);


});