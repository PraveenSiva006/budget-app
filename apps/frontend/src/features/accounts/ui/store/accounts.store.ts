import type { AccountDTO } from "@budget/contracts";
import { create } from "zustand";

type AccountAction =
  | { type: "create" }
  | { type: "edit"; payload: AccountDTO }
  | { type: "delete"; payload: AccountDTO };

type FormState =
  | { mode: "closed" }
  | { mode: "create" }
  | { mode: "edit"; account: AccountDTO };

type DeleteConfirmState = { open: false } | { open: true; account: AccountDTO };

interface AccountUIState {
  form: FormState;
  deleteConfirm: DeleteConfirmState;

  handleAction: (action: AccountAction) => void;

  closeForm: () => void;
  closeDeleteConfirm: () => void;
}

export const useAccountUIStore = create<AccountUIState>((set) => ({
  form: { mode: "closed" },

  deleteConfirm: { open: false },

  handleAction(action: AccountAction) {
    switch (action.type) {
      case "create":
        set({ form: { mode: "create" } });
        break;

      case "edit":
        set({
          form: { mode: "edit", account: action.payload },
        });
        break;

      case "delete":
        set({ deleteConfirm: { open: true, account: action.payload } });
        break;
    }
  },

  closeForm() {
    set({ form: { mode: "closed" } });
  },
  closeDeleteConfirm() {
    set({ deleteConfirm: { open: false } });
  },
}));
