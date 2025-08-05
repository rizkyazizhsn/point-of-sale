type TableErrorFields = "name" | "description" | "capacity" | "status";

export type TableFormState = {
  status?: string;
  errors?: Partial<Record<TableErrorFields, string[]>>;
};
