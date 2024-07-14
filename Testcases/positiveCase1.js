const { chromium } = require("playwright");

(async () => {
    const browser = await chromium.launch({
        headless: false,
    });
    const context = await browser.newContext();
    const page = await context.newPage();


    await page.goto("https://example.com/register");


    await page.fill('input[name="fullName"]', "Sana Sajid");
    await page.fill('input[name="email"]', "Sanasajid@gmail.com");
    await page.fill('input[name="password"]', "Saa7@aa1");
    await page.fill('input[name="confirmPassword"]', "Saa7@aa1");
    await page.fill('input[name="dob"]', "2/11/1999");
    await page.selectOption('select[name="gender"]', "Male");
    await page.check('input[value="yes"]');

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for navigation 
    await page.waitForNavigation();

    // console.log success message
    const successMessage = await page.$eval(".success-message", (element) => element.textContent.trim());
    console.log("Success message:", successMessage);

    // console for error message

    const errorMessages = await page.$$eval(".error-message", (elements) =>
        elements.map((el) => el.textContent.trim())
    );
    console.log("Error messages:", errorMessages);

    // Close the browser after testing
    await browser.close();
})();