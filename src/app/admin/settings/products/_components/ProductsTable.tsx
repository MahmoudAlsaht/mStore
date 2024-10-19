"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowBigLeft,
  ArrowBigRight,
  ChevronDown,
  Clipboard,
  Loader2,
  MoreHorizontal,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useTransition } from "react";
import { Product } from "@prisma/client";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { deleteProduct } from "../_actions/deleteProduct";
import { LoadingLink } from "@/app/(siteFacing)/_context/LoadingContext";

type BarCode = { code: string; id: string };

export default function ProductsTable({
  data,
}: {
  data: Partial<Product & BarCode[]>[];
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isPending, startTransition] = useTransition();
  const [globalFilter, setGlobalFilter] = useState("");
  const router = useRouter();

  const columns: ColumnDef<Partial<Product & BarCode[]>>[] = [
    {
      accessorKey: "index",
      header: () => <div className="text-right">{data.length}</div>,
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("index")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: () => <div className="text-right">الاسم</div>,
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name" as string)}</div>
      ),
    },
    {
      accessorKey: "barCodes",
      header: () => <div className="text-right">كود المنتج</div>,
      cell: ({ row }) => (
        <div className="capitalize">
          {(row.getValue("barCodes") as BarCode[]).length > 1 ? (
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger className="flex items-center rounded-lg p-2 text-rayanPrimary-dark hover:bg-slate-200">
                <ChevronDown className="size-4" />
                <span>{(row.getValue("barCodes") as BarCode[])[0]?.code}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {(row.getValue("barCodes") as BarCode[]).map((code) => (
                  <DropdownMenuItem
                    className="flex cursor-pointer justify-between"
                    key={code.id}
                    onClick={() =>
                      navigator.clipboard.writeText(code.code as string)
                    }
                  >
                    {code.code}
                    <Clipboard className="size-3" />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (row.getValue("barCodes") as any[])[0]?.code ? (
            <div
              className="flex w-fit cursor-pointer items-center gap-1 rounded-lg p-2 hover:bg-slate-200"
              onClick={() =>
                navigator.clipboard.writeText(
                  (row.getValue("barCodes") as any[])[0]?.code as string,
                )
              }
            >
              <Clipboard className="size-4" />
              {(row.getValue("barCodes") as any[])[0]?.code}
            </div>
          ) : (
            "لا يوجد"
          )}
        </div>
      ),
    },
    {
      accessorKey: "image",
      header: () => <div className="text-right">صورة المنتج</div>,
      cell: ({ row }) => (
        <Image
          alt={row.getValue("name")}
          src={(row.getValue("image") as string).replace(
            "/upload",
            "/upload/w_100",
          )}
          width={100}
          height={100}
          className="h-20 w-24"
        />
      ),
    },
    {
      id: "الخيارات",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;
        return (
          <Dialog>
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <LoadingLink
                  href={`/admin/settings/products/${product.id}/barCodes`}
                >
                  <DropdownMenuItem>كود المنتج</DropdownMenuItem>
                </LoadingLink>
                <LoadingLink
                  href={`/admin/settings/products/${product.id}/labels`}
                >
                  <DropdownMenuItem>الكلمات المفتاحية</DropdownMenuItem>
                </LoadingLink>
                <LoadingLink href={`/admin/settings/products/${product.id}`}>
                  <DropdownMenuItem className="text-rayanWarning-dark">
                    تعديل
                  </DropdownMenuItem>
                </LoadingLink>
                <DropdownMenuSeparator />

                <DialogTrigger asChild>
                  <DropdownMenuItem className="text-rayanError-light">
                    حذف{" "}
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-destructive">
                  حذف المنتج {product.name}
                </DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="w-full bg-none text-destructive hover:bg-destructive hover:text-white"
                  onClick={() => {
                    startTransition(async () => {
                      await deleteProduct(product.id as string);
                      router.refresh();
                    });
                  }}
                >
                  {isPending ? (
                    <Loader2 className="animate-spin text-rayanPrimary-dark dark:text-rayanPrimary-light" />
                  ) : (
                    "حذف"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: (row, columnId, filterValue) => {
      const barCodes = row.getValue("barCodes");
      return (barCodes as BarCode[]).some((barcode) =>
        barcode.code.toLowerCase().includes(filterValue.toLowerCase()),
      );
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="اكتب اسم المنتج"
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="ml-2 max-w-sm"
        />

        <LoadingLink href="/admin/settings/products/new">
          <Button variant="outline">
            <Plus className="ml-2 h-4 w-4" />
          </Button>
        </LoadingLink>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto px-2">
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center py-4">
        <Input
          placeholder="اكتب كود المنتج"
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="ml-2 max-w-sm"
          value={globalFilter ?? ""}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {!isPending ? (
              table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    لا يوجد منتحات{" "}
                  </TableCell>
                </TableRow>
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  جار الحذف...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="container space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowBigRight />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ArrowBigLeft />
          </Button>
        </div>
      </div>
    </div>
  );
}
