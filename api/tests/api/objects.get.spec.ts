import { test, expect,} from "@playwright/test";
import { ApiHelper } from "../../helpers/apiHelper";
import * as dotenv from "dotenv";

dotenv.config({ path: '.env.staging' });

test.describe("API Tests", () => {
    let apiHelper: ApiHelper;
    const baseUrl = process.env.API_BASE_URL;
  
    if (!baseUrl) {
      throw new Error("API_BASE_URL is not defined in the environment variables");
    }
  
    test.beforeEach(async ({ request }) => {
      apiHelper = new ApiHelper(request, baseUrl);
    });
  
    
    test("GET: Fetch all Objects details", async () => {
        const response = await apiHelper.getRequest("objects");
    
        expect(response.status()).toBe(200);
        const responseBody = await response.json();

        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0); 
        const firstObject = responseBody[0];
        expect(firstObject).toHaveProperty("id", "1");
        expect(firstObject).toHaveProperty("name", "Google Pixel 6 Pro");
      });
  
  
   
  });
  