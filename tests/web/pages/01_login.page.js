import { expect } from "@playwright/test";

export class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.titleLoginPage = page.getByText('Login');
        this.emailField = page.getByRole('textbox', { name: 'Username' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Log In' });
        this.showPasswordToggle = page.locator('#togglePassword');
        this.errorMessageLogin = page.locator('#error-message');
        this.errorMessageInvalidLocation = page.locator('#sessionLocationError');
        this.passwordRecoveryLink = page.getByRole('link', { name: 'Can\'t log in?' });
        this.dialogPasswordRecoveryMessage = page.locator('.dialog-instructions');
        this.dialogPasswordRecoveryOkayButton = page.getByRole('button', { name: 'Okay' });
        this.loggedInUserInfoText = page.getByText(/Logged in as/i);
        this.logoutButton = page.getByRole('link', { name: 'Logout' });

    }

    async seeLoginPage() {
        await expect(this.titleLoginPage).toBeVisible();
        await expect(this.emailField).toBeVisible();
        await expect(this.passwordField).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    async inputEmail(email) {
        await this.emailField.fill(email);
    }

    async inputPassword(password) {
        await this.passwordField.fill(password);
    }

    async chooseLocation(location) {
        await this.page.getByText(location).click();
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async seeLoginFailed(errorMessage) {
        const message = await this.errorMessageLogin.textContent();
        expect(message).toContain(errorMessage);
    }

    async seeLoginFailedInvalidLocation(errorMessage) {
        const message = await this.errorMessageInvalidLocation.textContent();
        expect(message).toContain(errorMessage);
    }

    async seeLoginSuccess(role, location) {
        const message = await this.loggedInUserInfoText.textContent();
        expect(message).toContain(`Logged in as ${role} at ${location}.`);
    }

    async clickCanLogInLink() {
        await this.passwordRecoveryLink.click();
    }

    async seePasswordRecoveryMessage(dialogMessage) {
        const message = await this.dialogPasswordRecoveryMessage.textContent();
        expect(message).toContain(dialogMessage);
    }

    async clickDialogPasswordRecoveryOkayButton() {
        await this.dialogPasswordRecoveryOkayButton.click();
    }

    async seeDialogPasswordRecoveryClosed() {
        await expect(this.dialogPasswordRecoveryMessage).toBeHidden();
    }

    async clickShowPasswordToggle() {
        await this.showPasswordToggle.click();
    }

    async seePasswordTextShown() {
        await expect(this.passwordField).toHaveAttribute('type', 'text');
    }

    async seePasswordTextHidden() {
        await expect(this.passwordField).toHaveAttribute('type', 'password');
    }

    async clickLogoutButton() {
        await this.logoutButton.click();
    }

}