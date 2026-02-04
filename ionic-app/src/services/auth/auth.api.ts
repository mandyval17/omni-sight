import { axiosInstance } from '@/services/axios';
import type { ApiResponse } from '@/types/api.model';
import type { LoginFormData, RegisterFormData, User } from '@/types/auth.model';

export default class AuthAPI {
  static async userLogin({ email, password }: LoginFormData) {
    const resp = await axiosInstance.post<ApiResponse<{ user: User }>>('/auth/login', { email, password });
    return resp.data;
  }

  static async userLogout() {
    const resp = await axiosInstance.post<ApiResponse<{ ok: boolean }>>('/auth/logout');
    return resp.data;
  }

  static async userRegister(data: RegisterFormData) {
    const resp = await axiosInstance.post<ApiResponse<User>>('/auth/register', data);
    return resp.data;
  }

  static async getMe() {
    const resp = await axiosInstance.get<ApiResponse<User>>('/auth/me');
    return resp.data;
  }
}
