import { createBdd } from "playwright-bdd";
import { LoginPage } from "../pages/01_login.page";

const { Given, When, Then } = createBdd();

const EMAIL_MAP = {
    REGISTERED_EMAIL: process.env.REGISTERED_EMAIL,
    UNREGISTERED_EMAIL: process.env.UNREGISTERED_EMAIL,
    INVALID_FORMAT_EMAIL: process.env.INVALID_FORMAT_EMAIL,
};

const PASSWORD_MAP = {
    REGISTERED_PASSWORD: process.env.REGISTERED_PASSWORD,
    PASSWORD_INVALID: process.env.PASSWORD_INVALID,
};

const ERROR_MESSAGE_MAP = {
    INVALID_CREDENTIALS: process.env.INVALID_CREDENTIALS,
    INVALID_LOCATION: process.env.INVALID_LOCATION,
};

const DIALOG_MESSAGE_MAP = {
    DIALOG_ACCOUNT_RECOVERY_MESSAGE: process.env.DIALOG_ACCOUNT_RECOVERY_MESSAGE,
};

Given("[Desktop] User Open Browser and Navigate to Login Page", async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
});

Then("[Desktop] User See Login Page", async ({ page }) => {
    await new LoginPage(page).seeLoginPage();
});

When("[Desktop] User Input {string} in Email Field", async ({ page }, emailKey) => {
    const email = EMAIL_MAP[emailKey] ?? emailKey;
    await new LoginPage(page).inputEmail(email);
});

When("[Desktop] User Input {string} in Password Field", async ({ page }, passwordKey) => {
    const password = PASSWORD_MAP[passwordKey] ?? passwordKey;
    await new LoginPage(page).inputPassword(password);
});

When("[Desktop] User Choose {string} for this session", async ({ page }, location) => {
    await new LoginPage(page).chooseLocation(location);
});

When("[Desktop] User Click Login Button", async ({ page }) => {
    await new LoginPage(page).clickLoginButton();
});

Then("[Desktop] User Successfully Login to openRMS as {string} at {string}", async ({ page }, role, location) => {
    await new LoginPage(page).seeLoginSuccess(role, location);
});

Then("[Desktop] User Failed Login to openRMS and See Validation Credentials {string} at Login Page", async ({ page }, errorMessageKey) => {
    const errorMessage = ERROR_MESSAGE_MAP[errorMessageKey] ?? errorMessageKey;
    await new LoginPage(page).seeLoginFailed(errorMessage);
});

Then("[Desktop] User Failed Login to openRMS and See Validation Location {string} at Login Page", async ({ page }, errorMessageKey) => {
    const errorMessage = ERROR_MESSAGE_MAP[errorMessageKey] ?? errorMessageKey;
    await new LoginPage(page).seeLoginFailedInvalidLocation(errorMessage);
});

When("[Desktop] User Click {string} Link", async ({ page }) => {
    await new LoginPage(page).clickCanLogInLink();
});

Then("[Desktop] User See {string} to Recovery Account", async ({ page }, dialogMessageKey) => {
    const dialogMessage = DIALOG_MESSAGE_MAP[dialogMessageKey] ?? dialogMessageKey;
    await new LoginPage(page).seePasswordRecoveryMessage(dialogMessage);
});

When("[Desktop] User Click Okay Button", async ({ page }) => {
    await new LoginPage(page).clickDialogPasswordRecoveryOkayButton();
});

Then("[Desktop] User See Popup Instructions to Recovery Account Closed", async ({ page }) => {
    await new LoginPage(page).seeDialogPasswordRecoveryClosed();
});

When("[Desktop] User Click Show Password Toggle Button", async ({ page }) => {
    await new LoginPage(page).clickShowPasswordToggle();
});

When("[Desktop] User Click Show Password Toggle Button Twice", async ({ page }) => {
    await new LoginPage(page).clickShowPasswordToggle();
    await new LoginPage(page).clickShowPasswordToggle();
});

Then("[Desktop] User See Password Text Shown", async ({ page }) => {
    await new LoginPage(page).seePasswordTextShown();
});

Then("[Desktop] User See Password Text Hidden", async ({ page }) => {
    await new LoginPage(page).seePasswordTextHidden();
});

When("[Desktop] User Click Logout Button", async ({ page }) => {
    await new LoginPage(page).clickLogoutButton();
});

