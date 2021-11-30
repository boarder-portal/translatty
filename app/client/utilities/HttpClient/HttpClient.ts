import { IGetSubResponse } from 'common/types/requests/getSub';

class HttpClient {
  async get(url: string, params?: any) {
    const rawResponse = await fetch(`${url}?${new URLSearchParams(params)}`);

    return rawResponse.json();
  }

  async post(url: string, params?: any) {
    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    return await rawResponse.json();
  }

  async getSub(): Promise<IGetSubResponse> {
    return this.get('/api/getSub');
  }
}

const httpClient = new HttpClient();

export default httpClient;
