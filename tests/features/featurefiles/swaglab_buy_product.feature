@SwagLabs
Feature:  To purchase the product from Swaglabs {SauceDemo}
  As a user
  I want to perform the functionality checks for products listed on SwagLabs page

  @buyProduct
  Scenario: Purchase cheapest and costliest product from saucedemo products

    Given that Customer login to SauceDemo
    When he sorted the product by Price (high to low) on SwagLabs product page
    Then he should be able to buy the cheapest and costliest product
