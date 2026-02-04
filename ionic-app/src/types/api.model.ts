export interface ApiResponse<T> {
  data: T;
  message: string;
  errors?: Record<string, string[]>;
}

export interface CustomError extends Error {
  response?: {
    status?: number;
    data?: {
      data: null;
      message: string;
      errors?: Record<string, string[]>;
    };
  };
}
