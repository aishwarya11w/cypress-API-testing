const { describe } = require("mocha");

describe("Authentication", () => {
    const token = 'YOUR_GITHUB_PERSONAL_ACCESS_TOKEN';  // Replace with your actual GitHub token

    it("Basic Authentication", () => {
        cy.request({
            method: 'GET',
            url: 'https://postman-echo.com/basic-auth',
            auth: {
                user: 'postman',
                pass: 'password' // Add a comma here
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.authenticated).to.eq(true);
        });
    });

    it("Digest Authentication", () => {
        cy.request({
            method: 'GET',
            url: 'https://postman-echo.com/basic-auth',
            auth: {
                username: 'postman',
                password: 'password', // Add a comma here
                method: 'digest'
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.authenticated).to.eq(true);
        });
    });

    it("should successfully authenticate with Bearer Token", () => {
        cy.request({
            method: 'GET',
            url: 'https://api.github.com/user/repos',  // Ensure this is the correct GitHub API endpoint
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {
            cy.log(JSON.stringify(response.body));  // Log response body for debugging
            expect(response.status).to.eq(200);
        });
    });
});
