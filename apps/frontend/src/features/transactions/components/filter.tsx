import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useTransactionUIStore } from "@/features/transactions/transaction.store";
import { Plus } from "lucide-react";
import { useState } from "react";

type Filters = "search" | "account" | "recordType";

type FiltersType = Record<Filters, string>;

type InputConfig = {
  key: Filters;
  label: string;
}[];

export default function TransactionFilter() {
  const handleActions = useTransactionUIStore((state) => state.handleActions);

  const [filter, setFilter] = useState<FiltersType>({
    search: "",
    account: "",
    recordType: "",
  });

  const inputsConfig: InputConfig = [
    { key: "search", label: "Search" },
    { key: "account", label: "Account" },
    { key: "recordType", label: "Record Type" },
  ];

  return (
    <div className="py-3 h-[calc(100vh-64px)]">
      <div className="bg-neutral-50 dark:bg-gray-900 p-3 h-full">
        <div className="mb-1 pb-2 border-b text-lg flex justify-between">
          Transactions
          <Button onClick={() => handleActions({ type: "create" })}>
            <Plus />
          </Button>
        </div>
        <div>
          <FieldGroup>
            {inputsConfig.map((config) => (
              <Field className="gap-1 col-span-full" key={config.key}>
                <FieldLabel htmlFor={config.key}>{config.label}</FieldLabel>

                <Input
                  id={config.key}
                  value={filter[config.key]}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      [config.key]: e.target.value,
                    });
                  }}
                  placeholder={config.label}
                />
              </Field>
            ))}
          </FieldGroup>
        </div>
      </div>
    </div>
  );
}
