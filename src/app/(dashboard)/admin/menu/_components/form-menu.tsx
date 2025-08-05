import FormImage from "@/components/common/form-image";
import FormInput from "@/components/common/form-input";
import FormSelect from "@/components/common/form-select";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { AVAILABILITY_LIST, CATEGORY_LIST } from "@/constants/menu-constant";
import { Preview } from "@/types/general";
import { Loader2 } from "lucide-react";
import React, { FormEvent } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

const FormMenu = <T extends FieldValues>({
  form,
  onSubmit,
  isLoading,
  type,
  preview,
  setPreview,
}: {
  form: UseFormReturn<T>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  type: "Create" | "Update";
  preview?: Preview;
  setPreview?: (preview: Preview) => void;
}) => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <Form {...form}>
        <DialogHeader>
          <DialogTitle>{type} Menu</DialogTitle>
          <DialogDescription>
            {type === "Create" ? "Add a new menu." : "Update menu information."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormInput
            form={form}
            name={"name" as Path<T>}
            label="Name"
            placeholder="Enter menu name"
          />
          <FormInput
            form={form}
            name={"description" as Path<T>}
            label="Name"
            placeholder="Enter menu description"
            type="textarea"
          />
          <FormInput
            form={form}
            name={"price" as Path<T>}
            label="Price"
            placeholder="Enter menu price"
            type="number"
          />
          <FormInput
            form={form}
            name={"discount" as Path<T>}
            label="Discount"
            placeholder="Enter menu discount"
            type="number"
          />
          <FormSelect
            form={form}
            name={"category" as Path<T>}
            label="Category"
            selectItem={CATEGORY_LIST}
          />
          <FormImage
            form={form}
            name={"image_url" as Path<T>}
            label="Image"
            preview={preview}
            setPreview={setPreview}
          />
          <FormSelect
            form={form}
            name={"is_available" as Path<T>}
            label="Availability"
            selectItem={AVAILABILITY_LIST}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {isLoading ? <Loader2 className="animate-spin" /> : type}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default FormMenu;
