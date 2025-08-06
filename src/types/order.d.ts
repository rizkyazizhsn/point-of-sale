type OrderErrorFields =
  | "customer_name"
  | "table_id"
  | "status"
  | "_form";

export type OrderFormState = {
  status?: string;
  errors?: Partial<Record<OrderErrorFields, string[]>>;
};
