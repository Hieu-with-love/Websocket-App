export interface UserProfile {
  id: string;
  userId: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  dob?: string;
  city?: string;
}

export interface ApiResponse<T> {
  code: number;
  message?: string;
  result: T;
}
