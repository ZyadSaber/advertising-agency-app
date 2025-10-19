import { useState, useCallback, forwardRef, memo, useImperativeHandle } from "react"
import useFetch from "@/hooks/useFetch";
import { RecordWithAnyValue } from "@/interfaces/global";
import { TableWithApiProps } from "./interface"
import BaseTable from "@/components/base-table";
import useFormManager from "@/hooks/useFormManager";

interface TableRef {
    runQuery: (params: RecordWithAnyValue) => Promise<any>;
}

const TableWithApi = ({
    tableParams,
    callOnFirstRender,
    endPoint,
    ...params
}: TableWithApiProps,
    ref?: React.ForwardedRef<TableRef>
) => {

    const {
        values: {
            dataSource,
            page,
            total,
            hasNextPage,
            hasPrevPage,
            records_size,
            page_count
        },
        handleChange,
        handleChangeMultiInputs
    } = useFormManager({
        initialValues: {
            dataSource: [],
            page: 1,
            total: 0,
            hasNextPage: false,
            hasPrevPage: false,
            records_size: 10,
            page_count: 1
        }
    })

    const handleApiResponse = useCallback((data?: RecordWithAnyValue, error?: string | unknown) => {
        if (error) {
            return
        }
        const { data: recordData, pagination } = data || {}
        handleChangeMultiInputs({
            dataSource: recordData,
            ...pagination
        })
    }, [handleChangeMultiInputs])

    const { isLoading, runQuery } = useFetch({
        endpoint: endPoint,
        params: {
            ...tableParams,
            records_size,
            page_count
        },
        callOnFirstRender: callOnFirstRender,
        onResponse: handleApiResponse
    })

    useImperativeHandle(ref, () => ({
        runQuery,
    }));

    const handleNextPage = useCallback(() => {
        handleChange("page_count", page_count + 1)
        runQuery({
            page_count: page_count + 1
        })
    }, [handleChange, page_count, runQuery])

    const handlePreviousPage = useCallback(() => {
        handleChange("page_count", page_count - 1)
        runQuery({
            page_count: page_count + 1
        })
    }, [handleChange, page_count, runQuery])

    return (
        <>
            <BaseTable
                dataSource={dataSource}
                isLoading={isLoading}
                currentPage={page}
                totalPages={total}
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
                onPressNext={handleNextPage}
                onPressPrevious={handlePreviousPage}
                {...params}
            />
        </>
    )
}

export default memo(forwardRef(TableWithApi))
export { default as useTableFunctionFromRef } from "./hooks/useTableFunctionFromRef"