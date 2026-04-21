import type { CreateCategoryDTO } from "@budget/contracts";
import { create } from "zustand";

type ActionType = "create" | "edit" | "delete";
type Action = {
  type: ActionType;
  data: CreateCategoryDTO;
};

export const categoryStore = create((set) => {
  return {
    form: { mode: "closed" },
    deleteConfirm: { mode: "closed" },

    handleActions: (action: Action) => {
      switch (action.type) {
        case "create":
          set({ form: { mode: "open" } });
          break;

        case "edit":
          set({ form: { mode: "open", data: action.data } });
          break;

        case "delete":
          set({ deleteConfirm: { mode: "open", data: action.data } });
          break;

        default:
          break;
      }
    },
    closeForm() {
      set({ form: { mode: "closed" } });
    },
  };
});
