import { swagLabsProducts, login } from '../locators';
const data = require('../../testdata/data');
import { BasePage } from './base.page';

class Login extends BasePage{
    loginToSauceDemo() {
        this.SetValue(login.username, data.username);
        this.SetValue(login.password, data.password)
        this.Click(login.loginButton);
        expect(this.IsElementDisplayed(swagLabsProducts.productsPageHeader)).toBe(true);
    }
}

export const loginPage = new Login();
