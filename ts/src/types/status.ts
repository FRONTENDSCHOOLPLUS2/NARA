interface ErrorResponse {
  ok: 0;
  message: string;
}

interface SuccessResponse<T> {
  ok: 1;
  item: T;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
