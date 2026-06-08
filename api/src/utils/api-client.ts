import { APIRequestContext, APIResponse } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.REQRES_API_KEY || '';

export class ApiClient {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async get(endpoint: string, params?: Record<string, string>): Promise<APIResponse> {
    const response = await this.request.get(endpoint, {
      ...(params ? { params } : {}),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    });
    return response;
  }

  async post(endpoint: string, data: any): Promise<APIResponse> {
    const response = await this.request.post(endpoint, {
      data,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    });
    return response;
  }

  async put(endpoint: string, data: any): Promise<APIResponse> {
    const response = await this.request.put(endpoint, {
      data,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    });
    return response;
  }

  async delete(endpoint: string): Promise<APIResponse> {
    const response = await this.request.delete(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    });
    return response;
  }

  async patch(endpoint: string, data: any): Promise<APIResponse> {
    const response = await this.request.patch(endpoint, {
      data,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    });
    return response;
  }
}
