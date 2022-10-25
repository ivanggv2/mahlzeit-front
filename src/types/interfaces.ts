export interface User {
  userName: string;
  email: string;
  password: string;
}

export type UserLogin = Omit<User, "email">;

export interface UserRegister extends User {
  passwordConfirm: string;
}

export interface UserLoged {
  userName: string;
  token: string;
  isLogged?: boolean;
}

export interface PasswordCheck {
  passWordMin: boolean;
  passWordCompare: boolean;
}

export interface ProtoRecipte {
  name: string;
  persons: string | number;
  dificulty: string;
  autor: string;
  ingredients: string;
  process: string;
  image: File | string;
}

export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface Recipte extends ProtoRecipte {
  id: string;
  backupImage: string;
}

export interface TokenResponse {
  token: string;
}

export interface UiData {
  isLoading: boolean;
}
