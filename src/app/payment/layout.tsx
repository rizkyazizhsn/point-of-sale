import { DarkModeToggle } from "@/components/common/darkmode-toggle";
import { Fragment } from "react";

type PaymentLayoutProps = {
  children: React.ReactNode;
};

const PaymentLayout = ({ children }: PaymentLayoutProps) => {
  return (
    <div className="relative bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="absolute top-4 right-4">
        <Fragment>
          <DarkModeToggle />
        </Fragment>
      </div>
      <div className="flex w-full max-w-sm flex-col gap-6">
        {children}
      </div>
    </div>
  );
};

export default PaymentLayout;
