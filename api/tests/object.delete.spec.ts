import { test, expect } from "@playwright/test";
import { ApiHelper } from "../helpers/apiHelper";
import * as dotenv from "dotenv";


dotenv.config({ path: '.env.staging' });

test.describe("API Delete Tests", () => {
    let apiHelper: ApiHelper;
    const baseUrl = process.env.API_BASE_URL;

    if (!baseUrl) {
        throw new Error("API_BASE_URL is not defined in the environment variables");
    }

    test.beforeEach(async ({ request }) => {
        apiHelper = new ApiHelper(request, baseUrl);
    });

    // POST request to create an object and store objectId and objectName
    test("Delete: Objects details", async () => {
        const requestBody = {
            name: "Apple MacBook Pro 16",
            data: {
                year: 2019,
                price: 1849.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB",
            },
        };

        // Make the POST request to create an object
        const response = await apiHelper.postRequest("objects", requestBody);

        // Log the response status and body for debugging
        console.log(`POST Response Status: ${response.status()}`);
        const responseBody = await response.json();
        console.log("POST Response Body:", responseBody);

        // Verify the response status
        expect(response.status()).toBe(200);

      
          const  objectId = responseBody.id;

        const responseget = await apiHelper.deleteRequest(`objects/${objectId}`);

        // Verify the response status
        expect(response.status()).toBe(200);
        console.log(responseget);
     

    });
});

    


