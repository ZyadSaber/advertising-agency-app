import { RecordWithAnyValue } from "@/interfaces/global";

const isArrayHasData = (array?: RecordWithAnyValue[]) =>
  Array.isArray(array) && array.length > 0;

export default isArrayHasData;
