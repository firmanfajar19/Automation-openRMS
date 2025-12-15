# Quality Assurance Test - Infokes
## Name: Firman Fajar Kurniawan
## Project Overview
This project contains automation tests for OpenRMS using Playwright with a Gherkin style (BDD) approach and Page Object Model (POM). It is designed to ensure the quality and reliability of the OpenRMS application through automated scenarios. This project is using GitHub Actions for CI/CD pipeline. The test results are deployed to Netlify and sent via email notifications.

## Technologies Used
*   **JavaScript**: The core programming language used for the tests.
*   **Playwright/Test**: The testing framework for end-to-end testing.
*   **Playwright-BDD**: A library to run Gherkin BDD features with Playwright.
*   **Dotenv**: Zero-dependency module that loads environment variables from a `.env` file.
*   **Allure-Playwright**: Reporter for generating comprehensive test reports.

## Project Structure
```
Automation-openRMS/
├── .github/                # GitHub configuration files
├── tests/
│   └── web/
│       ├── features/       # Gherkin feature files (*.feature)
│       ├── pages/          # Page objects for BDD (*.js)   
│       └── step_definitions/ # Step definitions for BDD (*.js)
├── .env                    # Environment variables
├── allure-report/          # Generated Allure report (artifacts)
├── .gitignore              # Git ignore rules
├── netlify.toml            # Netlify configuration
├── package.json            # Project dependencies and scripts
├── playwright.config.js    # Playwright configuration
└── README.md               # Project documentation
```

## Setup Instructions

### Prerequisites
*   Node.js (v14 or higher recommended)
*   npm (Node Package Manager)

### Installation
1.  Clone the repository:
    ```sh
    git clone https://github.com/firmanfajar19/Automation-openRMS.git
    cd Automation-openRMS
    ```

2.  Install dependencies:
    ```sh
    npm install
    ```

3.  Install Playwright browsers:
    ```sh
    npx playwright install
    ```

### Environment Configuration
1.  Create a `.env` file in the root directory
2.  Add necessary environment variables Example:
    ```env
    BASE_URL=https://your-target-url.com
    ```

## Running the Tests

To run the tests, you first need to generate the test files from your Gherkin features, and then run Playwright.

### Standard Run Tests
Run all tests in headless mode:
```sh
npx bddgen && npx playwright test
```

Run tests with UI mode (interactive):
```sh
npx bddgen && npx playwright test --ui
```

Run tests in a specific tag:
```sh
npx bddgen && npx playwright test --grep @login-web01 --headed
```

### View Reports
Generate and open the Allure report:
```sh
allure generate allure-results --clean -o allure-report
allure open allure-report
```
*Note: Ensure you have Allure commandline installed or use the `allure-playwright` reporting capabilities.*

Alternatively, view standard Playwright HTML report (if configured in `playwright.config.js`):
```sh
npx playwright show-report
```

If a test fails, Playwright is configured to automatically capture:
*   **Screenshots**: Attached to the report.
*   **Videos**: Attached to the report.

## CI/CD Pipeline

This project uses **GitHub Actions** for Continuous Integration and Continuous Deployment. The workflow is defined in `.github/workflows/playwright-prod.yml`.

### Workflow Overview
The pipeline is triggered on:
*   Push to `main` branch
*   Pull Request to `main` branch

**Steps:**
1.  **Checkout Code**: Retrieves the latest code.
2.  **Environment Setup**: Installs Node.js and dependencies.
3.  **Configuration**: Creates `.env` file from GitHub Secrets (`PROD_ENV`).
4.  **Test Execution**:
    *   Generates BDD tests (`npx bddgen`).
    *   Runs Playwright tests.
5.  **Reporting**:
    *   Generates Allure report.
    *   Uploads report as a GitHub Artifact.
6.  **Deployment (Netlify)**:
    *   Deploys the Allure report to Netlify. You can access it at https://automation-openrms.netlify.app/
7.  **Notification (Email)**:
    *   Sends an email with the test status and link to the Netlify report (on `push` event).
    *   This is example for email notification: [Sample Email Notification](https://drive.google.com/file/d/1T6NgTBosRNMamB6kPESnpyNlMGOydcz0/view?usp=sharing)
    
### GitHub Secrets Configuration

To enable the CI/CD pipeline, the following secrets must be configured in your GitHub repository settings under **Settings > Secrets and variables > Actions**:

| Secret Name | Description |
| :--- | :--- |
| `PROD_ENV` | Content of your `.env` file (e.g., `BASE_URL=...`). |
| `NETLIFY_AUTH_TOKEN` | Your Netlify Personal Access Token. |
| `NETLIFY_SITE_ID` | The API ID of your Netlify site. |
| `SMTP_HOST` | SMTP server host (e.g., `smtp.gmail.com`). |
| `SMTP_PORT` | SMTP port (e.g., `465` or `587`). |
| `SMTP_USER` | SMTP username / sender email. |
| `SMTP_PASS` | SMTP password / app password. |
| `EMAIL_TO` | Recipient email address(es) for notifications. |
