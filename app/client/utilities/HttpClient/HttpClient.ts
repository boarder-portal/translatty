import { IGetSubResponse } from 'common/types/requests/getSub';
import {
  IRegisterUserRequestParams,
  IRegisterUserResponse,
} from 'common/types/requests/registerUser';
import {
  ILoginUserRequestParams,
  ILoginUserResponse,
} from 'common/types/requests/loginUser';
import { IGetCardsResponse } from 'common/types/requests/getCards';
import {
  IAddCardRequestParams,
  IAddCardResponse,
} from 'common/types/requests/addCard';
import {
  IReviewCardRequestParams,
  IReviewCardResponse,
} from 'common/types/requests/reviewCard';
import {
  IEditCardRequestParams,
  IEditCardResponse,
} from 'common/types/requests/editCard';
import { IDeleteCardRequestParams } from 'common/types/requests/deleteCard';

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

  async getCards(): Promise<IGetCardsResponse> {
    return this.get('/api/cards');
  }

  async addCard(params: IAddCardRequestParams): Promise<IAddCardResponse> {
    return this.post('/api/cards/add', params);
  }

  async editCard(params: IEditCardRequestParams): Promise<IEditCardResponse> {
    return this.post('/api/cards/edit', params);
  }

  async deleteCard(params: IDeleteCardRequestParams): Promise<undefined> {
    return this.post('/api/cards/delete', params);
  }

  async reviewCard(
    params: IReviewCardRequestParams,
  ): Promise<IReviewCardResponse> {
    return this.post('/api/cards/review', params);
  }
}

const httpClient = new HttpClient();

export default httpClient;
