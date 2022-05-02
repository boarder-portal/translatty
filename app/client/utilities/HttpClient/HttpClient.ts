import { IPost } from 'common/constants/posts';

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

    return rawResponse.json();
  }

  async getPosts(): Promise<IPost[]> {
    return this.get('/api/getPosts');
  }
}

const httpClient = new HttpClient();

export default httpClient;
