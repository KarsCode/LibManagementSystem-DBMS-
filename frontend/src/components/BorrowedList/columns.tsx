"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BorrowedList = {
  isbn: string
  name: string
  borrowdate: string
  returndate: Date
}

export const columns: ColumnDef<BorrowedList>[] = [
    {
      accessorKey: "book_id",
      header: () => <div className="text-center font-bold">ISBN</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue("book_id")}</div>;
      }
    },
    {
      accessorKey: "book_name",
      header: () => <div className="text-center font-bold">Name</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue("book_name")}</div>;
      }
    },
    {
      accessorKey: "borrowdate",
      header: () => <div className="text-center font-bold">Borrow Date</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue("borrowdate")}</div>;
      }
    },
    {
      accessorKey: "returndate",
      header: () => <div className="text-center font-bold">Return Date</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue("returndate")}</div>;
      }
    },
  
  ];
  
