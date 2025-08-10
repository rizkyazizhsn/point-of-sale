import z from "zod";

export const orderFormSchema = z.object({
  customer_name: z.string().min(1, "Customer Name is required"),
  table_id: z.string().min(1, "Select a table"),
  status: z.string().min(1, "Select a status"),
});

export const orderSchema = z.object({
  customer_name: z.string(),
  status: z.string(),
  // payment_token: z.string(),
  table_id: z.string(),
});

export type OrderForm = z.infer<typeof orderFormSchema>;
export type Order = z.infer<typeof orderSchema> & { id: string };
