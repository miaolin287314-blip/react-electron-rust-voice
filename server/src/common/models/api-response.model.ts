export interface ApiResponseOptions<T> {
  code: number;
  message: string;
  data: T | null;
  path: string;
  timestamp?: string;
}

export class ApiResponse<T> {
  code: number;
  message: string;
  data: T | null;
  timestamp: string;
  path: string;

  constructor(options: ApiResponseOptions<T>) {
    this.code = options.code;
    this.message = options.message;
    this.data = options.data;
    this.timestamp = options.timestamp ?? new Date().toISOString();
    this.path = options.path;
  }
}