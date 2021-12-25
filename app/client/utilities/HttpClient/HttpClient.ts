import { IGetSubResponse } from 'common/types/requests/getSub';
import {
  IRegisterUserRequestParams,
  IRegisterUserResponse,
} from 'common/types/requests/registerUser';
import {
  ILoginUserRequestParams,
  ILoginUserResponse,
} from 'common/types/requests/loginUser';

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

  async registerUser(
    params: IRegisterUserRequestParams,
  ): Promise<IRegisterUserResponse> {
    return this.post('/api/user/register', params);
  }

  async loginUser(
    params: ILoginUserRequestParams,
  ): Promise<ILoginUserResponse> {
    return this.post('/api/user/login', params);
  }

  async getSub(): Promise<IGetSubResponse> {
    return this.get('/api/getSub');
  }
}

const httpClient = new HttpClient();

export default httpClient;
