import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";


export default abstract class HttpClientService {
    private client: AxiosInstance;

    protected constructor(baseURL: string) {
        this.client = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    protected async get<T>(endPoint: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.get(endPoint, config);
        return response.data;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected async post<T>(endPoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.post(endPoint, data, config);
        return response.data;
    }


    protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.delete(url, config);
        return response.data;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.put(url, data, config);
        return response.data;
    }
}