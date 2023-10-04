import { $, expect } from '@wdio/globals'

class BurgerButton  {
    get burgerButton () {
            return $('#react-burger-menu-btn');
    };
    get allItemsButton () {
        return $('#inventory_sidebar_link');
    };
    get aboutButton (){
        return $('#about_sidebar_link');
    }
    get logoutButton () {
        return $('#logout_sidebar_link');
    }
    get resetAppStateButton(){
        return $('#reset_sidebar_link');
    }

    async burgerMenu () {
            await this.burgerButton.click();
        }

    async verifyMenuItems() {
        await expect(this.allItemsButton).toHaveTextContaining('All Items');
        await expect(this.aboutButton).toHaveTextContaining('About');
        await expect(this.logoutButton).toHaveTextContaining('Logout');
        await expect(this.resetAppStateButton).toHaveTextContaining('Reset App State');
    }

    async clickLogout() {
        await this.logoutButton.click();
    }
}

export default new BurgerButton();