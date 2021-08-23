class CheckoutLocators {
    public checkoutButton: string = '#checkout';
    // Checkout Your Information locators
    public checkoutYourInfoHeader: string = '//span[.="Checkout: Your Information"]';
    public firstName: string = '#first-name';
    public lastName: string = '#last-name';
    public postalCode: string = '#postal-code';
    public continueButton: string = '#continue';
    // Checkout overview locators
    public finishButton: string = '#finish'
    public confirmationPageText: string = '//h2[.="THANK YOU FOR YOUR ORDER"]'
}

export const checkoutLocators = new CheckoutLocators();
