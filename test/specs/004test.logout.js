import WebPage from '../objects/web.page.js'
import { $, expect} from '@wdio/globals'
import BurgerButton from '../objects/burget.btn.js';
import { assert } from 'chai';

describe('Logout Test', () => {
    before(async () => {
        await WebPage.open();
        await WebPage.login('standard_user', 'secret_sauce');
    });
    it('should logout and redirect to the Login page with empty fields', async () => {
        const inventoryPageTitle = $('.title'); 
        await expect(inventoryPageTitle).toHaveText('Products');
        const inventoryContainer = $('.inventory_list'); 
        await expect(inventoryContainer).toBeDisplayed();
        const shoppingCart = $('#shopping_cart_container');
        await expect(shoppingCart).toBeDisplayed();

        await BurgerButton.burgerMenu();
        await BurgerButton.verifyMenuItems();
        await BurgerButton.clickLogout(); 

        const loginForm = $('.login_wrapper');
        await expect(loginForm).toExist();

        (await WebPage.inputUsername).getValue().then((loginValue) => {
            assert.equal(loginValue, '');
        });
        (await WebPage.inputPassword).getValue().then((passwordValue) => {
            assert.equal(passwordValue, '');
        });
    });
});