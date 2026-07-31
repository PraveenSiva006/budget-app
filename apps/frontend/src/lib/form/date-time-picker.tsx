import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFormField } from "@/lib/form";

export function DatePickerTime({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  const { value, onChange, error, invalid } = useFormField(name);

  const date = value ? new Date(value) : undefined;

  const handleDateChange = (selected?: Date) => {
    if (!selected) {
      onChange(null);
      return;
    }

    // Preserve the current time
    if (date) {
      selected.setHours(date.getHours(), date.getMinutes(), date.getSeconds());
    }

    onChange(selected);
  };

  const handleTimeChange = (time: string) => {
    const [hours, minutes, seconds = "0"] = time.split(":");

    const next = date ? new Date(date) : new Date();

    next.setHours(Number(hours), Number(minutes), Number(seconds));

    onChange(next);
  };
  return (
    <FieldGroup
      data-invalid={invalid}
      className="mx-auto flex flex-row col-span-full gap-0"
    >
      <Field className="w-2/3">
        <FieldLabel>{label}</FieldLabel>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between font-normal"
            >
              {date ? format(date, "PPP") : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              defaultMonth={date}
              captionLayout="dropdown"
              onSelect={handleDateChange}
            />
          </PopoverContent>
        </Popover>
      </Field>

      <Field className="w-1/3 mt-auto">
        <Input
          type="time"
          step="1"
          value={date ? format(date, "HH:mm:ss") : ""}
          onChange={(e) => handleTimeChange(e.target.value)}
          className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>

      {error && <FieldError>{error.message}</FieldError>}
    </FieldGroup>
  );
}
