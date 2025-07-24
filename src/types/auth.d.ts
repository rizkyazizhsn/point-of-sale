type AuthErrorFields = "email" | "password" | "name" | "avatar_url" | "_form";

export type AuthFormState = {
  status?: string;
  errors?: Partial<Record<AuthErrorFields, string[]>>;
};
