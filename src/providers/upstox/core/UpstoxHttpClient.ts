import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";

export class UpstoxHttpClient {

    private readonly client: AxiosInstance;

    constructor() {

        this.client = axios.create({
            timeout: 60000,
            headers: {
                "User-Agent": "AI-Trading-Platform",
                "Accept": "application/json",
            },
        });

    }

    async get<T>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<T> {

        const response: AxiosResponse<T> =
            await this.client.get(url, config);

        return response.data;

    }

    async getBuffer(
        url: string
    ): Promise<Buffer> {

        const response = await this.client.get<ArrayBuffer>(
            url,
            {
                responseType: "arraybuffer",
            }
        );

        return Buffer.from(response.data);

    }

}