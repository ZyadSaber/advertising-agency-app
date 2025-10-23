import { RecordWithAnyValue } from "@/interfaces/global";
import { useRef, useCallback } from "react";

// Define the interface for the table ref
interface SelectRef {
  runQuery: (params: RecordWithAnyValue) => Promise<any>;
}

// Define the return type for the hook
interface UseTableFunctionFromRefReturn {
  selectValuesRef: React.RefObject<SelectRef>;
  fetchSelectOptions: (nextParams?: RecordWithAnyValue) => Promise<any>;
}

const useSelectValuesRef = (): UseTableFunctionFromRefReturn => {
  const selectValuesRef = useRef<SelectRef>(null);

  const fetchSelectOptions = useCallback(
    async (nextParams: RecordWithAnyValue) =>
      await selectValuesRef.current?.runQuery(nextParams),
    [selectValuesRef]
  );

  return {
    selectValuesRef,
    fetchSelectOptions,
  };
};

export default useSelectValuesRef;
