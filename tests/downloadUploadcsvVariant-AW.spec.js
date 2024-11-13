// test Case ID: TC_ID_43

// test for download and upload csv at variants table
// test case goes scene login, client, compaign, creative, variant tab, download csv and then upload csv.

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');


test('Download and Upload CVS at Variatns Table', async ({ page }) => {

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
    await page.waitForTimeout(5000);

    // Step 5: Click on client name in the list
    await page.locator('text=QA').click();

    // timer to wait for the page to load
    await page.waitForTimeout(5000);

    // Step 6: Click on compaign name in the campaign list
    await page.locator('text=Automated wahab').click();

    // timer to wait for the page to load
    await page.waitForTimeout(5000);

    // Step 7: Click on creative name within the expanded accordion
    await page.locator('div.block >> text="limited edition"').click();

    // timer to wait for the page to load
    await page.waitForTimeout(5000);

    // Step 8: Switch from "Master" to "Variants" by clicking on the "Variants" div
    await page.locator('div:text("Variants")').click();

    // timer to wait for the page to load
    await page.waitForTimeout(5000);

    if (await page.locator('text="Document Features"').isVisible()) {
        // a model pop up will appear Document Features, click on "checkbox" and then next button
        await expect(page.locator('text="Document Features"')).toBeVisible();

        // click on the checkbox which should be all
        await page.locator('[role="checkbox"][aria-checked="false"]').click();

        // click on the next button
        await page.getByRole('button', { name: 'Next' }).click();
    }

    // Step 9: Wait for the "Processing" modal to disappear
    await page.waitForSelector('text=Processing', { state: 'hidden' });

    // wait for the process to complete
    await page.waitForTimeout(5000);


    // Step 10: Define the download path and create the folder if it doesn't exist in same directory
    const downloadPath = path.join(__dirname, './fixtures');
    if (!fs.existsSync(downloadPath)) {
        fs.mkdirSync(downloadPath);
    }

    // Step 11: Click the "Download CSV" button and wait for the download to start
    const [download] = await Promise.all([
        // Wait for the download event to trigger
        page.waitForEvent('download'),
        // Clicks the download button
        page.getByRole('button', { name: 'Download CSV' }).click()
    ]);


    // Step 12: Save the downloaded file to path
    const pathToFile = path.join(downloadPath, 'downloaded.csv');
    await download.saveAs(pathToFile);
    console.log('File downloaded as:', pathToFile);

    // timer to wait for the page to load
    await page.waitForTimeout(5000);

    // Check if the file exists after saving
    if (!fs.existsSync(pathToFile)) {
        throw new Error(`Downloaded file not found at ${pathToFile}`);
    } else {
        console.log('File confirmed to exist before upload.');
    }

    // Step 13: Upload the downloaded file
    const filePath = path.resolve('fixtures', pathToFile);
    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.getByRole('button', { name: 'UPLOAD CSV' }).click()
    ]);

    // Step 14: Set the files to be uploaded
    await fileChooser.setFiles(filePath);

    // wait for the process to complete
    await page.waitForSelector('text=Please hold while the variants are being created.', { state: 'hidden' });

    // timer to wait for the page to load
    await page.waitForTimeout(5000);
});