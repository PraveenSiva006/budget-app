import type { Transaction, TransactionWithRelations } from "@budget/contracts";
import { create } from "zustand";

type FormState =
  | { mode: "closed" }
  | { mode: "create" }
  | { mode: "update"; transaction: TransactionWithRelations };

type DeleteConfirmState =
  | { open: false }
  | { open: true; transaction: Transaction };

type Action =
  | { type: "create" }
  | { type: "update"; payload: TransactionWithRelations }
  | { type: "delete"; payload: Transaction };

type TransactionUIState = {
  form: FormState;
  deleteConfirm: DeleteConfirmState;

  handleActions: (action: Action) => void;
  closeForm: () => void;
  closeDeleteConfirm: () => void;
};

export const useTransactionUIStore = create<TransactionUIState>((set) => ({
  form: { mode: "closed" },
  deleteConfirm: { open: false },

  handleActions: (action) => {
    switch (action.type) {
      case "create":
        set({ form: { mode: "create" } });
        break;

      case "update":
        set({ form: { mode: "update", transaction: action.payload } });
        break;

      case "delete":
        set({ deleteConfirm: { open: true, transaction: action.payload } });
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
