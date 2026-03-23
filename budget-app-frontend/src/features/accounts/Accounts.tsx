import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function Accounts() {
  const [accounts] = useState<any[]>([
    {
      accountId: "1235",
      accountNumber: "301235456412",
      accountName: "SBI",
      accountBalance: 12440.09,
      accountHolderName: "Praveen S",
      accountType: "Bank",
    },
  ]);
  return accounts.map((account) => (
    <Card key={account.accountId}>
      <CardHeader>
        <CardTitle>{account.accountName}</CardTitle>
        <CardDescription>{account.accountHolderName}</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ));
}
