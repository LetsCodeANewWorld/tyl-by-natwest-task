import {Given} from '@cucumber/cucumber';
import {loginPage} from '../pageobjects';

Given('that Customer login to SauceDemo', () => {
    browser.url('/')
    loginPage.loginToSauceDemo();
})
