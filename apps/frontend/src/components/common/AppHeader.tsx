import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

import { Dock, Landmark, Settings, WalletCards } from "lucide-react";
import { Link } from "react-router";

const AppHeader = () => {
  return (
    <header className="flex w-full h-16 shrink-0 justify-center items-center border-b">
      <div className="flex items-center gap-7 app-container">
        <Link to="/" className="flex flex-row gap-x-3">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Landmark size={18} />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Budget</span>
            <span className="truncate text-xs">Friendly</span>
          </div>
        </Link>

        <Link to="/accounts" className="inline-flex items-center ml-2">
          <WalletCards size={18} />
          <span className="ml-2">Accounts</span>
        </Link>

        <Link to="/categories" className="inline-flex items-center">
          <Settings size={18} />
          <span className="ml-2">Categories</span>
        </Link>

        <Link to="/transactions" className="inline-flex items-center">
          <Dock size={18} />
          <span className="ml-2">Transactions</span>
        </Link>

        <AnimatedThemeToggler className="ml-auto cursor-pointer border flex items-center justify-center rounded-full w-9 h-9" />
      </div>
    </header>
  );
};

export default AppHeader;
