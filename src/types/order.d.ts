import { Menu } from "@/validations/menu-validation";

type OrderErrorFields =
  | "customer_name"
  | "table_id"
  | "status"
  | "_form";

export type OrderFormState = {
  status?: string;
  errors?: Partial<Record<OrderErrorFields, string[]>>;
};

export type Cart = {
  menu_id: string;
  quantity: number;
  total: number;
  notes: string;
  menu: Menu;
  order_id?: string;
}