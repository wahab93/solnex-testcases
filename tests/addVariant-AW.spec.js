// test for add variant
// test case goes scene login, client, compaign, creative, variant tab, add variant button, 
// select first variant and submit and check if variant is added using variant name

const { test, expect } = require('@playwright/test');
// 60 seconds for all tests in this file
test.setTimeout(60000);


test('add variant at variants Table', async ({ page }) => {

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

    // Step 5: Click on client name in the list
    await page.locator('text=QA').click();

    // timer to wait for the page to load
    await page.waitForTimeout(3000);

    // Step 6: Click on compaign name in the campaign list
    await page.locator('text=Automated wahab').click();

    // timer to wait for the page to load
    await page.waitForTimeout(3000);

    // Step 7: Click on creative name within the expanded accordion
    await page.locator('div.block >> text="limited edition"').click();

    // timer to wait for the page to load
    await page.waitForTimeout(3000);

    // Step 8: Switch from "Master" to "Variants" by clicking on the "Variants" div
    await page.locator('div:text("Variants")').click();

    // timer to wait for the page to load
    await page.waitForTimeout(3000);

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

    // Step 10: Click on the "Add Variant" button
    await page.getByRole('button', { name: 'Add Variant' }).click();

    // timer to wait for the page to load
    await page.waitForTimeout(3000);

    // check if the model pop up is displayed
    await expect(page.locator('text="Add New Variants"')).toBeVisible();
    
    // get the value of clicked input checkbox using getAttribute('value')
    const variantName = await page.locator('div.flex.gap-4.items-center.mb-2.w-full.max-w-lg:first-child input[type="checkbox"]').getAttribute('value');

    // step 11: check the checkbox which is first child of the list which have classes this and then in there is checkbox
    await page.locator('div.flex.gap-4.items-center.mb-2.w-full.max-w-lg:first-child input[type="checkbox"]').click();

    // click on the submit button
    await page.getByRole('button', { name: 'Submit' }).click();

    // timer to wait for the page to load
    await page.waitForTimeout(3000);

    // Wait for the table row containing the new variant’s unique identifier (e.g., variant name)
    await expect(page.locator(`table tr:last-child:has-text("${variantName}")`)).toBeVisible();

    // timer to wait for the page to load
    await page.waitForTimeout(3000);


});