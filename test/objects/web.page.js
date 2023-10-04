import { $ } from '@wdio/globals'
import UrlPage from './url.page.js';

class WebPage extends UrlPage {
 
    get inputUsername () {
        return $('#user-name');
    }
    get inputPassword () {
        return $('#password');
    }
    get buttonLogin () {
        return $('#login-button');

    }

    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.buttonLogin.click();
    }

    open () {
        return super.open();
    }
}

export default new WebPage();