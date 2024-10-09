// @ts-check
const { test, expect } = require('@playwright/test');

// Test suite
test.describe('Sauce Labs Demo - Checkout Flow', () => {
  
  test('should complete checkout with 3 random items', async ({ page }) => {
    
    // Navigate to Sauce Labs demo site
    await page.goto('https://www.saucedemo.com/');

    // Log in with valid credentials
    await page.fill('#user-name', 'visual_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Verify successful login by checking for product title
    await expect(page.locator('.title')).toHaveText('Products');

    // Select 3 random items
    const items = await page.$$('.inventory_item');
    const randomItems = items.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    for (const item of randomItems) {
      const addToCartButton = await item.$('button.btn_inventory');
      if (addToCartButton) {
        await addToCartButton.click();
      }
    }

    // Navigate to cart
    await page.click('.shopping_cart_link');

    // Verify that 3 items are in the cart
    const cartItems = await page.$$('.cart_item');
    await expect(cartItems.length).toBe(3);

    // Proceed to checkout
    await page.click('#checkout');

    // Fill in checkout details
    await page.fill('#first-name', 'Sandesh');
    await page.fill('#last-name', 'Vanwadi');
    await page.fill('#postal-code', '232323');
    await page.click('#continue');

    // Verify that the checkout overview page is displayed
    await expect(page.locator('.summary_info')).toBeVisible();

    // Complete the checkout
    await page.click('#finish');

    // Verify checkout success
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

  });
});