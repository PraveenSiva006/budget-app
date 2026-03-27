import clsx from "clsx";
import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className={clsx("h-15 border-b")}>hi</div>
      <div className={"h-[calc(100vh-60px)]"}>{children}</div>
    </>
  );
}
