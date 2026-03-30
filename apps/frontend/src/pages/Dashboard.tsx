import React from "react";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/common/DatePicker";

export default function Dashboard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="flex h-full items-center justify-center ">
      Budget App UI Ready 🚀
      <Button>HI</Button>
      <DatePicker date={date} setDate={setDate} className="min-w-37.5" />
    </div>
  );
}
