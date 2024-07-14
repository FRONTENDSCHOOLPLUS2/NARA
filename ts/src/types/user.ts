export interface LoginResponse {
  item: {
    _id: string;
    name: string;
    profileImage: string;
    token: string;
  };
}

export interface FileUploadResponse {
  item: {
    originalname: string;
    name: string;
    path: string;
  }[];
}
