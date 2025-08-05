import { toast } from "sonner";
import { deleteTable } from "../actions";
import { Table } from "@/validations/table-validation";
import DialogDelete from "@/components/common/dialog-delete";
import { INITIAL_STATE_ACTION } from "@/constants/general-constant";
import React, { startTransition, useActionState, useEffect } from "react";

const DialogDeleteTable = ({
  refetch,
  currentData,
  handleChangeAction,
  open,
}: {
  refetch: () => void;
  currentData?: Table;
  handleChangeAction: (open: boolean) => void;
  open: boolean;
}) => {
  const [deleteTableState, deleteTableAction, isPendingDeleteTable] =
    useActionState(deleteTable, INITIAL_STATE_ACTION);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("id", currentData!.id as string);
    startTransition(() => {
      deleteTableAction(formData);
    });
  };

  useEffect(() => {
    if (deleteTableState.status === "error") {
      toast.error("Delete table Failed", {
        description: deleteTableState.errors?._form?.[0],
      });
    }

    if (deleteTableState.status === "success") {
      toast.success("Delete table success");
      handleChangeAction?.(false);
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [deleteTableState]);

  return (
    <DialogDelete
      open={open}
      onOpenChange={handleChangeAction}
      isLoading={isPendingDeleteTable}
      onSubmit={onSubmit}
      title="Menu"
    />
  );
};

export default DialogDeleteTable;
