// test Case ID: TC_ID_47

// this test case is for logout which can go to login and make new compaign and then logout
// test case goes scene login, client, new compaign, make new compaign and the logout

const { test, expect } = require('@playwright/test');

// 600 seconds for all tests in this file
test.setTimeout(600000);

test('make new campaign and then logout', async ({ page }) => {

    // Step 1: Navigate to the login page
    await page.goto('https://assets.dev.dojo.otomo.io/home/login');

    // Step 2: Login with valid credentials
    await page.fill('input[type="email"]', 'zak@solarnex.com');
    await page.fill('input[type="password"]', 'wahab123');
    // Take screenshot
    await page.screenshot({ path: 'screenshots/logout/01_credentials_filled.png' });

    // Step 3: Click login button
    await page.getByRole('button', { name: 'login' }).click();

    // Step 4: Check if dashboard page is displayed, assert page title
    await expect(page).toHaveTitle('InDesign Transform');
    // Wait for the page to load
    await page.waitForTimeout(3000);


    // Step 5: Click on client "Freezone Internet" in the list
    await page.locator('text=Freezone Internet').click();
    // Wait for the page to load
    await page.waitForTimeout(3000);
    // Take screenshot
    await page.screenshot({ path: 'screenshots/logout/02_client_selected.png' });


    // Step 6: Click on "new campaign" button
    await page.getByRole('button', { name: 'NEW CAMPAIGNS' }).click();
    // Wait for the page to load
    await page.waitForTimeout(3000);
    // Take screenshot
    await page.screenshot({ path: 'screenshots/logout/03_new_campaign_page.png' });


    // Step 7: Fill in the form with the required data
    const campaignName = 'logout campaign test';
    await page.locator('input#campaignName').fill(campaignName);

    // Step 8: Fill in the optional job number
    await page.locator('input#jobNumber').fill('logout campaign optional');

    // Take screenshot
    await page.screenshot({ path: 'screenshots/logout/04_campaign_form_filled.png' });

    // Step 9: Submit the form
    await page.getByRole('button', { name: 'SUBMIT' }).click();
    await page.waitForTimeout(3000); // Wait for the page to load

    // Step 10: Check if the campaign is created
    await page.locator('div.relative.w-full.mb-3', { hasText: campaignName }).isVisible();
    // Take screenshot
    await page.screenshot({ path: 'screenshots/logout/05_campaign_visible.png' });

    // Step 11: Log out
    await page.getByRole('button', { name: 'Logout' }).click();
    // Wait for the page to load
    await page.waitForTimeout(3000);

    // Step 12: Confirm sign-in screen is visible
    await expect(page.locator('text=Sign In')).toBeVisible();
    // Take screenshot
    await page.screenshot({ path: 'screenshots/logout/06_signin_screen.png' });
});