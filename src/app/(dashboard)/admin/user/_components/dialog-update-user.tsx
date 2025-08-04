import { INITIAL_STATE_UPDATE_USER } from "@/constants/auth-constant";
import {
  updateUserForm,
  updateUserSchema,
} from "@/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateUser } from "../actions";
import FormUser from "./form-user";
import { Profile } from "@/types/auth";
import { Dialog } from "@/components/ui/dialog";

const DialogUpdateUser = ({
  refetch,
  currentData,
  handleChangeAction,
  open
}: {
  refetch: () => void;
  currentData?: Profile;
  handleChangeAction?: (open: boolean) => void;
  open?: boolean
}) => {
  const form = useForm<updateUserForm>({
    resolver: zodResolver(updateUserSchema),
  });

  const [updateUserState, updateUserAction, isPendingUpdateUser] =
    useActionState(updateUser, INITIAL_STATE_UPDATE_USER);

  const [preview, setPreview] = useState<
    { file: File; displayUrl: string } | undefined
  >(undefined);

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    if (currentData?.avatar_url !== data.avatar_url) {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(
          key,
          key === "avatar_url" ? preview!.file ?? "" : value
        );
      });
      formData.append("old_avatar_url", currentData?.avatar_url ?? "");
    } else {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }
    formData.append("id", currentData?.id ?? "");

    startTransition(() => {
      updateUserAction(formData);
    });
  });

  useEffect(() => {
    if (updateUserState.status === "error") {
      toast.error("Login Failed", {
        description: updateUserState.errors?._form?.[0],
      });
    }

    if (updateUserState.status === "success") {
      toast.success("Update user success");
      form.reset();
      handleChangeAction?.(false);
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [updateUserState]);

  useEffect(() => {
    if (currentData) {
      form.setValue("name", currentData.name as string);
      form.setValue("role", currentData.role as string);
      form.setValue("avatar_url", currentData.avatar_url as string);
      setPreview({
        file: new File([], currentData.avatar_url as string),
        displayUrl: currentData.avatar_url as string,
      });
    }
  }, [currentData]);

  return (
    <Dialog open={open} onOpenChange={handleChangeAction}>
      <FormUser
        form={form}
        onSubmit={onSubmit}
        isLoading={isPendingUpdateUser}
        type="Update"
        preview={preview}
        setPreview={setPreview}
      />
    </Dialog>
  );
};

export default DialogUpdateUser;
