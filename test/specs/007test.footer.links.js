import WebPage from '../objects/web.page.js'
import { $, expect, browser} from '@wdio/globals'

describe('Footer links', () => {
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

    it('should check footer links', async () => {
        const twitterLink = await $('a[href="https://twitter.com/saucelabs"]');
        await twitterLink.scrollIntoView();
        await twitterLink.click();
        browser.switchWindow('Swag Labs');

        const facebookLink = await $('a[href="https://www.facebook.com/saucelabs"]');
        await twitterLink.scrollIntoView();
        await facebookLink.click();
        browser.switchWindow('Swag Labs');

        const linkedinLink = await $('a[href="https://www.linkedin.com/company/sauce-labs/"]');
        await twitterLink.scrollIntoView();
        await linkedinLink.click();
    });
});