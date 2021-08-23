import {checkoutLocators} from '../locators';
import {BasePage} from './base.page';
const data = require('../../testdata/data');

class YourCart extends BasePage {

    checkoutOrder(){
        this.Click(checkoutLocators.checkoutButton);
    }

    enterCheckoutInformation(){
        expect(this.IsElementDisplayed(checkoutLocators.checkoutYourInfoHeader)).toBe(true);
        this.SetValue(checkoutLocators.firstName, data.firstName);
        this.SetValue(checkoutLocators.lastName, data.lastName);
        this.SetValue(checkoutLocators.postalCode, data.postalCode);
        this.Click(checkoutLocators.continueButton);
    }

    finishQuoteAndVerifyConfirmationPage(){
        this.Click(checkoutLocators.finishButton);
        expect(this.IsElementDisplayed(checkoutLocators.confirmationPageText)).toBe(true);
    }
}

export const checkout = new YourCart();
