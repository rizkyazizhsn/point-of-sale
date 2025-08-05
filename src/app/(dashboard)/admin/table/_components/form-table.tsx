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
import { STATUS_LIST } from "@/constants/table-constant";
import { Preview } from "@/types/general";
import { Loader2 } from "lucide-react";
import React, { FormEvent } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

const FormTable = <T extends FieldValues>({
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
          <DialogTitle>{type} Table</DialogTitle>
          <DialogDescription>
            {type === "Create"
              ? "Add a new table."
              : "Update table information."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormInput
            form={form}
            name={"name" as Path<T>}
            label="Name"
            placeholder="Enter table name"
          />
          <FormInput
            form={form}
            name={"description" as Path<T>}
            label="Name"
            placeholder="Enter table description"
            type="textarea"
          />
          <FormInput
            form={form}
            name={"capacity" as Path<T>}
            label="Capacity"
            placeholder="Enter table capacity"
            type="number"
          />
          <FormSelect
            form={form}
            name={"status" as Path<T>}
            label="Status"
            selectItem={STATUS_LIST}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin" />}
              {type}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default FormTable;
