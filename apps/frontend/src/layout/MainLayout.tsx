import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="h-15 flex items-center px-4 border-b">
        <AnimatedThemeToggler className="ml-auto flex items-center justify-center cursor-pointer border border-amber-300 h-10 w-10 rounded-full" />
      </div>
      <div className={"h-[calc(100vh-60px)]"}>{children}</div>
    </>
  );
}
