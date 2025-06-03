import HttpClientService from "../httpClient/HttpClientService";

export default class BaseClientService extends HttpClientService {
    constructor() {
        super('http://127.0.0.1:8000/')
    }
}