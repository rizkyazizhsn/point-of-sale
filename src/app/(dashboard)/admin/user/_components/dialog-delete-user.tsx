import DialogDelete from "@/components/common/dialog-delete";
import { Profile } from "@/types/auth";
import React, { startTransition, useActionState, useEffect } from "react";
import { deleteUser } from "../actions";
import { INITIAL_STATE_ACTION } from "@/constants/general-constant";
import { toast } from "sonner";

const DialogDeleteUser = ({
  refetch,
  currentData,
  handleChangeAction,
  open
}: {
  refetch: () => void;
  currentData?: Profile;
  handleChangeAction: (open: boolean) => void;
  open: boolean;
}) => {
  const [deleteUserState, deleteUserAction, isPendingDeleteUser] = useActionState(deleteUser, INITIAL_STATE_ACTION)

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('id', currentData!.id as string)
    formData.append('avatar_url', currentData!.avatar_url as string)
    startTransition(() => {
      deleteUserAction(formData)
    })
  }

  useEffect(() => {
    if (deleteUserState.status === "error") {
      toast.error("Delete user Failed", {
        description: deleteUserState.errors?._form?.[0],
      });
    }

    if (deleteUserState.status === "success") {
      toast.success("Delete user success");
      handleChangeAction?.(false);
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [deleteUserState]);

  return (
    <DialogDelete
      open={open}
      onOpenChange={handleChangeAction}
      isLoading={isPendingDeleteUser}
      onSubmit={onSubmit}
      title="User"
    />
  );
};

export default DialogDeleteUser;
