import WebPage from "../objects/web.page.js";
import { expect, $ } from "@wdio/globals";

describe("Login on webpage", () => {
  it("should login with invalid password", async () => {
    await WebPage.open();
    await WebPage.login("standard_user", "secret.sauce");

    const isErrorDisplayed = $("div.error-message-container.error");
    await expect(isErrorDisplayed).toBeDisplayed();
    const isLoginXDisplayed = $("#login_button_container > div > form > div:nth-child(1) > svg");
    await expect(isLoginXDisplayed).toBeDisplayed();
    const isPasswordXDisplayed = $("#login_button_container > div > form > div:nth-child(2) > svg");
    await expect(isPasswordXDisplayed).toBeDisplayed();

    function rgbaToHex(rgba) {
        const values = rgba.match(/\d+/g);
        const r = parseInt(values[0], 10).toString(16).padStart(2, "0");
        const g = parseInt(values[1], 10).toString(16).padStart(2, "0");
        const b = parseInt(values[2], 10).toString(16).padStart(2, "0");
        return `#${r}${g}${b}`;
    }

    async function getBorderColor(element) {
        const borderBottomColorProperty = await element.getCSSProperty("border-bottom-color");
        const actualBorderColor = borderBottomColorProperty.value;
        return actualBorderColor;
    }

    const expectedBorderColor = "#e2231a";

    const userNameBorderColor = await getBorderColor(await WebPage.inputUsername);
    const passwordBorderColor = await getBorderColor(await WebPage.inputPassword);

    const userNameBorderColorHex = rgbaToHex(userNameBorderColor);
    const passwordBorderColorHex = rgbaToHex(passwordBorderColor);

    expect(userNameBorderColorHex).toEqual(expectedBorderColor);
    expect(passwordBorderColorHex).toEqual(expectedBorderColor);

    const errorElem = await $("div.error-message-container.error");
    await expect(errorElem).toHaveText("Epic sadface: Username and password do not match any user in this service");
  });
});
