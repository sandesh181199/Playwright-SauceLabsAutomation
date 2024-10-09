# Sauce Labs Demo Automation

# Setup Instructions

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. To run the tests: `npx playwright test`
4. To generate the report: `npx playwright test --reporter=html`

## Test Details

- This test suite covers the checkout flow by selecting 3 random items from the Sauce Labs demo store and completing the order.
- The suite verifies login, cart, checkout process, and order completion.
