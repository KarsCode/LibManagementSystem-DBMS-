"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BookList = {
  isbn: string
  name: string
  author: string
  genre: string
  inventory: number
}

export const columns: ColumnDef<BookList>[] = [
    {
      accessorKey: "isbn",
      header: () => <div className="text-center font-bold">ISBN</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue("isbn")}</div>;
      }
    },
    {
      accessorKey: "name",
      header: () => <div className="text-center font-bold">Name</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue("name")}</div>;
      }
    },
    {
      accessorKey: "author",
      header: () => <div className="text-center font-bold">Author</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue("author")}</div>;
      }
    },
    {
      accessorKey: "genre",
      header: () => <div className="text-center font-bold">Genre</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue("genre")}</div>;
      }
    },
    {
      accessorKey: "inventory",
      header: () => <div className="text-center font-bold">Inventory</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue("inventory")}</div>;
      }
    }
  ];
  
