import WebPage from '../objects/web.page.js'
import { $, expect } from '@wdio/globals'
import BurgerButton from '../objects/burget.btn.js';
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
    it('should save the cart value after logout', async () => {
        const shoppingCartBadge = $('.shopping_cart_badge');
        const isElementExisting = await shoppingCartBadge.isExisting();
        assert.isFalse(isElementExisting, 'Element should not exist');

        const backpackAddToCart = await $('#add-to-cart-sauce-labs-backpack');
        await (backpackAddToCart).click();
        const cartValue = parseInt((await shoppingCartBadge.getText()));
        await expect(cartValue).toEqual(1);
    
        const tshirtAddToCart = await $('#add-to-cart-sauce-labs-bolt-t-shirt');
        await (tshirtAddToCart).click();
        const updatedCartValue = parseInt((await shoppingCartBadge.getText()));
        await expect(updatedCartValue).toEqual(cartValue + 1); 

        await BurgerButton.burgerMenu();
        await BurgerButton.verifyMenuItems();
        await BurgerButton.clickLogout(); 

        const loginForm = $('.login_wrapper');
        await expect(loginForm).toExist();

        (await WebPage.inputUsername).getValue().then((loginValue) => {
            assert.equal(loginValue, '')
        });
        (await WebPage.inputPassword).getValue().then((passwordValue) => {
            assert.equal(passwordValue, '')
        });

        await WebPage.login('standard_user', 'secret_sauce');

        const inventoryPageTitle = $('.title'); 
        await expect(inventoryPageTitle).toHaveText('Products');
        const inventoryContainer = $('.inventory_list'); 
        await expect(inventoryContainer).toBeDisplayed();
        const shoppingCart = $('#shopping_cart_container');
        await expect(shoppingCart).toBeDisplayed();

        await (shoppingCart).click();
        const itemBackpack = $('//div[@class="inventory_item_name" and text()="Sauce Labs Backpack"]');
        await expect(itemBackpack).toBeDisplayed();

        const itemTShirt = $('//div[@class="inventory_item_name" and text()="Sauce Labs Bolt T-Shirt"]');
        await expect(itemTShirt).toBeDisplayed();
    });
});
