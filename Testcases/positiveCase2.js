const { chromium } = require("playwright");

(async () => {
    const browser = await chromium.launch({
        headless: false,
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://example.com/register");


    await page.fill('input[name="fullName"]', "John Doe");
    await page.fill('input[name="email"]', "johndoe@example.com");
    await page.fill('input[name="password"]', "Password123");
    await page.fill('input[name="confirmPassword"]', "Password123");
    await page.fill('input[name="dob"]', "01/01/1990");
    await page.selectOption('select[name="gender"]', "Male");
    await page.check('input[value="no"]'); // Testing without newsletter subscription

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for navigation 
    await page.waitForNavigation();

    // Check for success message or error messages
    const successMessage = await page.$eval(".success-message", (element) => element.textContent.trim());
    console.log("Success message:", successMessage);

    const errorMessages = await page.$$eval(".error-message", (elements) =>
        elements.map((el) => el.textContent.trim())
    );
    console.log("Error messages:", errorMessages);

    // Close the browser after testing
    await browser.close();
})();
