import BaseClientService from '../base/BaseClientService';


export type RegisterResponse = {
    message: string;
    status_code: number;
};



class RegisterService extends BaseClientService {
    constructor() {
        super()
    }

    registerFace = async (formData: FormData): Promise<RegisterResponse> => {
        const response = await this.post<RegisterResponse>('/register', formData , { headers:  { "Content-Type" : 'multipart/form-data'} });
        return response; // ✅ Only return the relevant data
    };

}
export default new RegisterService();