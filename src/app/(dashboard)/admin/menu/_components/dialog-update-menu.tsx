import { zodResolver } from "@hookform/resolvers/zod";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateMenu } from "../actions";
import { Dialog } from "@/components/ui/dialog";
import { Menu, MenuForm, menuFormSchema } from "@/validations/menu-validation";
import { INITIAL_STATE_MENU } from "@/constants/menu-constant";
import FormMenu from "./form-menu";

const DialogUpdateMenu = ({
  refetch,
  currentData,
  handleChangeAction,
  open
}: {
  refetch: () => void;
  currentData?: Menu;
  handleChangeAction?: (open: boolean) => void;
  open?: boolean
}) => {
  const form = useForm<MenuForm>({
    resolver: zodResolver(menuFormSchema),
  });

  const [updateMenuState, updateMenuAction, isPendingUpdateMenu] =
    useActionState(updateMenu, INITIAL_STATE_MENU);

  const [preview, setPreview] = useState<
    { file: File; displayUrl: string } | undefined
  >(undefined);

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    if (currentData?.image_url !== data.image_url) {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(
          key,
          key === "image_url" ? preview!.file ?? "" : value
        );
      });
      formData.append("old_image_url", currentData?.image_url ?? "");
    } else {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }
    formData.append("id", currentData?.id ?? "");

    startTransition(() => {
      updateMenuAction(formData);
    });
  });

  useEffect(() => {
    if (updateMenuState.status === "error") {
      toast.error("Get Menu Failed", {
        description: updateMenuState.errors?._form?.[0],
      });
    }

    if (updateMenuState.status === "success") {
      toast.success("Update menu success");
      form.reset();
      handleChangeAction?.(false);
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [updateMenuState]);

  useEffect(() => {
    if (currentData) {
      form.setValue("name", currentData.name);
      form.setValue("description", currentData.description);
      form.setValue("price", currentData.price.toString());
      form.setValue("discount", currentData.discount.toString());
      form.setValue("category", currentData.category);
      form.setValue("is_available", currentData.is_available.toString());
      form.setValue("image_url", currentData.image_url);
      setPreview({
        file: new File([], currentData.image_url as string),
        displayUrl: currentData.image_url as string,
      });
    }
  }, [currentData]);

  return (
    <Dialog open={open} onOpenChange={handleChangeAction}>
      <FormMenu
        form={form}
        onSubmit={onSubmit}
        isLoading={isPendingUpdateMenu}
        type="Update"
        preview={preview}
        setPreview={setPreview}
      />
    </Dialog>
  );
};

export default DialogUpdateMenu;
