export interface HttpGetClient {
    get: (params: HttpGetClient.Params) => Promise<any>;
}

namespace HttpGetClient {
    export type Params = {
        url: string;
        params: object;
    };
}
