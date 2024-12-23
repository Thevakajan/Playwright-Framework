import { APIRequestContext, APIResponse } from "@playwright/test";

export class ApiHelper {
  private request: APIRequestContext;
  private baseUrl: string;

  constructor(request: APIRequestContext, baseUrl: string) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  private buildRequest() {
    // Add any common headers or configurations here
    return {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
/*
  public async postRequest(endpoint: string, requestBody: object): Promise<APIResponse> {
    const url = new URL(endpoint, this.baseUrl).toString();
    const response = await this.request.post(url, {
      ...this.buildRequest(),
      data: requestBody,
    });

    console.log(`POST Response: ${await response.text()}`);
    return response;
  }
  */

  public async postRequest(endpoint: string, requestBody: object): Promise<APIResponse> {
    const url = new URL(endpoint, this.baseUrl).toString();
    const response = await this.request.post(url, {
      ...this.buildRequest(),
      data: requestBody,
    });
    console.log(`POST Response: ${await response.text()}`);
    return response;
  }

  public async getRequest(endpoint: string): Promise<APIResponse> {
    const url = new URL(endpoint, this.baseUrl).toString();
    const response = await this.request.get(url, this.buildRequest());
    console.log(`GET Response: ${await response.text()}`);
    return response;
  }

  public async getRequestById(endpoint: string, id: string): Promise<APIResponse> {
    const url = new URL(`${endpoint}/${id}`, this.baseUrl).toString();
    const response = await this.request.get(url, this.buildRequest());

    console.log(`GET Response: ${await response.text()}`);
    return response;
  }

  public async deleteRequest(endpoint: string): Promise<APIResponse> {
    const url = new URL(endpoint, this.baseUrl).toString();
    const response = await this.request.delete(url, this.buildRequest());
    console.log(`DELETE Response: ${await response.text()}`);
    return response;
  }

  public async patchRequest(endpoint: string, requestBody: object): Promise<APIResponse> {
    const url = new URL(endpoint, this.baseUrl).toString();
    const response = await this.request.patch(url, {
      ...this.buildRequest(),
      data: requestBody,
    });
    console.log(`PATCH Response: ${await response.text()}`);
    return response;
  }
}
