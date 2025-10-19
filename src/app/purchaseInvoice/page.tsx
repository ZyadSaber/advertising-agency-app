"use client"

import { useCallback, useMemo } from "react"
import { format } from 'date-fns';
import Header from "@/components/header";
import useFormManager from "@/hooks/useFormManager";
import DatePicker from "@/components/date-picker";
import InputText from "@/components/input-text";
import QuerySelect from "@/components/query-select";
import BaseTable from "@/components/base-table";
import { INVOICE_DETAILS_COLUMNS } from "./constants"
import InputNumber from "@/components/input-number";
import { RecordWithAnyValue } from "@/interfaces/global";

const PurchaseInvoice = () => {

    const {
        values: {
            invoice_date,
            invoice_notes,
            supplier_id,
            invoiceDetails,
            width,
            item_id,
            height,
            quantity,
            price,
            item_name,
            notes
        },
        handleChange,
        handleChangeMultiInputs
    } = useFormManager({
        initialValues: {
            invoice_date: format(new Date(), "yyyy-MM-dd"),
            invoice_notes: "",
            supplier_id: "",
            invoiceDetails: [],
            item_id: "",
            width: 0,
            height: 0,
            quantity: 0,
            price: 0,
            item_name: "",
            notes: ""
        }
    })

    const spaceValue = useMemo(() => +width * +height, [height, width])
    const allSpaceValue = useMemo(() => spaceValue * +quantity, [quantity, spaceValue])
    const totalPriceValue = useMemo(() => allSpaceValue * +price, [allSpaceValue, price])

    const handleChangeItemValue = useCallback((name: string, value: string, record: RecordWithAnyValue) => {
        handleChangeMultiInputs({
            [name]: value,
            item_name: record?.item_name
        })
    }, [handleChangeMultiInputs])

    const handleAddItem = useCallback(() => {
        const computedDataSource = [
            {
                rowKey: invoiceDetails + 2,
                item_id,
                item_name,
                width,
                height,
                space: spaceValue,
                quantity,
                all_space: allSpaceValue,
                price,
                total_price: totalPriceValue,
                notes
            },
            ...invoiceDetails
        ]
        handleChange("invoiceDetails", computedDataSource)
        handleChangeMultiInputs({
            item_id: "",
            item_name: "",
            width: 0,
            height: 0,
            quantity: 0,
            price: 0,
            notes: ""
        })
    }, [allSpaceValue, handleChange, handleChangeMultiInputs, height, invoiceDetails, item_id, item_name, notes, price, quantity, spaceValue, totalPriceValue, width])

    const deleteItem = useCallback((record: RecordWithAnyValue) => {
        const computedDataSource = invoiceDetails.filter(({ rowKey }) => rowKey !== record?.rowKey)
        handleChange("invoiceDetails", computedDataSource)
    }, [handleChange, invoiceDetails])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">

            <Header pageTitle="prchsinvc" />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-3 flex-wrap mb-5">
                    <DatePicker
                        name="invoice_date"
                        value={invoice_date}
                        label="invcdt"
                        onChange={handleChange}
                        className="w-[15%]"
                    />
                    <QuerySelect
                        name="supplier_id"
                        value={supplier_id}
                        onChange={handleChange}
                        label="splrnm"
                        className="w-[25%]"
                        endPoint="suppliers\get_suppliers_list"
                    />
                    <InputText
                        value={invoice_notes}
                        name="invoice_notes"
                        onChange={handleChange}
                        label="nts"
                        className="w-[25%]"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="border p-2 rounded px-4 flex flex-wrap gap-2">
                        <QuerySelect
                            name="item_id"
                            value={item_id}
                            onChange={handleChangeItemValue}
                            label="itmnm"
                            className="w-[25%]"
                            endPoint="items\get_items_list"
                        />
                        <InputNumber
                            label="wdth"
                            className="w-[10%]"
                            onChange={handleChange}
                            name="width"
                            value={width}
                            min={0}
                        />
                        <InputNumber
                            label="hght"
                            className="w-[10%]"
                            onChange={handleChange}
                            name="height"
                            value={height}
                            min={0}
                        />
                        <InputNumber
                            label="spc"
                            className="w-[10%]"
                            name="spacwe"
                            value={spaceValue}
                            min={0}
                            disabled
                        />
                        <InputNumber
                            label="qnty"
                            className="w-[10%]"
                            onChange={handleChange}
                            name="quantity"
                            value={quantity}
                            min={0}
                        />
                        <InputNumber
                            label="alspc"
                            className="w-[10%]"
                            onChange={handleChange}
                            name="alspc"
                            value={allSpaceValue}
                            min={0}
                            disabled
                        />
                        <InputNumber
                            label="prc"
                            className="w-[10%]"
                            onChange={handleChange}
                            name="price"
                            value={price}
                            min={0}
                        />
                        <InputNumber
                            label="ttlprc"
                            className="w-[10%]"
                            onChange={handleChange}
                            name="ttlprc"
                            value={totalPriceValue}
                            min={0}
                            disabled
                        />
                        <InputText
                            value={notes}
                            name="notes"
                            onChange={handleChange}
                            label="nts"
                            className="w-[35%]"
                        />
                    </div>
                    <BaseTable
                        dataSource={invoiceDetails}
                        hidePagination
                        columns={INVOICE_DETAILS_COLUMNS}
                        rowKey="rowKey"
                        onClickOpen={handleAddItem}
                        handleDelete={deleteItem}
                    // handleEdit={}
                    />
                </div>
            </main>
        </div>
    )
}

export default PurchaseInvoice