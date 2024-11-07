// test Case ID: TC_ID_48

// this test case is for resize master
// test case goes scene login, client, compaign, creative, Master tab and click on resize button which is in poster card

const { test, expect } = require('@playwright/test');
const path = require('path');
const os = require('os');

// 600 seconds for all tests in this file
test.setTimeout(600000);

// set path to the system Downloads directory using builtin os module
const downloadPath = path.join(os.homedir(), 'Downloads');


test('Replace poster at masters', async ({ page }) => {

    //step 1: Navigate to the login page
    await page.goto('https://assets.dev.dojo.otomo.io/home/login');

    //step 2: Login with valid credentials
    await page.fill('input[type="email"]', 'zak@solarnex.com');
    await page.fill('input[type="password"]', 'wahab123');

    // step 3: Click login button
    await page.getByRole('button', { name: 'login' }).click();

    // step 4: check if dashboard page is displayed Assertion of page title
    await expect(page).toHaveTitle('InDesign Transform');

    // timer to wait for the page to load
    await page.waitForTimeout(3000);

    // Step 5: Click on client "Freezone Internet" in the list
    await page.locator('text=Freezone Internet').click();

    // timer to wait for the page to load
    await page.waitForTimeout(3000);

    // Step 6: Click on "wahab campaign" in the campaign list
    await page.locator('text=wahab campaign').click();

    // timer to wait for the page to load
    await page.waitForTimeout(3000);

    // Step 7: Click on "Abdulwahab creative test" within the expanded accordion
    await page.locator('div.block >> text="Abdulwahab creative test"').click();

    // timer to wait for the page to load
    await page.waitForTimeout(3000);

    // Step 8: Click on "Master" tab
    await page.locator('text=Master').click();

    
    
});