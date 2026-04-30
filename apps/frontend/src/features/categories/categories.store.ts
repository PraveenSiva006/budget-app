import type { CategoryDTO } from "@budget/contracts";
import { create } from "zustand";

type FormState =
  | { mode: "closed" }
  | { mode: "create" }
  | { mode: "edit"; category: CategoryDTO };

type DeleteConfirmState =
  | { open: false }
  | { open: true; category: CategoryDTO };

type Action =
  | { type: "create" }
  | { type: "edit"; payload: CategoryDTO }
  | { type: "delete"; payload: CategoryDTO };

type CategoryUIState = {
  form: FormState;
  deleteConfirm: DeleteConfirmState;

  handleActions: (action: Action) => void;
  closeForm: () => void;
  closeDeleteConfirm: () => void;
};

export const useCategoryUIStore = create<CategoryUIState>((set) => ({
  form: { mode: "closed" },
  deleteConfirm: { open: false },

  handleActions: (action) => {
    switch (action.type) {
      case "create":
        set({ form: { mode: "create" } });
        break;

      case "edit":
        set({ form: { mode: "edit", category: action.payload } });
        break;

      case "delete":
        set({ deleteConfirm: { open: true, category: action.payload } });
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
