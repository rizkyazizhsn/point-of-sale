import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  INITIAL_ORDER,
  INITIAL_STATE_ORDER,
  STATUS_ORDER_LIST,
} from "@/constants/order-constant";
import { Loader2 } from "lucide-react";
import { createOrder } from "../actions";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Table } from "@/validations/table-validation";
import FormInput from "@/components/common/form-input";
import FormSelect from "@/components/common/form-select";
import React, { startTransition, useActionState, useEffect } from "react";
import { OrderForm, orderFormSchema } from "@/validations/order-validation";

const DialogCreateOrder = ({
  refetch,
  tables,
}: {
  refetch: () => void;
  tables: Table[] | undefined | null;
}) => {
  const form = useForm<OrderForm>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: INITIAL_ORDER,
  });

  const [createOrderState, createOrderAction, isPendingCreateOrder] =
    useActionState(createOrder, INITIAL_STATE_ORDER);

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => {
      createOrderAction(formData);
    });
  });

  useEffect(() => {
    if (createOrderState.status === "error") {
      console.log("🚀 ~ DialogCreateOrder ~ createOrderState:", createOrderState)
      toast.error("Create Order Failed", {
        description: createOrderState.errors?._form?.[0],
      });
    }

    if (createOrderState.status === "success") {
      toast.success("Create order success");
      form.reset();
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [createOrderState]);
  return (
    <DialogContent className="sm:max-w-[425px]">
      <Form {...form}>
        <DialogHeader>
          <DialogTitle>Create Order</DialogTitle>
          <DialogDescription>Add a new order from customer</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormInput
            form={form}
            name="customer_name"
            label="Name"
            placeholder="Enter customer name"
          />
          <FormSelect
            form={form}
            name="table_id"
            label="Table"
            selectItem={(tables ?? []).map((table: Table) => ({
              value: `${table.id}`,
              label: `${table.name} - ${table.status} (${table.capacity})`,
              disabled: table.status !== "available",
            }))}
          />
          <FormSelect
            form={form}
            name="status"
            label="Status"
            selectItem={STATUS_ORDER_LIST}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPendingCreateOrder}>
              {isPendingCreateOrder && <Loader2 className="animate-spin" />}
              Create
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default DialogCreateOrder;
