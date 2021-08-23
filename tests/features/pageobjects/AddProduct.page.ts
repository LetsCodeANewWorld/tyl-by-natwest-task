import {swagLabsProducts} from '../locators';
import {BasePage} from './base.page';

class AddProduct extends BasePage {

    public productPrice: number[] = [];

    sortProduct(SortOrder: string) {
        this.SelectByVisibleText(swagLabsProducts.sortProduct, SortOrder);
        this.validateProductsSortedInHighToLowPrice();
    }

    validateProductsSortedInHighToLowPrice() {
        // get the price arrau from product page
        this.productPrice = $$(swagLabsProducts.productPriceList).map(s => parseFloat(s.getText().slice(1)));
        // sort the price array and check whether the original array retrieve is equal to the sorted array
        let sortedPriceArray = $$(swagLabsProducts.productPriceList).map(s => parseFloat(s.getText().slice(1)))
            .sort((a, b) => b - a);
        expect(this.productPrice.length === sortedPriceArray.length && this.productPrice.every((val, index) =>
            val === sortedPriceArray[index])).toBe(true);
    }

    addCostliestAndCheapestProductToCart() {
        this.Click(swagLabsProducts.productPrice.replace("<itemPrice>", this.productPrice[0].toString()));
        this.Click(swagLabsProducts.productPrice.replace("<itemPrice>", this.productPrice[this.productPrice.length - 1].toString()));
    }

    openShoppingCart() {
        this.Click(swagLabsProducts.shoppingCart);
    }
}

export const addProduct = new AddProduct();
