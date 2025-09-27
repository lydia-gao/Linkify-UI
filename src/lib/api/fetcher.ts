const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: Response
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.message || `HTTP ${response.status}: ${response.statusText}`,
      response.status,
      response
    );
  }

  return response.json();
}

export class ApiClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      return handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Network error occurred", 0);
    }
  }

  // Auth endpoints
  async login(credentials: { email: string; password: string }) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async googleAuth() {
    return this.request("/auth/google", {
      method: "POST",
    });
  }

  async logout() {
    return this.request("/auth/logout", {
      method: "POST",
    });
  }

  // Links endpoints
  async getLinks(params?: {
    page?: number;
    limit?: number;
    category?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.category) queryParams.append("category", params.category);

    return this.request(`/links?${queryParams}`);
  }

  async getLink(id: string) {
    return this.request(`/links/${id}`);
  }

  async createLink(linkData: any) {
    return this.request("/links", {
      method: "POST",
      body: JSON.stringify(linkData),
    });
  }

  async updateLink(id: string, linkData: any) {
    return this.request(`/links/${id}`, {
      method: "PUT",
      body: JSON.stringify(linkData),
    });
  }

  async deleteLink(id: string) {
    return this.request(`/links/${id}`, {
      method: "DELETE",
    });
  }

  async getStats() {
    return this.request("/links/stats");
  }

  async getBestLinks() {
    return this.request("/links/best");
  }

  async getRecentClicks() {
    return this.request("/links/recent-clicks");
  }

  // File upload
  async uploadFile(file: File, endpoint: string = "/upload") {
    const formData = new FormData();
    formData.append("file", file);

    return this.request(endpoint, {
      method: "POST",
      headers: {}, // Remove Content-Type to let browser set it with boundary
      body: formData,
    });
  }
}

export const apiClient = new ApiClient();
export { ApiError };
