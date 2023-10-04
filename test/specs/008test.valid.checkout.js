import WebPage from '../objects/web.page.js'
import { $, expect} from '@wdio/globals'
import { assert } from 'chai';

describe('Products sorting', () => {
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
    it('should sort products by name or price', async () => {
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

        const shoppingCart = $('#shopping_cart_container');
        await shoppingCart.click();
        const itemBackpack = $('//div[@class="inventory_item_name" and text()="Sauce Labs Backpack"]');
        await expect(itemBackpack).toBeDisplayed();

        const itemTShirt = $('//div[@class="inventory_item_name" and text()="Sauce Labs Bolt T-Shirt"]');
        await expect(itemTShirt).toBeDisplayed();

        const checkoutButton = $('#checkout');
        await checkoutButton.click();

        const checkoutForm = $('#checkout_info_container > div');
        await expect(checkoutForm).toBeDisplayed();

        const firstNameField = $('#first-name');
        await firstNameField.addValue('Taras');

        const lastNameField = $('#last-name');
        await lastNameField.addValue('Shevchenko');

        const zipCodeField = $('#postal-code');
        await zipCodeField.addValue('79-82');

        const continueButton = $('#continue');
        (await continueButton).click();
        const overviewPage = $('#checkout_summary_container');
        await expect(overviewPage).toBeDisplayed();

        await expect(itemBackpack).toBeDisplayed();
        await expect(itemTShirt).toBeDisplayed();

        const totalPrice = $('#checkout_summary_container > div > div.summary_info > div.summary_info_label.summary_total_label');
        await totalPrice.getText();
        const itemPrice = $('#checkout_summary_container > div > div.summary_info > div.summary_subtotal_label');
        await itemPrice.getText();
        const taxPrice = $('#checkout_summary_container > div > div.summary_info > div.summary_tax_label');
        await taxPrice.getText();
        const itemPriceValue = parseFloat(itemPrice.replace('$', '')) || 0;
        const taxPriceValue = parseFloat(taxPrice.replace('$', '')) || 0;
        const totalPriceValue = parseFloat(totalPrice.replace('$', '')) || 0;
        assert.isNumber(itemPriceValue, 'Item price is not in the expected format');
        assert.isNumber(taxPriceValue, 'Tax price is not in the expected format');
        assert.isNumber(totalPriceValue, 'Total price is not in the expected format');
        const expectedTotal = itemPriceValue + taxPriceValue;
        assert.strictEqual(expectedTotal, totalPriceValue, 'Total price does not match the sum of item price and tax price');

        const finishButton = $('#finish');
        (await finishButton).click();

        const completePage = $('#checkout_complete_container');
        await expect(completePage).toBeDisplayed();

        const completeMessage = $ ('#checkout_complete_container > h2');
        await expect(completeMessage).toHaveText("Thank you for your order!");
        await expect(completeMessage).toBeDisplayed();

        const backhomeButton = $('#back-to-products');
        (await backhomeButton).click();

        const inventoryPageTitle = $('.title'); 
        await expect(inventoryPageTitle).toHaveText('Products');
        const inventoryContainer = $('.inventory_list'); 
        await expect(inventoryContainer).toBeDisplayed();
        await expect(shoppingCart).toBeDisplayed();

        const shoppingCartBadgeUpdate = $('.shopping_cart_badge');
        const isElementExistingUpdate = await shoppingCartBadgeUpdate.isExisting();
        assert.isFalse(isElementExistingUpdate, 'Shopping cart should be empty');
    });
});