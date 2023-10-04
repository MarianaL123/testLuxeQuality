import { browser } from '@wdio/globals'

class UrlPage {
    open() {
        const url = `https://www.saucedemo.com/`
       return browser.url(url);
    }
}

export default UrlPage;