type AuthErrorFields = "email" | "password" | "name" | "avatar_url" | "_form";

export type AuthFormState = {
  status?: string;
  errors?: Partial<Record<AuthErrorFields, string[]>>;
};

export type Profile = {
  id?: string;
  name?: string;
  role?: string;
  avatar_url?: string;
}