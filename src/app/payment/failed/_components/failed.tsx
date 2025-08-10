import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";
import Link from "next/link";

const Failed = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <Ban className="size-15 text-red-400" />
      <h1 className="text-2xl font-bold">Payment Failed</h1>
      <Link href="/order">
        <Button>Back To Order</Button>
      </Link>
    </div>
  );
};

export default Failed;
