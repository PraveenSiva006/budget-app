import React from "react";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/common/DatePicker";

export default function App() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="flex h-screen items-center justify-center ">
      Budget App UI Ready 🚀
      <Button>HI</Button>
      <DatePicker date={date} setDate={setDate} className="min-w-[150px]" />
    </div>
  );
}
