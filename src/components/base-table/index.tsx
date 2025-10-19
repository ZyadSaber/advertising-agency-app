"use client"

import { useState, useCallback, useMemo, Fragment } from "react"
import { ChevronRight, ChevronDown, Expand } from "lucide-react";
import { useTranslation } from 'react-i18next';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import LoadingSpinner from "@/components/loading-spinner"
import { Button } from "@/components/ui/button";
import { RecordWithAnyValue } from "@/interfaces/global";
import isArrayHasData from "@/lib/isArrayHasData"
import { BaseTableProps } from "./interface"
import generateFixedColumns from "./helpers/generateFixedColumns";
import useBoundingClientRef from "./hooks/useBoundingClientRef";

const BaseTable = ({
    AddButtonLabel,
    onClickOpen,
    columns,
    dataSource,
    isLoading,
    handleEdit,
    handleDelete,
    actionButtons,
    rowKey,
    renderExpanded,
    actionColumnsWidth = 120,
    hasNextPage,
    hasPrevPage,
    currentPage = 1,
    totalPages,
    onPressNext,
    onPressPrevious,
    hidePagination

}: BaseTableProps) => {
    const { t } = useTranslation();
    const [expanded, setExpanded] = useState<number | string>(undefined);
    const [ref, rect] = useBoundingClientRef();

    const toggleRow = useCallback((key: string | number) => () => {
        setExpanded(prev => prev === key ? undefined : key);
    }, []);

    const showExpandColumn = !!renderExpanded;
    // const showActionColumn = !!onPressActionIcon;
    const containerWidthNumber = rect?.width ?? 200

    const adjustedColumns = useMemo(
        () =>
            generateFixedColumns({
                containerWidthNumber,
                columnsFromProps: columns,
                showExpandColumn,
            }) || [],
        [containerWidthNumber, columns, showExpandColumn],
    );

    return (
        <>
            <div className="w-full text-center" ref={ref}>
                <Button className="p-2 cursor-pointer" variant="default" onClick={onClickOpen} disabled={isLoading}>
                    {t(AddButtonLabel || "addnew")}
                </Button>
            </div>
            <div className="rounded-lg overflow-x-auto border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 shadow-2xl mt-8">
                <Table className="table-fixed">
                    <TableHeader>
                        <TableRow className=" bg-white/70 dark:bg-slate-900/70 sticky top-0 z-10">
                            {renderExpanded &&
                                <TableHead className="w-[50px]" >
                                    <Expand />
                                </TableHead>
                            }
                            {adjustedColumns.map((col, index) => (
                                <TableHead style={{
                                    width: `${col.width}px`
                                }} key={index}>{t(col.label || "")}</TableHead>
                            ))}
                            <TableHead style={{
                                width: `${actionColumnsWidth}px`
                            }}>{t("actns")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ?
                            <TableRow>
                                <TableCell colSpan={columns.length + 2}>
                                    <div className="w-full flex justify-center items-center p-5">
                                        <LoadingSpinner />
                                    </div>
                                </TableCell>
                            </TableRow>
                            : isArrayHasData(dataSource) ? dataSource.map((record: RecordWithAnyValue, index: number) => (
                                <Fragment key={index}>
                                    <TableRow
                                        className={
                                            (index % 2 === 0 ? "bg-slate-50 dark:bg-slate-900/40" : "bg-white dark:bg-slate-900/60")
                                        }
                                    >
                                        {renderExpanded && <TableCell className="w-[25px]">
                                            <button
                                                aria-label={record[rowKey] === expanded ? 'Collapse row' : 'Expand row'}
                                                onClick={toggleRow(record[rowKey])}
                                                className="w-full flex justify-center items-center"
                                            >
                                                {record[rowKey] === expanded ? <ChevronDown /> : <ChevronRight />}
                                            </button>
                                        </TableCell>}
                                        {columns.map((col, index) => (
                                            <TableCell key={index}>
                                                {isLoading ? <span className="block h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" /> : record[col.dataIndex]?.toString()}
                                            </TableCell>
                                        ))}
                                        <TableCell>
                                            <div className="flex gap-2 justify-center w-full wrap">
                                                <Button disabled={isLoading} className="p-2 cursor-pointer" variant="default" onClick={() => handleEdit?.(record)}>
                                                    {t("edt")}
                                                </Button>
                                                <Button disabled={isLoading} className="p-2 cursor-pointer" variant="destructive" onClick={() => handleDelete?.(record)}>
                                                    {t("dlt")}
                                                </Button>
                                                {actionButtons?.map(({ title, type, onClick }, index) => (
                                                    <Button key={index} className="p-2 cursor-pointer" variant={type} onClick={() => onClick?.(record)}>
                                                        {title}
                                                    </Button>
                                                ))}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    {renderExpanded && record[rowKey] === expanded && (
                                        <TableRow>
                                            <TableCell colSpan={columns.length + 2} className="pr-7 pl-7 pt-3 pb-3 ">
                                                {renderExpanded(record)}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </Fragment>
                            )) : undefined
                        }
                    </TableBody>
                </Table>
            </div>
            {isArrayHasData(dataSource) && !hidePagination &&
                <Pagination className="mt-2">
                    <PaginationContent>
                        {hasPrevPage &&
                            <>
                                <PaginationItem>
                                    <PaginationPrevious onClick={onPressPrevious} />
                                </PaginationItem>
                                <PaginationLink onClick={onPressPrevious}>{currentPage - 1}</PaginationLink>
                            </>
                        }
                        <PaginationItem>
                            <PaginationLink isActive>{currentPage}</PaginationLink>
                        </PaginationItem>
                        {hasNextPage &&
                            <>
                                <PaginationItem>
                                    <PaginationLink onClick={onPressNext}>{currentPage + 1}</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext onClick={onPressNext} />
                                </PaginationItem>
                            </>
                        }
                        {t("total")}: {totalPages || dataSource?.length}
                    </PaginationContent>
                </Pagination>
            }
        </>
    )
}

export default BaseTable

export * from "./interface"