// test Case ID: TC_ID_45

const { test, expect } = require('@playwright/test');
const path = require('path');
const os = require('os');


test.setTimeout(60000); // 60 seconds for all tests in this file


// set path to the system Downloads directory using builtin os module
const downloadPath = path.join(os.homedir(), 'Downloads');


test('Download an variant and uplaod it to masters', async ({ page }) => {

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

    // Step 6: Click on "wahab campaign" in the campaign list
    await page.locator('text=wahab campaign').click();

    // timer to wait for the page to load
    await page.waitForTimeout(2000);

    // Step 7: Click on "Syed Hamza-1-18" within the expanded accordion

    // await page.locator('Abdulwahab creative test').click();
    await page.locator('div.block >> text="Abdulwahab creative test"').click();

    // timer to wait for the page to load
    await page.waitForTimeout(2000);


    // step 8: Switch from "Master" to "Variants" by clicking on the "Variants" div
    await page.locator('div:text("Variants")').click();

    if (await page.locator('text="Document Features"').isVisible()) {
        // step 9: a model pop up will appear Document Features, click on "checkbox" and then next button

        await expect(page.locator('text="Document Features"')).toBeVisible();

        console.log('found document features');

        await page.locator('[role="checkbox"][aria-checked="false"]').click();

        console.log('span clicked');

        await page.getByRole('button', { name: 'Next' }).click();

        console.log('next button clicked');
    }


    await page.waitForSelector('text=Processing', { state: 'hidden' });

    // wait for the page to load
    await page.waitForTimeout(5000);

    // step 10: Click on "add variant" to add variant
    await page.getByRole('button', { name: 'ADD VARIANT' }).click();

    await page.waitForTimeout(2000);


    // check if the model pop up is displayed
    await expect(page.locator('text="Add New Variants"')).toBeVisible();

    // sstep 11: check the checkbox and click on submit button
    await page.locator('input[type="checkbox"][value="Poster_tagged_24x40_inches_24x40_inches_24x40_inches.idml"]').click();
    // click on the submit button
    await page.getByRole('button', { name: 'Submit' }).click();

    // timer to wait for the page to load
    await page.waitForTimeout(5000);

    // now after add variant it will show the in the table row named variant-row which is last of the list
    // now we change the price of the variant

    // step 12: click on the variant row
    // Select the last variant row and target the textarea within the price cell (assuming it’s the third cell)
    await page.locator('tr.variant-row:last-child td:nth-child(11) textarea').fill('$100');

    // change the expirt date of the variant
    const expirationTextarea = await page.locator('tr.variant-row:last-child td:nth-child(17) textarea');
    await expirationTextarea.fill('SINGLE AT REGULAR RETAIL, $10.12 - expires 31/12/2026');

    // // get the input value from the textarea
    // let content = await expirationTextarea.inputValue();
    // console.log('content', content);
    // // Use a regular expression to update only the expiration date (assumes format "XX/XX/XX")
    // content = content.replace(/expires \d{2}\/\d{2}\/\d{2}/, 'expires 12/31/2026');  // Replace with new date
    // // Fill the textarea with the updated content
    // await expirationTextarea.fill(content);


    // step 13: now click on the checkbox of the variant
    await page.locator('tr.variant-row:last-child td:nth-child(2) input').click();

    // step 14: now select the download select option
    await page.locator('select').selectOption({ value: 'download' });


    // Step 15: Now click on the Go button with specific class name and text
    // Click on the button with specific text and class name
    await page.locator('button.bg-slate-800.text-white:has-text("GO")').click();

    // timer to wait for the page to load
    await page.waitForTimeout(2000);


    // step 16: now a model pop up Download Unit in which we should select the download option
    await expect(page.locator('text="Download Unit"')).toBeVisible();

    // select the download option
    await page.locator('select').nth(1).selectOption({ value: 'idml' });


    // step 17: now click on the Download button
    // Set up a download listener
    const [download] = await Promise.all([
        // Waits for the download event
        page.waitForEvent('download'),
        page.getByText('DOWNLOAD', { exact: true }).click(),
        // page.getByRole('button', { name: 'DOWNLOAD' }).click();
    ]);


    // Confirm that download started
    console.log('Download started...');

    const editorNumber = 1;
    // check download completes and check for any errors
    try {
        // by default playwright Temporary path
        const filePath = await download.path();
        console.log(`Downloaded file temporary path: ${filePath}`);

        // Move downloaded file to the predefined downloaded path like Downloads folder and rename it.
        // Change this to 2, 3
        const savedFilePath = path.join(downloadPath, `Poster_tagged_editor_${editorNumber}_24x40_inches.idml`);

        await download.saveAs(savedFilePath);

        console.log(`File saved to: ${savedFilePath}`);

    } catch (error) {
        console.error('Error saving the downloaded file:', error);
    }

    // timer to wait for the page to load
    await page.waitForTimeout(5000);

    // step 18: now click on the Master Tab to swtich from the variant to the master
    await page.locator('div:text("Master")').click();


    // step 19: now click on the upload Indesign button
    // first get the path of the file to be uploaded
    const filePath = path.resolve(downloadPath, `Poster_tagged_editor_${editorNumber}_24x40_inches.idml`);

    // Step 12: Listen for the `filechooser` event triggered by the button click
    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        // then click on the upload Indesign button
        page.getByRole('button', { name: 'UPLOAD INDESIGN' }).click()
    ]);

    // Step 13: Set the files to be uploaded
    await fileChooser.setFiles(filePath);

    // wait for loader icon to disappear
    await page.waitForTimeout(10000);

});