import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Payment = {
  id: string;
  pending_installment_amt: number;
  status: "pending" | "processing" | "success" | "failed";
  loan_acc_num: string;
  name: string;
  user_id: string;
  loan_id: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: (row, id, filterValues) => {
      // Combine name and email for filtering
      const combinedInfo = `${row.original.name} ${row.original.loan_acc_num}`;
      let searchTerms = Array.isArray(filterValues)? filterValues : [filterValues];
      console.log(id);
      return searchTerms.some(term => combinedInfo.toLowerCase().includes(term.toLowerCase()));
    },
  },
  {
    accessorKey: "loan_acc_num",
    header: "Loan account number"
  },
  {
    accessorKey: "pending_installment_amt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pending Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const pending_installment_amt = parseFloat(row.getValue("pending_installment_amt"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(pending_installment_amt);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
