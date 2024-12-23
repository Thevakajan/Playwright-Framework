import { test, expect } from "@playwright/test";
import { ApiHelper } from "../../helpers/apiHelper";
import * as dotenv from "dotenv";


dotenv.config({ path: '.env.staging' });

test.describe("API POST Tests", () => {
    let apiHelper: ApiHelper;
    const baseUrl = process.env.API_BASE_URL;

    if (!baseUrl) {
        throw new Error("API_BASE_URL is not defined in the environment variables");
    }

    test.beforeEach(async ({ request }) => {
        apiHelper = new ApiHelper(request, baseUrl);
    });

    // POST request to create an object and store objectId and objectName
    test("Post: Objects details", async () => {
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

        // Check if the response contains the 'id' and 'name'
      
          const  objectId = responseBody.id;
            const objectName = responseBody.name;
            console.log(`objectId: ${objectId}, objectName: ${objectName}`);       

        // Debugging: Verify that objectId is assigned correctly
        console.log("Assigned objectId after POST:", objectId);


        const responseget = await apiHelper.getRequestById("objects",`${objectId}`);

        // Verify the response status
        expect(response.status()).toBe(200);
        const getresponseBody = await response.json();

        // Log the response for debugging
        console.log("GET Response Body:", getresponseBody);

        // Validate that the object returned matches the stored objectId and objectName
        expect(getresponseBody).toHaveProperty("id", objectId);
        expect(getresponseBody).toHaveProperty("name", objectName);
    });
});



    // GET request to retrieve details of the object created in the POST request

   
      

        // Further validation of the response body, such as checking specific fields
    


