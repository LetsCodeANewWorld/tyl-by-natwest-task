class AddProductLocators {
    //div[@class='header_secondary_container']//span[@class='title' and text()='Products']
    public productsPageHeader: string = '//div[@class="header_secondary_container"]//span[@class="title" and text()="Products"]';
    public sortProduct: string = '.product_sort_container';
    public productPriceList: string = '.inventory_item_price';
    public productPrice: string = '//div[@class="inventory_item_price" and text()="<itemPrice>"]//following-sibling::button[text()="Add to cart"]';
    public shoppingCart: string = '.shopping_cart_link';
}

export const swagLabsProducts = new AddProductLocators();
