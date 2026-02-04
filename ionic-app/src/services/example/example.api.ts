import { axiosInstance } from '@/services/axios';
import type { ApiResponse } from '@/types/api.model';
import type { Example, ExampleFormData } from '@/types/example.model';

export default class ExampleAPI {
  static async getAll() {
    const resp = await axiosInstance.get<ApiResponse<Example[]>>('/examples');
    return resp.data;
  }

  static async create(data: ExampleFormData) {
    const resp = await axiosInstance.post<ApiResponse<Example>>('/example', data);
    return resp.data;
  }
}
