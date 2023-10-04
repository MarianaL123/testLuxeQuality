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
    it('should sort products by Name(A-Z) ', async () => {
        const productNames = await $$('//div[@class="inventory_item_name"]');
        const productNamesText = await Promise.all(productNames.map(async (element) => {
            return await element.getText();
        }));
        browser.pause(2000);
        const sortedProductNames = [...productNamesText].sort();
        assert.deepStrictEqual(productNamesText, sortedProductNames, 'Product names are not sorted A-Z');
    });
    it('should sort products by Name(Z-A) ', async () => {
        const sortButton = $('.product_sort_container');
        await sortButton.click();
        const nameZA = $('option[value="za"]');
        await nameZA.click();
        browser.pause(2000);
        const productNames = await $$('//div[@class="inventory_item_name"]');
        const productNamesText = await Promise.all(productNames.map(async (element) => {
            return await element.getText();
        }));
        const sortedProductNames = [...productNamesText].sort((a, b) => b.localeCompare(a));
        assert.deepStrictEqual(productNamesText, sortedProductNames, 'Product names are not sorted Z-A');
    });

    it('should sort products by Price (Low to High)', async () => {
        const sortButton = $('.product_sort_container');
        await sortButton.click();
        const priceLowToHigh = $('option[value="lohi"]');
        await priceLowToHigh.click();

        const productPrices = await $$('//div[@class="inventory_item_price"]');
        const productPricesText = await Promise.all(productPrices.map(async (element) => {
            return await element.getText();
        }));

        const numericPrices = productPricesText.map((priceText) => {
            const match = priceText.match(/\$\d+\.\d+/);
            if (match) {
                return parseFloat(match[0].replace('$', ''));
            }
            return NaN;
        });

        console.log("numericPrices" + numericPrices);
        const sortedNumericPrices = [...numericPrices].sort((a, b) => a - b);
        
        assert.deepStrictEqual(numericPrices, sortedNumericPrices, 'Prices are not sorted Low to High');
    });
    it('should sort products by Price ( High to Low)', async () => {
        const sortButton = $('.product_sort_container');
        await sortButton.click();
        const priceHighToLow = $('option[value="hilo"]');
        await priceHighToLow.click();

        const productPrices = await $$('//div[@class="inventory_item_price"]');
        const productPricesText = await Promise.all(productPrices.map(async (element) => {
            return await element.getText();
        }));

        const numericPrices = productPricesText.map((priceText) => {
            const match = priceText.match(/\$\d+\.\d+/);
            if (match) {
                return parseFloat(match[0].replace('$', ''));
            }
            return NaN;
        });

        console.log("numericPrices" + numericPrices);
        const sortedNumericPrices = [...numericPrices].sort((a, b) => b - a);

        assert.deepStrictEqual(numericPrices, sortedNumericPrices, 'Prices are not sorted Low to High');
    });
});