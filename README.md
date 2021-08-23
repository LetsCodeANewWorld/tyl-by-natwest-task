===========E2E test steps covered===========

1. typescript is used with wdio sync mode
2. login and test data are stored in tests/testdata folder
3. Once the customer is navigated to product page, then he shold apply the filte to sort product by price (high to low).
    The price of products displayed is stored in array and is then compared with same array after sorting it in descending order. This would confirm the prices 
    displayed are in high to low order.
4. then the costliest and cheapest item is added to the cart.
5. Checkout is done and order is placed. Then the confirmation page text is validated as exit criteria of the test.


===========Installation steps===========

1. npm i to install the modules

2. Allure is used as the test reporter

3. npm install -g allure-commandline --save-dev =>  insatll allure commandline service to auto generate report once the exeuction is finished


===========Run scripts locally===========

1. To run the test on default chrome browser, use the below command :

    **npm run execute:local:generateReport**

2. To run on a specific browser:

   **npm run execute:local:generateReport -- --webbrowser=firefox**

3. To run a specific ff :
    Add a new feature file and then execute below command
   **npm run execute:local:generateReport -- --webbrowser=firefox --featureFilePath={featurefileName}**


[comment]: <> (To run a specific browser, pass --webbrowser='firefox')
