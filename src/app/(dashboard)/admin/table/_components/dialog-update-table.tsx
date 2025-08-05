import { zodResolver } from "@hookform/resolvers/zod";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateTable } from "../actions";
import { Dialog } from "@/components/ui/dialog";
import FormTable from "./form-table";
import { Table, TableForm, tableFormSchema } from "@/validations/table-validation";
import { INITIAL_STATE_TABLE } from "@/constants/table-constant";

const DialogUpdateTable = ({
  refetch,
  currentData,
  handleChangeAction,
  open
}: {
  refetch: () => void;
  currentData?: Table;
  handleChangeAction?: (open: boolean) => void;
  open?: boolean
}) => {
  const form = useForm<TableForm>({
    resolver: zodResolver(tableFormSchema),
  });

  const [updateTableState, updateTableAction, isPendingUpdateTable] =
    useActionState(updateTable, INITIAL_STATE_TABLE);

  const [preview, setPreview] = useState<
    { file: File; displayUrl: string } | undefined
  >(undefined);

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("id", currentData?.id ?? "");

    startTransition(() => {
      updateTableAction(formData);
    });
  });

  useEffect(() => {
    if (updateTableState.status === "error") {
      toast.error("Get Table Failed", {
        description: updateTableState.errors?._form?.[0],
      });
    }

    if (updateTableState.status === "success") {
      toast.success("Update table success");
      form.reset();
      handleChangeAction?.(false);
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [updateTableState]);

  useEffect(() => {
    if (currentData) {
      form.setValue("name", currentData.name);
      form.setValue("description", currentData.description);
      form.setValue("capacity", currentData.capacity.toString());
      form.setValue("status", currentData.status);
    }
  }, [currentData]);

  return (
    <Dialog open={open} onOpenChange={handleChangeAction}>
      <FormTable
        form={form}
        onSubmit={onSubmit}
        isLoading={isPendingUpdateTable}
        type="Update"
        preview={preview}
        setPreview={setPreview}
      />
    </Dialog>
  );
};

export default DialogUpdateTable;
