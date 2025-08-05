import DialogDelete from "@/components/common/dialog-delete";
import { Profile } from "@/types/auth";
import React, { startTransition, useActionState, useEffect } from "react";
import { deleteMenu } from "../actions";
import { INITIAL_STATE_ACTION } from "@/constants/general-constant";
import { toast } from "sonner";
import { Menu } from "@/validations/menu-validation";

const DialogDeleteMenu = ({
  refetch,
  currentData,
  handleChangeAction,
  open
}: {
  refetch: () => void;
  currentData?: Menu;
  handleChangeAction: (open: boolean) => void;
  open: boolean;
}) => {
  const [deleteMenuState, deleteMenuAction, isPendingDeleteMenu] = useActionState(deleteMenu, INITIAL_STATE_ACTION)

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('id', currentData!.id as string)
    formData.append('image_url', currentData!.image_url as string)
    startTransition(() => {
      deleteMenuAction(formData)
    })
  }

  useEffect(() => {
    if (deleteMenuState.status === "error") {
      toast.error("Delete menu Failed", {
        description: deleteMenuState.errors?._form?.[0],
      });
    }

    if (deleteMenuState.status === "success") {
      toast.success("Delete menu success");
      handleChangeAction?.(false);
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [deleteMenuState]);

  return (
    <DialogDelete
      open={open}
      onOpenChange={handleChangeAction}
      isLoading={isPendingDeleteMenu}
      onSubmit={onSubmit}
      title="Menu"
    />
  );
};

export default DialogDeleteMenu;
