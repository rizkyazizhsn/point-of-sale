type MenuErrorFields =
  | "name"
  | "description"
  | "price"
  | "discount"
  | "category"
  | "image_url"
  | "is_available"
  | "_form";

export type MenuFormState = {
  status?: string;
  errors?: Partial<Record<MenuErrorFields, string[]>>;
};
