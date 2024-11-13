// this test case is for downloading the asset and uploading at variant tab using asset library button
// test case goes scene login, client, compaign, creative, variant tab, asset library button, download asset, upload asset and delete one asset
// pre requirement is to upload the asset in the asset library , first make comapaign and creative and then use this to go.
// i think there should be popup that assets are uploaded successfully so that we can wait for that popup to appear.

const { test, expect } = require('@playwright/test');
const path = require('path');
const os = require('os');

// 600 seconds for all tests in this file
test.setTimeout(600000);

// set path to the system Downloads directory using builtin os module
const downloadPath = path.join(os.homedir(), 'Downloads');

test('Download and Upload assets at Variatns page', async ({ page }) => {
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
    await page.waitForTimeout(2000);

    // Step 5: Click on client name in the list
    await page.locator('text=QA').click();

    // timer to wait for the page to load
    await page.waitForTimeout(2000);

    // Step 6: Click on compaign name in the campaign list
    await page.locator('text=Automated wahab').click();

    // timer to wait for the page to load
    await page.waitForTimeout(2000);

    // Step 7: Click on creative name with in the expanded accordion
    await page.locator('div.block >> text="limited edition"').click();

    // timer to wait for the page to load
    await page.waitForTimeout(3000);

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
    await page.waitForTimeout(3000);


    // Step 10: Click on "Asset Library" button
    await page.getByRole('button', { name: 'Asset Library' }).click()

    // timer to wait for the page to load
    await page.waitForTimeout(3000);

    // Step 11: check if the asset library 'Linked File Library' model is displayed
    await expect(page.locator('div.ReactModal__Content >> text="Linked File Library"')).toBeVisible();

    // timer to wait for the page to load
    await page.waitForTimeout(3000);


    // // Step 1: Get the initial count of asset cards
    // const initialCardCount = await page.locator('div.border.border-gray-300.rounded-md.p-4.flex.flex-col.w-52.h-64.overflow-hidden').count(); // Modify this selector to match your actual asset card element
    // console.log(`Initial card count: ${initialCardCount}`);

    // Step 12: Click on "Download" button

    // Set up a download listener
    const [download] = await Promise.all([
        // Waits for the download event
        page.waitForEvent('download'),
        // Clicks the download button
        page.getByRole('button', { name: 'DOWNLOAD ASSETS' }, { exact: true }).click()
    ]);


    // Confirm that download started
    console.log('Download started...');

    // check download completes and check for any errors
    try {
        // by default playwright Temporary path
        const filePath = await download.path();
        console.log(`Downloaded file temporary path: ${filePath}`);

        // Move downloaded file to the predefined downloaded path like Downloads folder and rename it to downloadedProject.zip
        const savedFilePath = path.join(downloadPath, 'downloadedAssets.zip');

        await download.saveAs(savedFilePath);

        console.log(`File saved to: ${savedFilePath}`);

    } catch (error) {
        console.error('Error saving the downloaded file:', error);
    }


    // Step 13: Click on "UPLOAD ASSETS" button to upload zip file
    const filePath = path.resolve(downloadPath, 'downloadedAssets.zip');

    // Step 13: Listen for the `filechooser` event triggered by the button click
    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.getByRole('button', { name: 'UPLOAD ASSETS' }).click()
    ]);

    // Step 14: Set the files to be uploaded
    await fileChooser.setFiles(filePath);

    // timer to wait for the page to load
    await page.waitForTimeout(10000);

    // // Step 15: delete one of assets from the the previewed assets using delete icon
    // // Locate the last div with the specified classes and click the svg inside it
    // await page.locator('div.border.border-gray-300').last().locator('svg').click();

    // // timer to wait for the page to load
    // await page.waitForTimeout(10000);

});