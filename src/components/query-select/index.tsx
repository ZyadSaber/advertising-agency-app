import { useCallback, useImperativeHandle, useState } from "react";
import Select, { SharedSelectProps, OptionType } from "@/components/select"
import useFetch from "@/hooks/useFetch";
import { RecordWithAnyValue } from "@/interfaces/global";

interface QuerySelectProps extends SharedSelectProps {
    endPoint: string;
}

interface SelectRef {
    runQuery: (params?: RecordWithAnyValue) => Promise<any>;
}

const QuerySelect = (
    { endPoint, ...props }: QuerySelectProps,
    ref?: React.ForwardedRef<SelectRef>
) => {
    const [options, setOptions] = useState<OptionType[]>([])

    const handleApiResponse = useCallback((data?: OptionType[], error?: string | unknown) => {
        if (error) {
            return
        }
        setOptions(data || [])
    }, [])

    const { isLoading, runQuery } = useFetch({
        endpoint: endPoint,
        callOnFirstRender: true,
        onResponse: handleApiResponse
    })

    useImperativeHandle(ref, () => ({
        runQuery,
    }));

    return (
        <Select
            loading={isLoading}
            options={options}
            {...props}
        />
    )
}

export default QuerySelect
export { default as useSelectValuesRef } from "./hooks/useSelectValuesRef"