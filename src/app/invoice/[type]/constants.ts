import { format } from "date-fns";

export const PAGE_MODE = {
  S: {
    pageTitle: "prchsinvc",
    listEndPoint: "suppliers/get_suppliers_list",
    listName: "supplier_id",
    listLabel: "splrnm",
  },
  C: {
    pageTitle: "slsinvc",
    listEndPoint: "customers/get_customers_list",
    listName: "customer_id",
    listLabel: "cstmrnm",
  },
};

export const INITIAL_VALUES = {
  invoice_date: format(new Date(), "yyyy-MM-dd"),
  invoice_notes: "",
  supplier_id: "",
  customer_id: "",
  invoiceDetails: [],
  item_no: "",
  width: 0,
  height: 0,
  quantity: 0,
  price: 0,
  item_name: "",
  discount: 0,
  notes: "",
  paid: 0,
  bank: 0,
};

export const INVOICE_DETAILS_COLUMNS = [
  {
    label: "id",
    dataIndex: "item_no",
    width: "5%",
  },
  {
    label: "itmnm",
    dataIndex: "item_name",
    width: "20%",
  },
  {
    label: "wdth",
    dataIndex: "width",
    width: "7%",
  },
  {
    label: "hght",
    dataIndex: "height",
    width: "7%",
  },
  {
    label: "spc",
    dataIndex: "space",
    width: "7%",
  },
  {
    label: "qnty",
    dataIndex: "quantity",
    width: "7%",
  },
  {
    label: "alspc",
    dataIndex: "all_space",
    width: "7%",
  },
  {
    label: "prc",
    dataIndex: "price",
    width: "7%",
  },
  {
    label: "ttlprc",
    dataIndex: "total_price",
    width: "7%",
  },
  {
    label: "nts",
    dataIndex: "notes",
    width: "15%",
  },
];
