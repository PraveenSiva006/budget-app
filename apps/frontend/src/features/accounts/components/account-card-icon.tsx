import clsx from "clsx";

import type { AccountType } from "@budget/contracts";
import { getAccountUI } from "@/shared/domain/account-ui";

export function AccountIcon({ cardType }: { cardType: AccountType }) {
  const config = getAccountUI(cardType);

  const Icon = config.icon;
  return (
    <div
      className={clsx(
        "inline-flex items-center justify-center w-9 h-9 rounded-full dark:bg-background",
        config.colors.bg,
        config.colors.text,
      )}
    >
      <Icon size={20} strokeWidth={0.8} />
    </div>
  );
}
