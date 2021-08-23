const WAITFOR_TIMEOUT = 10000;

export class BasePage {


    Click(locator: string) {
        if (locator === undefined) {
            throw new Error('locator must be defined')
        }
        try {
            browser.$(locator).waitForEnabled();
            browser.$(locator).waitForClickable({timeout: WAITFOR_TIMEOUT})
            browser.$(locator).click()
        } catch (err) {
            throw new Error(err)
        }
    }

    SetValue(locator: string, value: string) {
        if (locator === undefined) {
            throw new Error('locator must be defined')
        }

        try {
            $(locator).waitForDisplayed()
            $(locator).setValue(value)
        } catch (err) {
            throw new Error(err)
        }
    }

    IsElementDisplayed(locator: string) {
        if (locator === undefined) {
            throw new Error('locator must be defined')
        }
        return browser.$(locator).isDisplayed()
    }

    SelectByVisibleText(locator: string, visibleText: string) {
        if (locator === undefined) {
            throw new Error('locator must be defined')
        }
        browser.$(locator).selectByVisibleText(visibleText)
    }

    GetText(locator: string) {
        if (locator === undefined) {
            throw new Error('locator must be defined')
        }
        return browser.$(locator).getText()
    }
}
