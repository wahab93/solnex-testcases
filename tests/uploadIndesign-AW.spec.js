// test Case ID: TC_ID_44

const { test, expect } = require('@playwright/test');
const path = require('path');
const os = require('os');


test.setTimeout(600000); // 600 seconds for all tests in this file


// set path to the system Downloads directory using builtin os module
const downloadPath = path.join(os.homedir(), 'Downloads');


test('Download project from an creative and Upload this to another compaign and make creative', async ({ page }) => {

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

    // Step 5: Click on client "Freezone Internet" in the list
    await page.locator('text=Freezone Internet').click();

    // timer to wait for the page to load
    await page.waitForTimeout(2000);

    // Step 6: Click on "Syed Hamza-1-19" in the campaign list
    await page.locator('text=Younis Panwar').click();

    // timer to wait for the page to load
    await page.waitForTimeout(2000);

    // Step 7: Click on "Syed Hamza-1-18" within the expanded accordion

    // await page.locator('text=Circle k').click();
    await page.locator('div.block >> text="SampleOK2"').click();

    // timer to wait for the page to load
    await page.waitForTimeout(2000);

    //step 8: Click on "Download button" to download the project

    // Set up a download listener
    const [download] = await Promise.all([
        page.waitForEvent('download'), // Waits for the download event
        page.getByRole('button', { name: 'DOWNLOAD PROJECT' }).click() // Clicks the download button
    ]);


    // Confirm that download started
    console.log('Download started...');

    // check download completes and check for any errors
    try {
        // by default playwritght Temporary path
        const filePath = await download.path();
        console.log(`Downloaded file temporary path: ${filePath}`);

        // Move downloaded file to the predefined downloaded path like Downloads folder and rename it to downloadedProject.zip
        const savedFilePath = path.join(downloadPath, 'downloadedProject.zip');
        await download.saveAs(savedFilePath);
        console.log(`File saved to: ${savedFilePath}`);
    } catch (error) {
        console.error('Error saving the downloaded file:', error);
    }

    // Step 9: Switch from "Master" to "client Lsit" by clicking on the "client Name" Breadcrumb
    await page.locator('div a:has-text("Younis panwar")').click();

    // timer to wait for the page to load
    await page.waitForTimeout(2000);

    // Step 10: Click on "New Creative" button
    await page.getByRole('button', { name: 'New Creative' }).click();

    // timer to wait for the page to load
    await page.waitForTimeout(2000);

    // Step 11: a modal will appear in which you fill the form and upload the downloaded zip file

    // there is first dropdown for select the compaign name
    const compaignNameDropdown = page.locator('select#campaignName');
    // select the compaign name
    await compaignNameDropdown.selectOption('wahab campaign');
    // then there is creative name input field
    const creativeNameInput = page.locator('input#creativeName');
    // fill the input field with the creative name
    // your creative name
    let creativeName = 'Abdulwahab creative test';
    // fill the input field with the creative job number
    await creativeNameInput.fill('Abdulwahab creative test');

    // then there is creative job number input field
    const creativeJobNumberInput = page.locator('input#jobNumber');
    // fill the input field with the creative job number
    await creativeJobNumberInput.fill('Abdulwahab creative job number test');
    // timer to wait for the page to load
    await page.waitForTimeout(2000);

    // Step 12: Click on "select Zip" button to upload zip file
    const filePath = path.resolve(downloadPath, 'downloadedProject.zip');

    // Step 13: Listen for the `filechooser` event triggered by the button click
    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.getByRole('button', { name: 'SELECT ZIP' }).click()
    ]);

    // Step 14: Set the files to be uploaded
    await fileChooser.setFiles(filePath);

    //step 15: click on submit button
    await page.getByRole('button', { name: 'UPLOAD' }).click();

    // if the creative name is already exist then it will show the error message
    const errorMessage = page.locator('text="Creative name already exists in this campaign."');

    if (await errorMessage.isVisible()) {
        console.log('Error: Creative name already exists. Renaming...');

        // Modify the creative name to make it unique using a timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        // Append timestamp for uniqueness
        creativeName = `${creativeName} ${timestamp}`;

        // Fill the input field with the new unique creative name
        await creativeNameInput.fill(creativeName);

        // Attempt to submit the form again
        await page.getByRole('button', { name: 'UPLOAD' }).click();
    }

    // timer to wait for the page to load
    await page.waitForTimeout(2000);

    // wait for the process to complete and close the new creative modal
    await page.waitForSelector('text=New Creative', { state: 'hidden' });

    // timer to wait for the page to load
    await page.waitForTimeout(2000);

    // Step 16: Switch from "Master" to "Variants" by clicking on the "Variants" div
    await page.locator('div:text("MASTERS")').click();

    // Step 17: Check if the file has been processed successfully
    await page.waitForSelector('text=Creative Setup', { state: 'hidden' });
});