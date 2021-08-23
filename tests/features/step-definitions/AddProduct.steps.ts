import {When, Then} from '@cucumber/cucumber';
import {addProduct, checkout} from '../pageobjects';


When(/^he sorted the product by (.+) on SwagLabs product page$/, (sortOrder: string) => {
    addProduct.sortProduct(sortOrder);
})
Then(/^he should be able to buy the cheapest and costliest product$/, function () {
    addProduct.addCostliestAndCheapestProductToCart();
    addProduct.openShoppingCart();
    checkout.checkoutOrder();
    checkout.enterCheckoutInformation();
    checkout.finishQuoteAndVerifyConfirmationPage()
});
