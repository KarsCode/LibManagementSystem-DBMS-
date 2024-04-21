"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type FineList = {
  name: string
  book_name: string
  fine_amount: string
}

export const columns: ColumnDef<FineList>[] = [
    {
      accessorKey: "name",
      header: () => <div className="text-center font-bold">Borrower Name</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue("name")}</div>;
      }
    },
    {
      accessorKey: "book_name",
      header: () => <div className="text-center font-bold">Book Name</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue("book_name")}</div>;
      }
    },
    {
      accessorKey: "fine_amount",
      header: () => <div className="text-center font-bold">Amount Due</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue("fine_amount")}</div>;
      }
    }
 
  
  ];
  
