import BaseClientService from '../base/BaseClientService';


export type RegisterResponse = {
    message: string;
    status_code: number;
    user?:Array<unknown>
};

export type LoginResponse = RegisterResponse



class RegisterService extends BaseClientService {
    constructor() {
        super()
    }

    registerFace = async (formData: FormData): Promise<RegisterResponse> => {
        const response = await this.post<RegisterResponse>('/register', formData , { headers:  { "Content-Type" : 'multipart/form-data'} });
        return response; // ✅ Only return the relevant data
    };

    loginFace = async(formData: FormData): Promise<LoginResponse> => {
        const response = await this.post<LoginResponse>('/login', formData , { headers: { 'Content-Type': 'multipart/form-data'}});
        return response;
    }

}
export default new RegisterService();