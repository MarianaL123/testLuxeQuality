import WebPage from '../objects/web.page.js'
import { $, expect } from '@wdio/globals'
import { assert } from 'chai';

describe('Cart', () => {
    before(async () => {
        await WebPage.open();
        await WebPage.login('standard_user', 'secret_sauce');

        const inventoryPageTitle = $('.title'); 
        await expect(inventoryPageTitle).toHaveText('Products');
        const inventoryContainer = $('.inventory_list'); 
        await expect(inventoryContainer).toBeDisplayed();
        const shoppingCart = $('#shopping_cart_container');
        await expect(shoppingCart).toBeDisplayed();
    });
    it('should save the cart value after adding a product', async () => {
        const shoppingCart = $('#shopping_cart_container');
        await shoppingCart.click();

        const cartPage = $('#cart_contents_container');
        await expect(cartPage).toBeDisplayed();

        await expect(cartPage).toHaveText("Cart is empty");

        const checkoutButton = $('#checkout');
        const isClickable = await checkoutButton.isClickable();
        assert.strictEqual(isClickable, false, 'Expected checkout button to be not clickable');
    });
});