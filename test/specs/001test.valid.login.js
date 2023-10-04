import WebPage from '../objects/web.page.js'
import { $, expect } from '@wdio/globals'

describe('Login on webpage', () => {
    it('should login with valid datas', async () => {
        await WebPage.open();
        await WebPage.login('standard_user', 'secret_sauce');

        const inventoryPageTitle = $('.title'); 
        await expect(inventoryPageTitle).toHaveText('Products');
        const inventoryContainer = $('.inventory_list'); 
        await expect(inventoryContainer).toBeDisplayed();
        const shoppingCart = $('#shopping_cart_container');
        await expect(shoppingCart).toBeDisplayed();
    })
})
