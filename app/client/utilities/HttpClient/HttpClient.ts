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

  // async getRoom(params: IGetRoomRequestParams): Promise<ICreateRoomResponse> {
  //   return this.get('/api/room', params);
  // }
}

const httpClient = new HttpClient();

export default httpClient;
