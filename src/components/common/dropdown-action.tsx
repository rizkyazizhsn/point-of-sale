import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { EllipsisVertical } from "lucide-react";

type Variant = "destructive" | "default";

type MenuItem = {
  menu: {
    label: string | React.ReactNode;
    variant?: Variant;
    action?: () => void;
    type?: "button" | "link";
  }[];
};

const DropdownAction = ({ menu }: MenuItem) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="text-muted-foreground size-8"
          size={"icon"}
        >
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        {menu.map((item, index) => (
          <DropdownMenuItem
            key={`dropdown-action-item-${index}`}
            variant={item.variant ?? "default"}
            asChild={item.type === "link"}
            onClick={item.action}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownAction;
