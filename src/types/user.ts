export type UserRole = "admin" | "member" | "viewer";

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PublicUser {
  id: string;
  name: string;
  image?: string;
}

export interface UpdateUserInput {
  name?: string;
  image?: string;
}
